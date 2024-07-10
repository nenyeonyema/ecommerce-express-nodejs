// This configures the environment variables into our program.
const dotenv = require('dotenv');

dotenv.config('./env');

const  configVariables = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLOUD_NAME: process.env.CLOUD_NAME, 
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    JWT_TOKEN: process.env.JWT_TOKEN
}

module.exports = configVariables;