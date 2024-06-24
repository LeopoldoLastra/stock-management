const {Model, DataTypes, sequelize}=require('sequelize');

const DEPENDENCIAS_LOGISTICA_TABLE= 'dependencias_logistica';

const DependenciasLogisticaSchema={
    idDependenciaLogistica:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_dependencia_logistica'
    },
    nombreDependenciaLogistica:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'nombre_dependencia_logistica'
    },
    ubicacionDependenciaLogistica:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'nombre_dependencia_logistica'
    }
};

class DependenciaLogistica extends Model {
    static associate(){};
    static config(sequelize){
        return{
            sequelize,
            tableName: DEPENDENCIAS_LOGISTICA_TABLE,
            modelName: 'DependenciaLogistica',
            timestamps:true
        }
}
};

module.exports={DEPENDENCIAS_LOGISTICA_TABLE, DependenciasLogisticaSchema, DependenciaLogistica}