const {Model, DataTypes, Sequelize} = require('sequelize');

const PRODUCTOS_TABLE = 'productos';

const ProductosSchema = {
    idProducto:{
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'id_producto'
    },
    codigoProducto:{
        allowNull:false, 
        type: DataTypes.STRING,
        field:'codigo_producto',
        unique:true
    },
    nombreProducto:{
        allowNull:false,
        type: DataTypes.STRING,
        field:'nombre_producto'
    },
    idCategoria:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'id_categoria'
    },
    idProveedor:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'id_proveedor'
    },
    idMarca:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'id_marca'
    },
    descripcionProducto:{
        allowNull:true,
        type: DataTypes.TEXT,
        field:'descripcion_producto'
    },
    bultosProducto:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'bultos_producto'
    }
}

class Producto extends Model{
    static associate(models){
        this.belongsToMany(models.Stock,
            {as:'ProductsOnStock',
            through:models.StockProducto,
            foreignKey: 'IdProducto',
            otherkey: 'IdStock'
            }
        );
        this.hasMany(models.Movimiento, {as:'productoMovimientos', foreignKey:'idProducto'});
        this.belongsToMany(models.Entrega, 
                            {as:'productsToBeDeliverd',
                            through:models.ProductoEntrega,
                            foreignKey:'idProducto',
                            otherKey:'idEntrega'
                            });
        this.belongsTo(models.Categoria, {as:'categoriaProducto', foreignKey:'idCategoria'});
        this.belongsTo(models.Proveedor, {as:'proveedorProducto', foreignKey:'idProveedor'});
        this.belongsTo(models.Marca, {as:'marcaProducto', foreignKey:'id_marca'});
        
    };
    static config(sequelize){
        return{
            sequelize,
            tableName: PRODUCTOS_TABLE,
            modelName: 'Producto',
            timestamps:false,
            hooks: {
                beforeValidate: (producto, options) => {
                    // Obtener los valores del producto
                    const productValues = Object.values(producto)[0];
                    // Transformarlo en un array iterable
                    Object.entries(productValues).forEach(([key,value]) => {
                        // Verificar si el valor es una cadena y convertirlo a minúsculas si es así
                        if (typeof value === 'string') {
                            productValues[key] = value.toLowerCase();
                        }
                    });
                }
            }
        }
    }
}
module.exports={PRODUCTOS_TABLE, ProductosSchema, Producto}