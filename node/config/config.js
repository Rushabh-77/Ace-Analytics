const dotenv = require('dotenv');
const path = require('path');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.local';

dotenv.config({ path: path.resolve(__dirname, 'env', envFile) });

module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
};
