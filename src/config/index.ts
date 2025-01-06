import { appendFile } from "fs";

require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  saltKey: process.env.SALTKEY || 10,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT,
    name: process.env.DB_NAME,
  },
  dev_url :process.env.DEV_URL,
  app_email:process.env.APP_EMAIL,
  email_password:process.env.APP_PASS,
  password_change_request_expiry_time:process.env.PASSWORD_CHANGE_REQUEST_EXPIRY_TIME
};
export default config;
