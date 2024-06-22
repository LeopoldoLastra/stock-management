const express = require('express');
const router = express.Router();
const StockServices = require('../services/stocks.services');
const services = new StockServices();

router.post('/', async (req,res,next)=>{
    try{
        const data = req.body;
        const newDependencyStock = await services.create(data);
        res.status(201).json({message:'Se ha creado el nuevo stock', data:newDependencyStock})
    }catch (err){
        next(err)
    }
});

router.get('/:id',async (req,res,next)=>{
    try{
        const id = req.params;
        const stockByDependency = await services.findByDependency(id)
        res.status(200).json(stockByDependency)
    }catch(err){
        next(err)
    }  
});

module.exports=router;