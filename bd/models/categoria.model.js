const {Model, DataTypes, sequelize}=require('sequelize');


const CATEGORIAS_TABLE= 'categorias';

const CategoriasSchema={
    idCategoria:{
        allownull:false,
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        field:'id_categoria'
    },
    nombreCategoria:{
        allownull:false,
        type:DataTypes.STRING,
        unique: true,
        field: 'nombre_categoria'
    }
};
class Categoria extends Model {
    static associate(models){
        this.hasMany(models.Producto,{as: 'productosCategoria', foreignKey: 'idCategoria'});
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: CATEGORIAS_TABLE,
            modelName: 'Categoria',
            timestamps:true,
            hooks: {
                beforeValidate: (categoria, options) => {
                    // Obtener los valores de la categoria
                    const categoriaValues = Object.values(categoria)[0];
                    // Transformarlo en un array iterable
                    Object.entries(categoriaValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            categoriaValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
}
};
module.exports={CATEGORIAS_TABLE, CategoriasSchema, Categoria}