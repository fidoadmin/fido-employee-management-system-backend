import { appendFile } from 'fs';
import dotenv from 'dotenv';

dotenv.config(); 
const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,  
  saltKey: process.env.SALTKEY ? parseInt(process.env.SALTKEY, 10) : 10,  
  db: {
    host: process.env.DB_HOST || 'localhost',  
    user: process.env.DB_USER || 'user',
    pass: process.env.DB_PASS || 'password',
    dialect: process.env.DB_DIALECT || 'postgres', 
    name: process.env.DB_NAME || 'my_database', 
  },
  dev_url: process.env.DEV_URL || 'http://localhost:3000', 
  app_email: process.env.APP_EMAIL || 'email@example.com',
  email_password: process.env.APP_PASS || 'password', 
  password_change_request_expiry_time: process.env.PASSWORD_CHANGE_REQUEST_EXPIRY_TIME || '3600', 
};

export default config;
