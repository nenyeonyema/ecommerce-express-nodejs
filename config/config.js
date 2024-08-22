const dotenv = require('dotenv');

dotenv.config('./env');

const  configVariables = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLOUD_NAME: process.env.CLOUD_NAME, 
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    JWT_TOKEN: process.env.JWT_TOKEN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CLIENT_URL: process.env.CLIENT_URL 
}

module.exports = configVariables;