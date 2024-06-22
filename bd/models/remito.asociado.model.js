const {Model, DataTypes, sequelize} = require('sequelize');

const REMITOS_ASOCIADOS_TABLE = 'remitos_asociados'

const RemitosAsociadosSchema={
    idRemitoAsociado:{
        allownull:false,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        field:'id_remito_asociado'
    },
    idDependenciaLogistica:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_dependencia_logistica'
    },
    numeroRemitoLogistica:{
        allownull:false,
        type:DataTypes.INTEGER,
        field:'numero_remito_logistica'
    }
}
class RemitoAsociado extends Model{
    static associate(){};
    static config(sequelize){
        return{
            sequelize,
            tableName: REMITOS_ASOCIADOS_TABLE,
            modelName: 'RemitoAsociado',
            timestamps:false
        }
    }
}
module.exports={REMITOS_ASOCIADOS_TABLE, RemitosAsociadosSchema, RemitoAsociado}