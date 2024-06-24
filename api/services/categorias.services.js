const boom=require('@hapi/boom')
const {models}= require('../libs/sequelize')

class CategoriaServices {
    async create (data){
        const newCategory = await models.Categoria.create(data);
        if(newCategory){
            return newCategory;
        }else{
            throw boom.conflict();
        }      
    };

    async findByCategory (editedCategoryName){
       const searchedCategory = await models.Categoria.findOne({where:{nombreCategoria:editedCategoryName}});
       if(searchedCategory){
            return searchedCategory; 
       }else {
            throw boom.notFound('No se encontró la categoría')
       }
    };

    async update(id, changes){
        const categoryToModify = await models.Categoria.findByPk(id)
        if(categoryToModify){
            const updatedCategory = await categoryToModify.update(changes)
            return updatedCategory 
        }else{
            throw boom.badData('No se pudo modificar')
        }
    };


    async delete (id){
        const categoryToDelete= await models.Categoria.findByPk(id);
        await categoryToDelete.destroy();
       return id
    };
}


module.exports = CategoriaServices;