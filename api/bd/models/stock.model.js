const {Model, DataTypes, sequelize}=require('sequelize');
const {DEPENDENCIAS_TABLE}= require('./dependencia.model');

const STOCK_TABLE= 'stock';

const StockSchema={
    idStock:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_stock'
    },
    idDependencia:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_dependencia',
        references:{
            model:DEPENDENCIAS_TABLE,
            key:'id_dependencia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

    },
    idProducto:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_producto'
    },
    cantidadStock:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'cantidad_stock',
        defaultValue:0
    }
};
class Stock extends Model {
    static associate(models){
        this.belongsToMany(models.Producto, 
            {as: 'stock',
            through: models.StockProducto,
            foreignKey: 'idStock',
            otherkey: 'idProducto'
            }
        );
        this.belongsTo(models.Dependencia,
            {as:'stockDependencia',
            foreignKey: 'idDependencia'
            }
        );
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: STOCK_TABLE,
            modelName: 'Stock',
            timestamps:false
        }
}
};
module.exports={STOCK_TABLE, StockSchema, Stock}