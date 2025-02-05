import express, { Request, Response } from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

app.use("/api", router);

export default app;
