import dotenv from "dotenv";
import path from "path";
import merge from "lodash.merge";
import process from "process";

const load_env = dotenv.config({
  path: path.join(process.cwd(), ".env"),
});
// console.log(load_env);
if (load_env.error) {
  console.error("Failed to load environment variables", load_env.error);
} else {
  console.log("Environment variables loaded successfully");
}
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";
let envConfig;
const config = {
  stage,
  node_env: process.env.NODE_ENV,
  local_uri: process.env.LOCAL_URI,
  port: 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  jwt: {
    secret: process.env.JWT_SECRET,
    access_token: process.env.JWT_ACCESS_TOKEN,
    access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    refresh_token: process.env.JWT_REFRESH_TOKEN,
    refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  },
};

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./test").default;
} else {
  envConfig = require("./local").default;
}

export default merge(config, envConfig);
