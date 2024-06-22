const {Model, DataTypes, Sequelize} = require('sequelize');
const {REMITOS_TABLE} = require('./remito.model');

const MOVIMIENTOS_TABLE = 'movimientos';

const MovimientosSchema = {
    idMovimiento:{
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'id_movimiento'
    },
    idProducto:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'id_producto'
    },
    tipoMovimiento:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'tipo_movimiento'
    },
    movimientoCantidad:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'movimiento_cantidad'
    },
    observacionesMovimiento:{
        allowNull:true,
        type: DataTypes.TEXT,
        field:'observaciones_movimiento'
    },
    idRemito:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'id_remito',
        references:{
            model:REMITOS_TABLE,
            key:'id_remito'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    dependenciaAfectada:{
        allowNull:true,
        type: DataTypes.INTEGER,
        fiel:'dependencia_originante'
    },
    estadoMovimiento:{
        allowNull:false,
        type: DataTypes.STRING,
        field: "estado_movimiento",
        defaultValue: 'pendiente'
    }
}
class Movimiento extends Model{
    static associate(models){
        this.belongsTo(models.Remito, {as:'movimientoRemito', foreignKey:'idRemito',  onDelete: 'CASCADE'});
        this.belongsTo(models.Producto, {as:'movimientosProducto', foreignKey:'idProducto'})
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: MOVIMIENTOS_TABLE,
            modelName: 'Movimiento',
            timestamps:false
        }
    }
}
module.exports={MOVIMIENTOS_TABLE, MovimientosSchema, Movimiento}