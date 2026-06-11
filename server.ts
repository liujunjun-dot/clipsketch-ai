import path from "path";
import { createServer as createViteServer } from "vite";
import app from "./server/app";

const PORT = Number(process.env.PORT) || 3000;

// Local dev / self-hosted entry point.
// On Vercel the API is served by api/[...path].ts instead, and the
// frontend is served as static files built by `vite build`.
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const { default: express } = await import("express");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer();
