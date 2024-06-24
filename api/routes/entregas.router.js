const express = require('express');
const router = express.Router();
const DeliveriesServices = require('../services/entregas.services');
const services =new DeliveriesServices();
const {createEntrega, updateEntrega}=require('../schemas/schema.entrega');
const validatorHandler = require('../middleware/validator.handler');

router.post('/',
    validatorHandler(createEntrega, 'body'),
    async(req,res,next)=>{
    try{
        const data = req.body;
        const newDelivery = await services.create(data)
        res.status(201).json({message:'Entrega generada', data:newDelivery});
    }catch(err){
        next(err)
    } 
});

router.post('/add-items',async(req,res,next)=>{
    try{
        const data = req.body;
        const newItem = await services.addItem(data)
        res.status(201).json({message:'Item agregado', data:newItem});
    }catch(err){
        next(err)
    }
   
});

router.get('/:id',async(req,res,next)=>{
    try{
        const id = req.params;
        const delivery = await services.findDeliveriesBy(id)
        res.status(200).json({message:'La entrega es', data:delivery});

    }catch(err){
        next(err)
    }
});

router.delete('/:id', async(req,res,next)=>{
    try{
        const deliverToDelete = req.params;
        const deliverRemoved = await services.delete(deliverToDelete);
        res.status(200).json({message:'Entrega eliminada', data:deliverRemoved})

    }catch(err){
        next(err);
    }
});

router.patch('/:deliveryToModify',
    validatorHandler(updateEntrega, 'body'),
    async (req,res,next)=>{
    try{
        const changes= req.body;
        const {deliveryToModify} = req.params;
        const modifiedDelivery = await services.update(deliveryToModify, changes);
        res.status(200).json({message:'La entrega fue correctamente modificada', data:modifiedDelivery})
    }catch(err){
        next(err)
    }
});

router.delete('/', async (req,res,next)=>{
    try{
        const {idProductoEntrega} = req.query;
        const itemtoDelete= await services.deleteItem(idProductoEntrega);
        res.status(200).json({message: 'El item fué eliminado correctamente', data:itemtoDelete});
    }catch(err){
        next(err)
    }
});

module.exports=router;