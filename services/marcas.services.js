const boom=require('@hapi/boom')
const {models}= require('../libs/sequelize')

class MarcaServices {
    async create (data){
        const newBrand = await models.Marca.create(data);
        if(newBrand){
            return newBrand;
        }else{
            throw boom.conflict();
        }      
    };

    async findByBrand (editedBrand){
       const searchedBrand = await models.Marca.findOne({where:{nombreMarca:editedBrand},
                                                            include:[{model:models.Producto, as: 'productosMarca'}]});
       if(searchedBrand){
            return searchedBrand; 
       }else {
            throw boom.notFound('No se encontró esta marca')
       }
    };

    async delete (id){
        const brandToDelete= await models.Marca.findByPk(id);
        await brandToDelete.destroy();
       return id
    };
}


module.exports = MarcaServices;