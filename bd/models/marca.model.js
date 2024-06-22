const {Model, DataTypes, sequelize}=require('sequelize');


const MARCAS_TABLE= 'marcas';

const MarcasSchema={
    idMarca:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_marca'
    },
    nombreMarca:{
        allownull:false,
        type:DataTypes.STRING,
        unique:true,
        field: 'nombre_marca'
    },
    activo:{
        allownull:false,
        type:DataTypes.INTEGER,
        fiel:'activo',
        defaultValue:1
    }
};
class Marca extends Model {
    static associate(models){
        this.hasMany(models.Producto,{as: 'productosMarca'});
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: MARCAS_TABLE,
            modelName: 'Marca',
            timestamps:true,
            hooks: {
                beforeValidate: (marca, options) => {
                    // Obtener los valores de la marca
                    const marcaValues = Object.values(marca)[0];
                    // Transformarlo en un array iterable
                    Object.entries(marcaValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            marcaValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
}
};
module.exports={MARCAS_TABLE, MarcasSchema, Marca}