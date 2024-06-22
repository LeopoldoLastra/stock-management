const express = require('express');
const router = express.Router();
const CostumerServices =require('../services/clientes.services')
const services =new CostumerServices();
const {createCostumer, updateCostumer}= require('../schemas/schema.cliente');
const validatorHandler = require('../middleware/validator.handler');

router.post('/', 
    validatorHandler(createCostumer,'body'),
    async(req,res,next)=>{
        try{
            const data =req.body;
            const newCostumer= await services.create(data);
            res.status(201).json({message:'Cliente creado', data:newCostumer});
        }catch(err){
            next(err);
        }
    });

router.get('/',async (req,res,next)=>{
    try{
        const {dni,apellido,idCliente}=req.query;

        if(dni){
            
            const costumersByDniCliente = await services.findAllCostumersBy({dni});
            res.status(200).json(costumersByDniCliente);
        }else if(apellido){
            const editedApellidoCliente = apellido.replace(/-/g, ' ').toLowerCase();
            const costumersByApellidoCliente= await services.findAllCostumersBy({editedApellidoCliente})
            res.status(200).json(costumersByApellidoCliente)
        }else if(idCliente){
           
            const productsByidCliente = await services.findAllCostumersBy({idCliente});
            res.status(200).json(productsBySupplier)
        }
        else{
            const allProducts = await services.find();
            res.status(200).json(allProducts);
        }
    }catch(err){
        next(err);
    }   
});

router.patch('/:id',
    validatorHandler(updateCostumer,'body'),
    async(req,res,next)=>{
        try{
            const changes = req.body;
            const {id} =req.params;
            const updatedCostumer = await services.update(id, changes);
            res.status(200).json(updatedCostumer);
        }catch(err){
            next(err)
        }
});

router.delete('/:id', async(req,res,next)=>{
    try{
        const {id}= req.params;
        const deletedCostumer = await services.delete(id);
        res.status(204).json(deletedCostumer);
    }catch(err){
        next(err)
    }
});

module.exports=router;