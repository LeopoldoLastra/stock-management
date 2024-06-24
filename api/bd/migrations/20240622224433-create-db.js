'use strict';
const {CATEGORIAS_TABLE, CategoriasSchema} = require('../models/categoria.model');
const {CLIENTES_TABLE, ClientesSchema} = require('../models/cliente.model');
const {DEPENDENCIAS_TABLE, DependenciasSchema}= require('../models/dependencia.model');
const {ENTREGAS_TABLE, EntregasSchema}=require('../models/entregas.model');
const {MARCAS_TABLE, MarcasSchema}=require('../models/marca.model');
const {MOVIMIENTOS_TABLE, MovimientosSchema}=require('../models/movimiento.model');
const {PRODUCTOS_TABLE, ProductosSchema}=require('../models/producto.model');
const{PROVEEDORES_TABLE,ProveedoresSchema}=require('../models/proveedor.models');
const {REMITOS_ASOCIADOS_TABLE,RemitosAsociadosSchema}=require('../models/remito.asociado.model');
const{REMITOS_TABLE, RemitosSchema}=require('../models/remito.model');
const {STOCK_PRODUCTO_TABLE, StockProductosSchema}=require('../models/stock_producto.model');
const{STOCK_TABLE, StockSchema}=require('../models/stock.model');
const {USUARIOS_EXTERNOS_TABLE,UsuariosExternosSchema}=require('../models/usuario.externo.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIAS_TABLE, CategoriasSchema);
    await queryInterface.createTable(MARCAS_TABLE, MarcasSchema);
    await queryInterface.createTable(PROVEEDORES_TABLE,ProveedoresSchema);
    await queryInterface.createTable(PRODUCTOS_TABLE, ProductosSchema);
    await queryInterface.createTable(USUARIOS_EXTERNOS_TABLE,UsuariosExternosSchema);
    await queryInterface.createTable(CLIENTES_TABLE, ClientesSchema);
    await queryInterface.createTable(DEPENDENCIAS_TABLE, DependenciasSchema);
    await queryInterface.createTable(REMITOS_TABLE, RemitosSchema);  
    await queryInterface.createTable(ENTREGAS_TABLE, EntregasSchema);
    await queryInterface.createTable(MOVIMIENTOS_TABLE, MovimientosSchema); 
    await queryInterface.createTable(REMITOS_ASOCIADOS_TABLE,RemitosAsociadosSchema);
    await queryInterface.createTable(STOCK_TABLE, StockSchema);    
    await queryInterface.createTable(STOCK_PRODUCTO_TABLE, StockProductosSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORIAS_TABLE);
    await queryInterface.dropTable(MARCAS_TABLE);
    await queryInterface.dropTable(PROVEEDORES_TABLE);
    await queryInterface.dropTable(PRODUCTOS_TABLE);
    await queryInterface.dropTable(USUARIOS_EXTERNOS_TABLE);
    await queryInterface.dropTable(CLIENTES_TABLE);
    await queryInterface.dropTable(DEPENDENCIAS_TABLE);
    await queryInterface.dropTable(REMITOS_TABLE);
    await queryInterface.dropTable(ENTREGAS_TABLE);
    await queryInterface.dropTable(MOVIMIENTOS_TABLE);
    await queryInterface.dropTable(REMITOS_ASOCIADOS_TABLE);
    await queryInterface.dropTable(STOCK_TABLE); 
    await queryInterface.dropTable(STOCK_PRODUCTO_TABLE);
  }
};
