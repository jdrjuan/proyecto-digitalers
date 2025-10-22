import 'dotenv/config';

const config = {
    PORT: process.env.PORT || 8080,
    PRODUCTS_FILE_NAME: process.env.PRODUCTS_FILE_NAME || 'products.data',
};

export default config;
