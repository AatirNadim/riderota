import express, { Request, Response } from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    credentials: true,
    origin:
      process.env.CLIENT_URL || /^http:\/\/([a-z0-9-]+\.)?localhost:3001$/,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the RideRota server!");
});

app.post("/api/sample", (req: Request, res: Response) => {
  res.json({
    message: "This is a sample POST endpoint.",
    dataReceived: req.body,
  });
});

app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
