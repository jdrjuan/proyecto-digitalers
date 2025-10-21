import api from '../api/products.js';



////////////////////////////////////////////////////////////////////////////////
//                               Get Controller                               //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res) => {
    const products = await api.getProducts();
    res.json(products);
};

const getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await api.getProduct(id);
    if (!product) {
        return res.status(404).json({message: 'Producto no encontrado', product: null});
    }
    res.json({message: 'ok', product});
};


///////////////////////////////////////////////////////////////////////////////
//                              Post Controller                              //
///////////////////////////////////////////////////////////////////////////////


const postProduct = async (req, res) => {
    const product = req.body;
    if (!product) {
        return res.status(400).json({message: 'Producto no recibido', product: null});
    }
    const createdProduct = await api.createProduct(product);
    res.status(201).json({message: 'ok', product: createdProduct});
};


////////////////////////////////////////////////////////////////////////////////
//                               Put Controller                               //
////////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const product = req.body;
    if (!product) {
        return res.status(400).json({message: 'Producto no recibido', product: null});
    }
    const {id} = req.params;
    const updatedProduct = await api.updateProduct(id, product);
    if (!updatedProduct) {
        return res.status(404).json({message: 'Producto no encontrado', product: null});
    }
    res.json({message: 'ok', product});
};


///////////////////////////////////////////////////////////////////////////////
//                             Delete Controller                             //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await api.deleteProduct(id);
    if (!product) {
        return res.status(404).json({message: 'Producto no encontrado', product: null});
    }
    res.json({message: 'ok', product});
};


export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
};
