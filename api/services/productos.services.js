
//const sequelize=require('../libs/sequelize')

//const getConnection=require('../libs/postgresclient');
const sequelize = require('../libs/sequelize');
const boom=require('@hapi/boom')
const {models}= require('../libs/sequelize')

class ProductServices {
    async create (data){
        const dependencias = await models.Dependencia.findAll();
        const newProduct = await models.Producto.create(data);

        const initialStock = dependencias.map(async (dependencia) => {
            return await models.Stock.create({
                idProducto: newProduct.idProducto, 
                idDependencia: dependencia.idDependencia, 
                cantidad: 0
            });
        });

        await Promise.all(initialStock);
        if(newProduct){
            return newProduct;
        }else{
            throw boom.conflict();
        }      
    }

    async find (){
       const products = await models.Producto.findAll();
       if(products){
            return products; 
       }else {
            throw boom.notFound('Productos no disponibles')
       }
    }

    async findAllProductsBy({editedType, editedBrand, editedSupplier,id,code}){    
        if(editedType){    
            const allProductsByType = await models.Producto.findAll({where:{idCategoria:editedType},
                                                                        include:[{model:models.Categoria, as:'categoriaProducto'},
                                                                            {model:models.Proveedor,as:'proveedorProducto'},
                                                                            {model:models.Marca, as:'marcaProducto'}
                                                                    ]});
            return allProductsByType;
        }else if(editedBrand){
            const allProductsByBrand = await models.Producto.findAll({where:{idMarca:editedBrand},
                                                                        include:[{model:models.Categoria, as:'categoriaProducto'},
                                                                            {model:models.Proveedor,as:'proveedorProducto'},
                                                                            {model:models.Marca, as:'marcaProducto'}
                                                                    ]});
            return allProductsByBrand;
        }else if(editedSupplier){
            const allProductsBySupplier = await models.Producto.findAll({where:{idProveedor:editedSupplier},
                                                                            include:[{model:models.Categoria, as:'categoriaProducto'},
                                                                                {model:models.Proveedor,as:'proveedorProducto'},
                                                                                {model:models.Marca, as:'marcaProducto'}
                                                                        ]});
            return allProductsBySupplier;
        }else if(id){
            
            const productById = await models.Producto.findOne({where:{idProducto:id}, 
                                                                include:[{model:models.Categoria, as:'categoriaProducto'},
                                                                        {model:models.Proveedor,as:'proveedorProducto'},
                                                                        {model:models.Marca, as:'marcaProducto'}
                                                                ]});
            return productById;
        }else if(code){
            const productByCode = await models.Producto.findOne({where:{codigoProducto:code},
                                                                    include:[{model:models.Categoria, as:'categoriaProducto'},
                                                                        {model:models.Proveedor,as:'proveedorProducto'},
                                                                        {model:models.Marca, as:'marcaProducto'}
                                                                ]});
            return productByCode;
        }
        else{
            throw boom.notFound('Productos no disponibles');
        }
    }

    async update (code, changes){
        const product= await this.findOne(code);
        const editedProduct =await product.update(changes);
        if(editedProduct){
            return editedProduct;
        }else{
            throw boom.badData('El producto no puede ser actualizado');
        }   
    }

    async delete (id){
        const product= await this.findOne(id);
        await product.destroy();
       return id
    }
}


module.exports = ProductServices