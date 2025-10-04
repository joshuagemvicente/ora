import express from "express";
import cors from "cors";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./utils/auth.server";
import dotenv from "dotenv";
dotenv.config();

type Method = "GET" | "POST" | "PUT" | "DELETE";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"] as Method[],
    credentials: true,
  }),
);
app.use(express.json());

app.all("/api/auth/:splat", toNodeHandler(auth));

// for custom routes
// app.get("/api", routes)

app.get("api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/", async (_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
  res.status(401).json({
    success: false,
    message: "Unauthorized.",
  });
});

export default app;
