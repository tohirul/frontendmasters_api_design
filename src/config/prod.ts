export default {
  port: 5080,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: 10,
  jwt: {
    secret: process.env.JWT_SECRET,
    access_token: process.env.JWT_ACCESS_TOKEN,
    access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    refresh_token: process.env.JWT_REFRESH_TOKEN,
    refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  },
};
