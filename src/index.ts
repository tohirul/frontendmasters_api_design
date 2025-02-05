import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.LOCAL_PORT;
const uri = process.env.LOCAL_URI;

app.listen(port, () => {
  console.log(`Server running at ${uri}:${port}`);
});
