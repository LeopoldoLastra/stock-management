const boom=require('@hapi/boom');
const {models}= require('../libs/sequelize')

class DeliveriesServices {
    async create (data){
        const client = await models.Cliente.findByPk(data.idCliente);
        if(!client){
            throw boom.badData('No se encontró el cliente');
        }
        const newDelivery = await models.Entrega.create(data); 
        if(newDelivery){
            return newDelivery;
        }else{
            throw boom.conflict();
        }      
    };

    async addItem (data){
        if(Array.isArray(data) &&  data.length>0){
            const itemsAlreadyExist = [];
            const newItems = data.map(async (item)=>{
               
                const product = await models.Producto.findByPk(item.idProducto)
                const existingItems = await models.ProductoEntrega.findOne(
                                                            {where:{
                                                                idProducto:item.idProducto,
                                                                 idEntrega:item.idEntrega
                                                        }});
                if(existingItems){
                    itemsAlreadyExist.push(product.codigoProducto);
                    
                }else{
                    await models.ProductoEntrega.create(item);
                }
            })
            await Promise.all (newItems)
            if(itemsAlreadyExist.length>0){
                throw boom.conflict(`Los items ${itemsAlreadyExist.join(', ')} ya fueron agregados. ¿Desea modificarlos?`)
            }    
            return newItems;

        }else {
            const product = await models.Producto.findByPk(data.idProducto)
            const existingItem = await models.ProductoEntrega.findOne(
                {where:{
                    idProducto:data.idProducto,
                     idEntrega:data.idEntrega
            }});
            if(existingItem){
                    throw boom.conflict(`El item ${product.codigoProducto} ya fué agregado. ¿Desea modificarlo?`)
            }else{
                    const newItem= await models.ProductoEntrega.create(data);
                    return newItem;
                }    
        }
    };

    async findDeliveriesBy({id}){
        if(id){    
            const deliveriesById = await models.Entrega.findAll({where:{idEntrega:id}, include:['productDeliveries']});
            return deliveriesById;
        }else if(editedApellidoCliente){
            const allCustomersByApellidoCliente = await models.Cliente.findAll({where:{apellidoCliente:editedApellidoCliente}, include:['externalUser']});
            return allCustomersByApellidoCliente;
        }else if(idCliente){
            const allCustomersByIdCliente = await models.Cliente.findAll({where:{idCliente:idCliente}, include:['externalUser']});
            return allCustomersByIdCliente;
        }
        else{
            throw boom.notFound('Cliente no encontrado');
        }
    };

    async delete(deliverToDelete){
        const delivery = await models.Entrega.findByPk(deliverToDelete);
        if(delivery){
            await delivery.destroy();
        }else{
            throw boom.badData('La entrega no fué encontrada');
        }
    };

    async deleteItem(idProductoEntrega){
        const itemToDelete = await models.ProductoEntrega.findByPk(idProductoEntrega);
        if(itemToDelete){
            await itemToDelete.destroy();
            return itemToDelete;
        }else {
            throw boom.conflict('El producto no pudo ser eliminado')
        }
    }

    async update( deliveryToModify, changes){
        const delivery = await models.Entrega.findByPk(deliveryToModify)
        const modifiedDelivery = await delivery.update(changes)
        if(modifiedDelivery){
            return modifiedDelivery;
        }else{
            throw boom.badData('El producto no puede ser actualizado');
        }
    }
}
module.exports=DeliveriesServices