const {Model, DataTypes, sequelize}=require('sequelize');

const USUARIOS_TABLE= 'usuarios';

const UsuariosSchema={
    idUsuario:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_usuario'
    },
    idDependencia:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'id_dependencia'
    },
    nombreUsuario:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'nombre_usuario'
    },
    apellidoUsuario:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'apellido_usuario'
    }
};
class Usuario extends Model {
    static associate(){};
    static config(sequelize){
        return{
            sequelize,
            tableName: USUARIOS_TABLE,
            modelName: 'Usuario',
            timestamps:false
        }
    }
};
module.exports={USUARIOS_TABLE, UsuariosSchema, Usuario}