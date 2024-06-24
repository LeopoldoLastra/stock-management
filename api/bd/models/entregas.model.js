const {Model, DataTypes, Sequelize} = require('sequelize');

const ENTREGAS_TABLE = 'entregas';

const EntregasSchema = {
    idEntrega:{
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'id_entrega'
    },
    idCliente:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'id_cliente'
    },
    fechaEntrega:{
        allowNull:false,
        type: DataTypes.DATE,
        field:'fecha_entrega'
    },
    horaEntrega:{
        allowNull:true,
        type: DataTypes.STRING,
        field:'hora_entrega'
    },
    observacionesEntrega:{
        allowNull:true,
        type: DataTypes.TEXT,
        field:'observaciones_entrega'
    },
    idDependenciaLogistica:{
        allowNull:true,
        type: DataTypes.INTEGER,
        field:'id_dependencia_logistica'
    },
    estadoEntrega:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'estado_entrega',
        defaultValue: 'pendiente'
    }

}

class Entrega extends Model{
    static associate(models){
        this.belongsToMany(models.Producto, 
            {as:'productDeliveries',
            through:models.ProductoEntrega,
            foreignKey:'idEntrega',
            otherKey:'idProducto'
            });
        this.hasMany(models.ProductoEntrega, {as:'productToDeliver', foreignKey:'idEntrega'})
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: ENTREGAS_TABLE,
            modelName: 'Entrega',
            timestamps:true
        }
    }
};

module.exports={ENTREGAS_TABLE, EntregasSchema, Entrega}