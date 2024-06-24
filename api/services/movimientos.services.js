const boom=require('@hapi/boom');
const {models}= require('../libs/sequelize')


class MovimientosServices{

    async findMovementsByDependencyId(id){
        const  movementsByDependencyId = await models.Movimiento.findAll({where:{dependenciaAfectada:id}})
        
        if( movementsByDependencyId){
            return movementsByDependencyId
        }else{
            throw boom.badData('No se encontraron movimientos')
        }  ;
    }
};

module.exports = MovimientosServices