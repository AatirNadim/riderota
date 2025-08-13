import express, { Request, Response } from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";

const app = express();
const port = process.env.PORT || 3000;

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
