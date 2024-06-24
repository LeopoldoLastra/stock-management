const express = require('express');
const router = express.Router();
const RemitoService = require ('../services/remitos.services');
const services = new RemitoService ();
const validatorHandler =require('../middleware/validator.handler');
const {createRemito, updateRemito}= require('../schemas/schema.remito')

router.post('/',
    validatorHandler(createRemito, 'body'),
    async (req,res,next)=>{
    try{
        const data = req.body;
        const newRemito = await services.create(data);
        res.status(200).json(newRemito)
    }catch(err){
        next(err);
    }
});

router.get('/',async (req,res,next)=>{
    try{
        const {origin, destination, date, status, id} = req.query;
        if(origin){       
            const editedOrigin = origin.replace(/-/g, ' ').toLowerCase(); 
            const remitosByOrigin = await services.find({editedOrigin});
            res.status(200).json(remitosByOrigin);
        } else if(destination){
            const editedDestination = destination.replace(/-/g, ' ').toLowerCase();
            const remitosByDestination = await services.find({editedDestination});
            res.status(200).json(remitosByDestination);
        }else if(date ){
            const remitosByDate = await services.find({date});
            res.status(200).json(remitosByDate);
        }else if(status){
            const editedStatus = status.replace(/-/g, ' ').toLowerCase();
            const remitoByStatus = await services.find({editedStatus});
            res.status(200).json(remitoByStatus);
        }else if(id){
            const remitoById = await services.find({id});
            res.status(200).json(remitoById);
        }
        else {
            const remitos = await services.find({});
            res.status(200).json(remitos);
        }              
    }catch(err){
        next(err);
    }
});

router.patch('/:id',
    validatorHandler(updateRemito, 'body'),
    async (req,res,next)=>{
    try{
        const {id}=req.params;
        const changes =req.body;
        const editedRemito = await services.update(id, changes);
        res.status(200).json(editedRemito);
    }catch(err){
        next(err)
    }
});

router.delete('/:id', async (req,res,next)=>{
    try{
        const {id} = req.params;
        const remitoDeleted =await services.delete(id);
        res.status(200).json(remitoDeleted);
    }catch(err){
        next(err);
    }
});

module.exports=router;