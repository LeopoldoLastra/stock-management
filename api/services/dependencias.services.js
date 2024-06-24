const boom=require('@hapi/boom');
const {models}= require('../libs/sequelize');

class DependenciasServices{
    async create(data){
        
            const newDependency = await models.Dependencia.create(data);
            
            if(newDependency){
                return newDependency;
            }else{
                throw boom.conflict();
            }  
       
    }

    async findAll(){
        const allDependencies = await models.Dependencia.findAll();
        if(allDependencies){
            return allDependencies;
        }else{
            throw boom.notFound('No se encontraron dependencias');
        }  
    };

    async findDependencyById(id){
        const dependencyById = await models.Dependencia.findByPk(id);
        if(dependencyById){
            return dependencyById;
        } else{
            throw bood.notFound('No se pudo encontrar la dependencia')
        }
    }

    async delete(dependencyToDelete){
        const dependency = await models.Dependencia.findByPk(dependencyToDelete);
        if(dependency){
            await dependency.destroy();
        }else{
            throw boom.badData('La dependencia no pudo se encontrada')
        }
    };

    async update(changes, dependencyToModify){
        const dependency = await models.Dependencia.findByPk(dependencyToModify);
        if(dependency){
            const updatedDependency = await dependency.update(changes);
            return updatedDependency;
        }else{
            throw boom.conflict('No pudo encontrarse la dependencia')
        }
       
        
    }
}


module.exports=DependenciasServices