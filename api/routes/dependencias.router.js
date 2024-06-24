const express = require('express');
const router = express.Router();
const DependenciasServices = require('../services/dependencias.services')
const services = new DependenciasServices()

router.post('/', async(req,res,next)=>{
    try{
        const data = req.body;
        const newDependency = await services.create(data);
        res.status(201).json({message:'Dependencia creada', data:newDependency});
    }catch(err){
        next(err);
    }
});

router.get('/',async (req,res, next)=>{
    try{
        const allDependencies = await services.findAll();
        res.status(200).json({message:'Las dependencias existentes son', data:allDependencies });
    }catch(err){
        next(err)
    }
});

router.get('/:id',async (req,res, next)=>{
    try{
        const id =req.params;
        const dependencyById = await services.findDependencyById(id);
        res.status(200).json({message:'Las dependencias existentes son', data:allDependencies });
    }catch(err){
        next(err)
    }
});

router.patch('/:id', async(req,res,next)=>{
    try{
        const dependencyToModify = req.params;
        const changes = req.body;
        const updatedDependency = await services.update(changes, dependencyToModify);
        res.status(200).json({message:'La dependencia fué actualizada', data:updatedDependency})

    }catch(err){
        next(err);
    }
});

router.delete('/:id', async (req,res,next)=>{
    try{
        const dependencyToDelete = req.params;
        await services.delete(dependencyToDelete );
        res.status(204).json({message:'La dependencia fué eliminada'})

    }catch(err){
        next(err);
    }
});

module.exports=router;