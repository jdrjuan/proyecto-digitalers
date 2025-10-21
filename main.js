import express from 'express';
import routerProducts from './routers/products.js';
import config from './config.js';

const app = express();

app.use(express.json());

app.use('/api/products', routerProducts);

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Node.js + Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log(`Se produjo un error al iniciar el servidor Node.js + Express: ${error.message}`));
