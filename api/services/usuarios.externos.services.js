const {models}=require('../libs/sequelize');
const boom=require('@hapi/boom');

class ExternalUsersServices{
    async create(data){
        const newExternalUser = await models.UsuarioExterno.create(data);
        return newExternalUser;
    };

    async findExternalUserBy(externalUserId){
        const externalUser =await models.UsuarioExterno.findAll({where:{idUsuarioExterno:externalUserId}});
        return externalUser;
    }

   
    
};

module.exports=ExternalUsersServices