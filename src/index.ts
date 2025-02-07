import config from "./config";
import app from "./server";

// load_env

app.listen(config?.port, () => {
  console.log(`Server running at ${config?.local_uri}:${config?.port}`);
});
