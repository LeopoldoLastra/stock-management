const express = require('express');
const router = express.Router();
const ExternalUsersServices = require('../services/usuarios.externos.services');
const services = new ExternalUsersServices();
const validatorHandler = require('../middleware/validator.handler');

router.get('/:externalUserId',async (req,res, next)=>{ 
    try{
        const {externalUserId}= req.params;
        const externalUser = await services.findExternalUserBy(externalUserId)
        res.status(200).json({data:externalUser})
    }catch(err){
        next(err);
    }
});

router.post('/',async (req,res,next)=>{
    try{
        const data = req.body;
        const newExternalUser = await services.create(data);
        res.status(201).json({message:'Usuario creado', data:newExternalUser});
    }catch(err){
        next(err);
    }; 
});

module.exports=router;