import { promises as fs } from 'fs';
import path from 'path';
import config from '../config.js';

// const productsFileName = config.PRODUCTS_FILE_NAME;

const productsFileName = config.PRODUCTS_FILE_NAME;
// const productsFileName = 'ARCHIVO-INEXISTENTE.data';
const completeProductsFilePath = path.join(process.cwd(), 'models', productsFileName);
const charset = 'utf-8';

const getProductsArrayFromFile = async () => {
    let products = [];
    try {
        const fileContent = await fs.readFile(completeProductsFilePath, charset);
        const parsedContent = JSON.parse(fileContent);
        if (!Array.isArray(parsedContent)) {
            throw new Error('El contenido del archivo no es un array válido.');
        }
        products = parsedContent;
    } catch (error) {
        console.error(`Se produjo un error al intentar leer el archivo: ${error.message}`);
    }
    return products;
};

const saveProductsArrayToFile = async products => {
    const serializedProducts = JSON.stringify(products, null, '\t');
    try {
        await fs.writeFile(completeProductsFilePath, serializedProducts);
    } catch (error) {
        console.error(`Se produjo un error al intentar escribir en el archivo: ${error.message}`);
        return false;
    }
    return true;
};

const getNextId = products => (Math.max(...products.map(p => p.id)) + 1).toString();


const getProducts = async () => {
    const products = await getProductsArrayFromFile();
    return products;
};

const getProduct = async id => {
    const products = await getProductsArrayFromFile();
    return products.find(producto => producto.id === id);
};

const createProduct = async product => {
    const products = await getProductsArrayFromFile();
    product.id = getNextId(products);
    products.push(product);
    const writeOk = await saveProductsArrayToFile(products);
    if (!writeOk) {
        return null;
    }
    return product;
};

const updateProduct = async (id, product) => {
    const products = await getProductsArrayFromFile();
    const index = products.findIndex(producto => producto.id === id);
    if (index === -1) {
        return null;
    }
    product.id = id;
    products[index] = product;
    const writeOk = await saveProductsArrayToFile(products);
    if (!writeOk) {
        return null;
    }
    return product;
};

const deleteProduct = async id => {
    const products = await getProductsArrayFromFile();
    const index = products.findIndex(producto => producto.id === id);
    if (index === -1) {
        return null;
    }
    const product = products.splice(index, 1)[0];
    const writeOk = await saveProductsArrayToFile(products);
    if (!writeOk) {
        return null;
    }
    return product;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
