import express, { Request, RequestHandler, Response } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./auth/auth";
import { createNewUser, signin } from "./handlers/user";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

app.use("/api", protect as RequestHandler, router);
app.post("/signup", createNewUser as RequestHandler);
app.post("/signin", signin as RequestHandler);

interface CustomError extends Error {
  type?: string;
}

app.use((err: CustomError, req: Request, res: Response) => {
  console.error(err.stack);
  if (err.type === "auth") {
    res.status(401).json({ success: false, message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ success: false, message: "invalid input" });
  } else {
    res.status(500).json({ success: false, message: "server error" });
  }
});

export default app;
