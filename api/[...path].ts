// Vercel Serverless Function entry point.
// Catches every /api/* request and hands it to the shared Express app,
// which defines /api/health, /api/generate-tutorial and /api/fallback-placeholder.
// @vercel/node accepts an Express application as the default export.
import app from "../server/app";

export default app;
