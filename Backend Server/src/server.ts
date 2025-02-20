import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./common/services/db.service";
import uploadRoutes from "./uploads/uploads.routes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
