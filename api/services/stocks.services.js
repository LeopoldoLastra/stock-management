const {models} = require ('../libs/sequelize');
const boom = require ('@hapi/boom');

class StockServices{

    async create(data){
        const dependency = await models.Depencia.findByPk(data.idDependencia)
        if(dependency){
            const newDependencyStock = await models.Stock.create(data);
            if(newDependencyStock){
                return newDependencyStock;
            }else{
                throw boom.conflict('No se pudo crear el stock para la nueva dependencia');
            }
        }else{
            throw boom.badData('No existe la dependencia para la que quiere crear el stock');
        }
       
       
    }

    async findByDependency(id){
        const searchedStock = await models.Stock.findAll({Where:{idDependencia:id}});
        
        if(searchedStock){
            return searchedStock
        }else{
            throw boom.notFound('No se encontró stock para la dependencia buscada');
        }
        
    }


};

module.exports = StockServices;