const {Model, DataTypes, Sequelize} = require('sequelize');

const REMITOS_TABLE = 'remitos';

const RemitosSchema = {
    idRemito:{
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'id_remito'
    },
    fechaRemito:{
        allowNull:true,
        type: DataTypes.DATE,
        field:'fecha_remito'
    },
    origenRemito:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'origen_remito'
    },
    destinoRemito:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'destino_remito'
    },
    estadoRemito:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'estado_remito',
        defaultValue: 'pendiente'
    },
    idRemitoAsociado:{
        allowNull:true,
        type: DataTypes.INTEGER,
        field:'id_remito_asociado'
    },
    tipoRemito:{
        allowNull:true,
        type:DataTypes.STRING,
        field: 'tipo_remito'
    },
    dependenciaOriginante:{
        allowNull:true,
        type:DataTypes.INTEGER,
        field: 'dependencia_originante'
    },
    entregaAsociada:{
        allowNull:true,
        type:DataTypes.INTEGER,
        field: 'entrega_asociada'
    }

}
class Remito extends Model{
    static associate(models){
        this.hasMany(models.Movimiento, {as:'remitosMovimientos', foreignKey:'idRemito',  onDelete: 'CASCADE'})

        this.belongsTo(models.Entrega, {as:'remitoEntrega' })
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: REMITOS_TABLE,
            modelName: 'Remito',
            timestamps:false,
            hooks: {
                beforeValidate: (remito, options) => {
                    // Obtener los valores del remito
                    const remitoValues = Object.values(remito)[0];
                    // Transformarlo en un array iterable
                    Object.entries(remitoValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            remitoValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
    }
}
module.exports={REMITOS_TABLE, RemitosSchema, Remito}