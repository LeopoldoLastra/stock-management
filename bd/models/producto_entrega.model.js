const {Model, DataTypes, sequelize}=require('sequelize');
const ENTREGAS_TABLE =require('./entregas.model');

const PRODUCTOS_TABLE =require('./producto.model');
const PRODUCTO_ENTREGA_TABLE= 'producto_entrega';

const ProductoEntregaSchema={
    idProductoEntrega:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_producto_entrega'
    },
    cantidad:{
        allownull:false,
        field:'cantidad',
        type: DataTypes.INTEGER
    },
    condicionEntrega:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'condicion_entrega'
    },
    idProducto:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_producto',
        references:{
            model: PRODUCTOS_TABLE,
            key: 'id_producto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    idEntrega:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_entrega',
        references:{
            model: ENTREGAS_TABLE,
            key: 'id_entrega'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};
class ProductoEntrega extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: PRODUCTO_ENTREGA_TABLE,
            modelName: 'ProductoEntrega',
            timestamps:false
        }
}
};
module.exports={PRODUCTO_ENTREGA_TABLE, ProductoEntregaSchema, ProductoEntrega}