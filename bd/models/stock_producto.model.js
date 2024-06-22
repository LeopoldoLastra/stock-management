const {Model, DataTypes, sequelize}=require('sequelize');
const {PRODUCTOS_TABLE}= require('./producto.model');
const {STOCK_TABLE} = require ('./stock.model');

const STOCK_PRODUCTO_TABLE= 'stock_producto';

const StockProductosSchema={
    idStockProducto:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_stock_producto'
    },
    idStock:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_stock',
        references:{
            model:STOCK_TABLE,
            key:'id_stock'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    idProducto:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_producto',
        references:{
            model:PRODUCTOS_TABLE,
            key:'id_producto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};
class StockProducto extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: STOCK_PRODUCTO_TABLE,
            modelName: 'StockProducto',
            timestamps:false
        }
}
};
module.exports={STOCK_PRODUCTO_TABLE, StockProductosSchema, StockProducto}