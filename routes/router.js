const express= require('express');

const usuariosExternosRouter = require('./usuarios.externos.router');
const clientesRouter = require('./clientes.router');
const logisticaRouter = require('./logistica.router');
const productsRouter = require('./productos.router');
const dependenciasRouter = require('./dependencias.router');
const remitosAsociadosRouter = require('./remitos.asociados.router');
const remitosRouter = require('./remitos.router');
const stockRouter = require('./stock.router');
const usuariosRouter = require('./usuarios.router');
const entregasRouter =require('./entregas.router');
const movimientosRouter = require ('./movimientos.router');
const marcasRouter = require('./marcas.router');
const categoriaRouter = require('./categorias.router');
const proveedoresRouter = require('./proveedores.router');

function routerApi(app){
    const router= express.Router();
    app.use('/api/v1', router)
        router.use('/usuarios-externos', usuariosExternosRouter);
        router.use('/clientes', clientesRouter);
        router.use('/logistica', logisticaRouter);
        router.use('/productos', productsRouter);
        router.use('/dependencias', dependenciasRouter);
        router.use('/remitos-asociados', remitosAsociadosRouter);
        router.use('/remitos', remitosRouter);
        router.use('/stock', stockRouter);
        router.use('/usuarios', usuariosRouter);
        router.use('/entregas',entregasRouter);
        router.use('/movimientos', movimientosRouter);
        router.use('/marcas', marcasRouter);
        router.use('/categorias', categoriaRouter);
        router.use('/proveedores',proveedoresRouter);
};
module.exports = routerApi;