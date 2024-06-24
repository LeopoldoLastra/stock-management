const {Model, DataTypes, sequelize}=require('sequelize');

const USUARIOS_EXTERNOS_TABLE= 'usuarios_externos';

const UsuariosExternosSchema={
    idUsuarioExterno:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_usuario_externo'
    },
    userName:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'user_name'
    },
    password:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'password'
    }
};
class UsuarioExterno extends Model {
    static associate(models){
        this.hasOne(models.Cliente, {as:'cliente',foreignKey:'idUsuarioExterno'})
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: USUARIOS_EXTERNOS_TABLE,
            modelName: 'UsuarioExterno',
            timestamps:false,
            hooks: {
                beforeValidate: (usuarioExterno, options) => {
                    // Obtener los valores del producto
                    const usuarioExternoValues = Object.values(usuarioExterno)[0];
                    // Transformarlo en un array iterable
                    Object.entries(usuarioExternoValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            usuarioExternoValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
    }
};
module.exports={USUARIOS_EXTERNOS_TABLE, UsuariosExternosSchema, UsuarioExterno}