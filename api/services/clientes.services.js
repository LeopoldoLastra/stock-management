const {models}=require('../libs/sequelize');
const boom=require('@hapi/boom');

class CostumerServices{
    async create(data){
        const newCostumer = await models.Cliente.create(data,{include:['externalUser']});
        return newCostumer;
    };

    async findAllCostumersBy({dni,editedApellidoCliente,idCliente}){
        if(dni){    
            const allCustomersByDniCliente = await models.Cliente.findAll({where:{dniCliente:dni}, include:['externalUser']});
            return allCustomersByDniCliente;
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

    async update (id, changes){
        const costumer= await models.Cliente.findByPk(id); 
        const editedCostumer = await costumer.update(changes);
        if(editedCostumer){
            return editedCostumer;
        }else{
            throw boom.badData('Los datos del cliente no pueden ser actualizados');
        }    
    };

    async delete (id){
        const costumer= await models.Cliente.findByPk(id); 
        await costumer.destroy();
        return id

    }
    
};

module.exports=CostumerServices