import mongoose from 'mongoose';
import config from '../config.js';

let connected = false;

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_CONNECTION_STRING, {
            serverSelectionTimeoutMS: config.MONGODB_TIMEOUT,
        });
        connected = true;
        console.log('Conexión con MongoDB exitosa');
    } catch (error) {
        console.error(`Error al conectar con el servidor MongoDB: ${error.message}`);
    }
};

const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    brand: String,
    category: String,
    shortDescription: String,
    longDescription: String,
    freeShipping: Boolean,
    mainPhoto: String,
});

const Product = mongoose.model('Product', productsSchema);

const getProducts = async () => {
    let products = [];
    if (!connected) {
        return products;
    }
    try {
        products = await Product.find({});
    } catch (error) {
        console.error(`Error al obtener los productos: ${error.message}`);
    }
    return products;
};

const getProduct = async id => {
    let product = null;
    if (!connected) {
        return product;
    }
    try {
        product = await Product.findById(id);
    } catch (error) {
        console.error(`Error al obtener el producto: ${error.message}`);
    }
    return product;
};

const createProduct = async product => {
    let newProduct = null;
    if (!connected) {
        return newProduct;
    }
    try {
        newProduct = new Product(product);
        await newProduct.save();
    } catch (error) {
        console.error(`Error al crear el producto: ${error.message}`);
    }
    return newProduct;
};

const updateProduct = async (id, product) => {
    let updatedProduct = null;
    if (!connected) {
        return updatedProduct;
    }
    try {
        updatedProduct = await Product.findByIdAndUpdate(id, { $set: product }, {
            returnDocument: 'after',
        });
    } catch (error) {
        console.error(`Error al actualizar el producto: ${error.message}`);
    }
    return updatedProduct;
};

const deleteProduct = async id => {
    let deletedProduct = null;
    if (!connected) {
        return deletedProduct;
    }
    try {
        deletedProduct = await Product.findByIdAndDelete(id);
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error.message}`);
    }
    return deletedProduct;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    connectDB
};
