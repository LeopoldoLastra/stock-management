const boom=require('@hapi/boom')
const {models}= require('../libs/sequelize')

class ProveedoresServices {
    async create (data){
        const newSupplier = await models.Proveedor.create(data);
        if(newSupplier){
            return newSupplier;
        }else{
            throw boom.conflict();
        }      
    };

    async findBy ({editedSupplier, active}){
       if(editedSupplier){
            console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
            const searchedSupplier= await models.Proveedor.findOne({where:{nombreProveedor:editedSupplier}, 
                                                                    include:[{model:models.Producto, as:'productosProveedor'}]
                                                                  });
            if(searchedSupplier){
                return searchedSupplier; 
            }else {
                throw boom.notFound('No se encontró el proveedor')
            }
       }else if(active){
            const activeSuppliers= await models.Proveedor.findAll({where:{activo:active}});
            if(activeSuppliers){
                return activeSuppliers; 
            }else {
                throw boom.notFound('No se encontró el proveedor')
        }
       }else{
        const suppliers = await models.Proveedor.findAll();
        if(suppliers){
            return suppliers; 
        }else {
            throw boom.notFound('No se encontró el proveedor')
    }
       }
       
     
    };

   
}


module.exports = ProveedoresServices;