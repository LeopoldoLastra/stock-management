const express = require('express');
const router = express.Router();
const ProductServices = require('../services/productos.services');
const services = new ProductServices();
const validatorHandler = require('../middleware/validator.handler');
const {createProduct, editProduct} =require('../schemas/schema.productos');

router.post('/', 
    validatorHandler(createProduct, 'body'),
    async(req,res,next)=>{
        try{
            const data= req.body;
            const newProduct= await services.create(data);
            res.status(201).json({message:'Producto creado', data:newProduct});
        }catch(err){
            next(err);
        }   
});

router.get('/', async (req,res,next)=>{
    try{
        const {category,brand,supplier,id,code}=req.query;
        if(category){  
            const productsByCategory = await services.findAllProductsBy({category});
            res.status(200).json(productsByCategory);
        }else if(brand){
            const productsByBrand= await services.findAllProductsBy({brand})
            res.status(200).json(productsByBrand)
        }else if(supplier){
            const productsBySupplier = await services.findAllProductsBy({supplier});
            res.status(200).json(productsBySupplier)
        }else if(id){
            const productById = await services.findAllProductsBy({id});
            res.status(200).json(productById)
        }else if(code){
            const productByCode = await services.findAllProductsBy({code});
            res.status(200).json(productByCode)
        }
        else{
            const allProducts = await services.find();
            res.status(200).json(allProducts);
        }
    }catch(err){
        next(err);
    }
});

router.patch('/:code',
    validatorHandler(editProduct, 'body'),
    async(req,res,next)=>{
        try{
            const {code}=req.params;
            const changes=req.body;
            const editedProduct = await services.update(code, changes);
            res.status(200).json(editedProduct);
        }catch(err){
            next(err);
        }   
});

router.delete('/:code', async(req,res,next)=>{
    try{
        const {code}=req.params;
        const deletedProduct = await services.delete(code);
        res.status(204).json(deletedProduct);
    }catch(err){
        next(err);
    }   
});

module.exports=router;