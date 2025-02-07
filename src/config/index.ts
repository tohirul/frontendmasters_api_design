import dotenv from "dotenv";
import path from "path";
// import process from 'process';
const load_env = dotenv.config({
  path: path.join(process.cwd(), ".env"),
});
// console.log(load_env);
if (load_env.error) {
  console.error("Failed to load environment variables", load_env.error);
} else {
  console.log("Environment variables loaded successfully");
}
const config = {
  node_env: process.env.NODE_ENV,
  local_uri: process.env.LOCAL_URI,
  port: process.env.LOCAL_PORT,
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

export default config;
