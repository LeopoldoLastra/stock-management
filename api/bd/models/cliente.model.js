const {Model, DataTypes, sequelize}=require('sequelize');

const {USUARIOS_EXTERNOS_TABLE}=require('./usuario.externo.model')

const CLIENTES_TABLE= 'clientes';

const ClientesSchema={
    idCliente:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_cliente'
    },
    nombreCliente:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'nombre_cliente'
    },
    apellidoCliente:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'apellido_cliente'
    },
    dniCliente:{
        allownull:false,
        type:DataTypes.BIGINT,
        field: 'dni_cliente'
    },
    calleCliente:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'calle_cliente'
    },
    numeroCliente:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'numero_cliente'
    },
    pisoCliente:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'piso_cliente'
    },
    deptoCliente:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'depto_cliente'
    },
    ufCliente:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'uf_cliente'
    },
    barrioCliente:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'barrio_cliente'
    },
    telefonoCliente:{
        allownull:false,
        type:DataTypes.BIGINT,
        field: 'telefono_cliente'
    },
    telefono2Cliente:{
        allownull:true,
        type:DataTypes.BIGINT,
        field: 'telefono_2_cliente'
    },
    mailCliente:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'mail_cliente'
    },
    cpCliente:{
        allownull:false,
        type:DataTypes.STRING,
        field: 'cp_cliente'
    },
    observacionesCliente:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'observaciones_cliente'
    }, 
    externalUserId:{
        allownull:false,
        type:DataTypes.INTEGER,
        field: 'external_user_id',
        unique:true,
        references:{
            model:USUARIOS_EXTERNOS_TABLE,
            key:'id_usuario_externo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Cliente extends Model {
    static associate(models){
        this.belongsTo(models.UsuarioExterno, {as:'externalUser', foreignKey:'externalUserId'})
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: CLIENTES_TABLE,
            modelName: 'Cliente',
            timestamps:true,
            hooks: {
                beforeValidate: (cliente, options) => {
                    // Obtener los valores del producto
                    const clienteValues = Object.values(cliente)[0];
                    // Transformarlo en un array iterable
                    Object.entries(clienteValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            clienteValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
}
};

module.exports={CLIENTES_TABLE, ClientesSchema, Cliente}