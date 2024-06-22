const {Model, DataTypes, sequelize}=require('sequelize');


const PROVEEDORES_TABLE= 'proveedores';

const ProveedoresSchema={
    idProveedor:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_proveedor'
    },
    nombreProveedor:{
        allownull:false,
        type:DataTypes.STRING,
        unique: true,
        field: 'nombre_proveedor'
    },
    direccionProveedor:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'direccion_proveedor'
    },
    mailProveedor:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'mail_proveedor'
    },
    telefonoProveedor:{
        allownull:true,
        type:DataTypes.STRING,
        field: 'telefono_proveedor'
    },
    observacionesProveedor:{
        allownull:true,
        type:DataTypes.STRING,
        fiel:'observaciones_proveedor'
    },
    activo:{
        allownull:false,
        type:DataTypes.INTEGER,
        fiel:'activo',
        defaultValue:1
    }
};
class Proveedor extends Model {
    static associate(models){
        this.hasMany(models.Producto,{as:'productosProveedor'});
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: PROVEEDORES_TABLE,
            modelName: 'Proveedor',
            timestamps:true,
            hooks: {
                beforeValidate: (proveedor, options) => {
                    // Obtener los valores de la proveedor
                    const proveedorValues = Object.values(proveedor)[0];
                    // Transformarlo en un array iterable
                    Object.entries(proveedorValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            proveedorValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
}
};
module.exports={PROVEEDORES_TABLE, ProveedoresSchema, Proveedor}