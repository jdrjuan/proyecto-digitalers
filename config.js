import 'dotenv/config';

const config = {
    PORT: process.env.PORT || 8080,
    PRODUCTS_FILE_NAME: process.env.PRODUCTS_FILE_NAME || 'products.data',
    MONGODB_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/ecommerce',
    MONGODB_TIMEOUT: process.env.MONGODB_TIMEOUT || 10000,
};

export default config;
