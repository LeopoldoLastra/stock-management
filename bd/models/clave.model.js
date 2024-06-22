const {Model, DataTypes, sequelize}=require('sequelize');

const CLAVES_TABLE= 'claves';

const ClavesSchema={
    idClaveUsuario:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_clave_usuario'
    },
    idUsuario:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_usuario'
    },
    nombreDeUsuario:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'nombre_de_usuario'
    },
    claveUsuario:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'clave_usuario'
    }
};

class Clave extends Model {
    static config(sequelize){
        return{
            sequelize,
            tableName: CLAVES_TABLE,
            modelName: 'Clave',
            timestamps:true
        }
}
};
module.exports={CLAVES_TABLE, ClavesSchema, Clave}