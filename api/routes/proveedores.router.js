const express = require('express');
const router = express.Router();
const ProveedoresServices = require('../services/proveedores.services');
const services = new ProveedoresServices();

router.post('/', 
    async(req,res,next)=>{
        try{
            const data= req.body;
            const newSupplier= await services.create(data);
            res.status(201).json({message:'Categoría creada', data:newSupplier});
        }catch(err){
            next(err);
        }   
});

router.get('/', async(req,res,next)=>{
    try{
        const {supplier, active} = req.query;
        if(supplier){
            const editedSupplier =supplier.replace(/-/g, ' ').toLowerCase();
            const searchedSupplier = await services.findBy({editedSupplier});
            res.status(200).json({message: 'El proveedor es: ', data:searchedSupplier })
        }else if(active){
            const activeSuppliers = await services.findBy({active});
            res.status(200).json({message: 'Los proveedores activos son: ', data:activeSuppliers })
        }else{
            const suppliers = await services.findBy()
            res.status(200).json({message: 'Los proveedores son: ', data:suppliers })
            }  
    }catch(err){
        next(err);
    }
});

module.exports=router;