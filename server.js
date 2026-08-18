import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const initialPort = parseInt(process.env.PORT || "3000", 10);

  // Basic API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", brand: "Nusa Penida Motor Trip" });
  });

  // Mock API for bookings
  app.post("/api/bookings", express.json(), (req, res) => {
    console.log("New booking received:", req.body);
    res.json({ success: true, message: "Booking received successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  function listen(port) {
    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`\n  ➜  Server running on http://localhost:${port}\n`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Port ${port} is already in use, trying ${port + 1}...`);
        listen(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });
  }

  listen(initialPort);
}

startServer();
