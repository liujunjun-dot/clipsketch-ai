import express from "express";
import dotenv from "dotenv";

// Load environment variables (no-op on Vercel where envs are injected)
dotenv.config();

const app = express();

// Set up JSON payload limit up to 100MB for frame sequence payloads
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Dynamically import @google/genai ONLY when a tutorial is actually generated.
// This keeps the SDK out of the serverless function's module-load path, so the
// health and fallback-placeholder routes never depend on it, and a missing
// GEMINI_API_KEY produces a clean error instead of crashing the whole function.
async function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Set it in Vercel Project Settings -> Environment Variables and redeploy."
    );
  }
  const { GoogleGenAI, Type } = await import("@google/genai");
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  return { ai, Type };
}

// API Routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Primary endpoint: convert video storyboard frames into a hand-drawn tutorial
app.post("/api/generate-tutorial", async (req, res) => {
  try {
    const { frames, style, stepsCount, strokeDensity, aspectRatio } = req.body;

    if (!frames || !Array.isArray(frames) || frames.length === 0) {
      return res.status(400).json({ error: "Missing or invalid storyboard frames in request" });
    }

    const maxSteps = Math.min(Math.max(Number(stepsCount) || 4, 3), 6);
    const chosenStyle = style || "pencil";
    const chosenAspect = aspectRatio || "4:3";

    const { ai, Type } = await getGenAI();

    console.log(`Starting tutorial generation: ${frames.length} frames, style: ${chosenStyle}, steps: ${maxSteps}`);

    // Standard base64 payload extraction for Gemini parts
    const imageParts = frames.map((frameBase64, index) => {
      // Find matches for mime type and content
      const match = frameBase64.match(/^data:(image\/[a-z]+);base64,(.+)$/);
      const mimeType = match ? match[1] : "image/jpeg";
      const data = match ? match[2] : frameBase64;
      return {
        inlineData: {
          mimeType,
          data,
        },
      };
    });

    // Step 1: Prompt Gemini 3.5 Flash to analyze storyboard and create steps
    const analyzerPrompt = `You are a professional master art instructor. You have been provided with ${imageParts.length} sequential storyboard frames captured from a video.
Analyze these frames carefully, determine the core activity or subject, and design an intuitive step-by-step hand-drawn tutorial containing exactly ${maxSteps} logical steps explaining how a user can draw or sketch this subject.

For each step, generate:
1. stepNumber: Sequential integer starting from 1.
2. title: A concise, encouraging drawing action name in Chinese (e.g., "第一步：勾勒梨子的基础轮廓", "第二步：添加明暗交界线").
3. instruction: Extremely helpful, detail-oriented guidelines in Chinese advising on strokes, finger grip, pressure, or spatial structures (e.g., "选用HB铅笔两指捏握，在画纸中心微触笔尖，以画圈顺时针勾出正圆。切勿压笔，保持辅助框若隐若现以便后续休整。").
4. imagePrompt: A clean, descriptive English prompt outlining the hand-drawn sketch illustration showing the finished state of this step. It MUST focus directly on hand-drawn art, sketching, pencils, or paint. Include styling elements based on ${chosenStyle}.

Style guidelines for ImagePrompts based on "${chosenStyle}":
- "pencil": "A detailed monochromatic pencil sketch, hand-drawn design, graphite texture, light smudging, detailed line art, focused artistic subject centering on textured sketch paper background, fine art, vignette style."
- "watercolor": "Vibrant hand-painted watercolor design, delicate ink contours, rich paint pools, fine wet-on-wet paint blending, color washes, artist notebook paper background, premium watercolor sketch."
- "blueprint": "Technical architectural drafting sketch, precise blueprint design, white schematics and lines on blue blueprint background with faint drafting grids, engineering draft."
- "crayon": "High-textured crayon illustration, rich colorful chalk-like wax textures, naive pencil strokes, vibrant primary shades on raw cartridge paper, delightful sketch."
- "ink": "Chinese traditional ink wash brush painting, monochrome black and charcoal watercolor wash, calligraphic lines, fluid ink bleed, raw Xuan paper texture, elegant negative space."

Ensure the generated image prompt is rich and specific to what is being drawn in this step, rather than generic.

Respond strictly with a JSON array conforming to this schema. Do not include markdown wraps or backticks in your output.`;

    const assistantResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...imageParts,
        { text: analyzerPrompt }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              title: { type: Type.STRING },
              instruction: { type: Type.STRING },
              imagePrompt: { type: Type.STRING },
            },
            required: ["stepNumber", "title", "instruction", "imagePrompt"],
          },
        },
      },
    });

    const stepsRaw = assistantResponse.text?.trim();
    if (!stepsRaw) {
      throw new Error("Failed to generate instructions list from Gemini analysis");
    }

    const steps = JSON.parse(stepsRaw);
    console.log(`Successfully parsed ${steps.length} tutorial steps. Generating illustration assets...`);

    // Step 2: For each parsed step, run the Nano Banana Pro 'gemini-3-pro-image' model in parallel to create custom hand-drawn drawings
    const designPromises = steps.map(async (step: any) => {
      try {
        console.log(`Generating sketch for step ${step.stepNumber}: ${step.title}`);

        const result = await ai.models.generateContent({
          model: "gemini-3-pro-image",
          contents: {
            parts: [
              {
                text: `${step.imagePrompt}. Ensure the stroke density is optimized for ${strokeDensity || "medium"} graphite weight, high contrast, clean white background, aesthetic hand-crafted feel.`,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: chosenAspect,
              imageSize: "1K",
            },
          },
        });

        let base64Image = "";
        if (result.candidates?.[0]?.content?.parts) {
          for (const part of result.candidates[0].content.parts) {
            if (part.inlineData) {
              base64Image = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
        }

        // Standard robust fallback in case of rate-limiting or service error
        if (!base64Image) {
          base64Image = `/api/fallback-placeholder?title=${encodeURIComponent(step.title)}&style=${chosenStyle}`;
        }

        return {
          ...step,
          illustrationUrl: base64Image,
        };
      } catch (err: any) {
        console.error(`Error generating sketch image for step ${step.stepNumber}:`, err.message);
        return {
          ...step,
          illustrationUrl: `/api/fallback-placeholder?title=${encodeURIComponent(step.title)}&style=${chosenStyle}`,
        };
      }
    });

    const finishedTutorialSteps = await Promise.all(designPromises);

    res.json({
      success: true,
      style: chosenStyle,
      aspectRatio: chosenAspect,
      steps: finishedTutorialSteps,
    });
  } catch (err: any) {
    console.error("General tutorial generation exception:", err);
    res.status(500).json({ error: err.message || "Failed to generate your artistic tutorial" });
  }
});

// Fallback high-quality vector placeholder generator for offline or connection failures
app.get("/api/fallback-placeholder", (req, res) => {
  const title = String(req.query.title || "Handmade Sketch Step");
  const style = String(req.query.style || "pencil");

  // Choose colors based on style
  let bg = "#F5F3EC"; // sketchbook paper
  let stroke = "#4A4A4A"; // graphite charcoal
  let grid = "";

  if (style === "blueprint") {
    bg = "#0E2F64";
    stroke = "#E2F0FE";
    grid = `<path d="M 0 10 L 100 10 M 10 0 L 10 100" fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="0.5"/>`;
  } else if (style === "ink") {
    bg = "#FCFAF2";
    stroke = "#111111";
  } else if (style === "watercolor") {
    bg = "#FAF3E0";
    stroke = "#8D6262";
  } else if (style === "crayon") {
    bg = "#FFFDF9";
    stroke = "#FF6B6B";
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <rect width="100%" height="100%" fill="${bg}"/>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.5" fill="${stroke}" fill-opacity="0.2"/>
          ${grid}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      <!-- Hand Drawn Artistic Border -->
      <rect x="15" y="15" width="370" height="270" rx="3" fill="none" stroke="${stroke}" stroke-opacity="0.1" stroke-width="1.5" stroke-dasharray="8 4"/>

      <!-- Central Vector Emblem resembling Sketch -->
      <g transform="translate(200, 130)">
        <polygon points="0,-45 40,-15 25,30 -25,30 -40,-15" fill="none" stroke="${stroke}" stroke-width="2" stroke-opacity="0.65"/>
        <circle cx="0" cy="0" r="30" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="5 3"/>
        <!-- Sketching Hands Indicator -->
        <path d="M-50,60 C-30,40 -10,35 15,35" fill="none" stroke="${stroke}" stroke-width="1" stroke-opacity="0.3"/>
        <line x1="-10" y1="-10" x2="35" y2="35" stroke="${stroke}" stroke-width="1.5" stroke-opacity="0.8"/>
        <path d="M35,35 L28,33 L33,28 Z" fill="${stroke}" fill-opacity="0.8"/>
      </g>

      <text x="200" y="240" font-family="'Inter', system-ui, sans-serif" font-weight="500" font-size="14" fill="${stroke}" text-anchor="middle" letter-spacing="0.5">${title}</text>
      <text x="200" y="262" font-family="monospace" font-size="10" fill="${stroke}" fill-opacity="0.5" text-anchor="middle">${style.toUpperCase()} RENDER FALLBACK</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg.trim());
});

export default app;
