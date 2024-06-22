const express = require('express');
const router = express.Router();
const MarcaServices = require('../services/marcas.services');
const services = new MarcaServices();

router.post('/', 
    async(req,res,next)=>{
        try{
            const data= req.body;
            const newBrand= await services.create(data);
            res.status(201).json({message:'Marca creada', data:newBrand});
        }catch(err){
            next(err);
        }   
});

router.get('/', async(req,res,next)=>{
    try{
        const {brand} = req.query;
        const editedBrand =brand.replace(/-/g, ' ').toLowerCase();
        const searchedBrand = await services.findByBrand(editedBrand);
        res.status(200).json({message: 'La marca es: ', data:searchedBrand})
    }catch(err){
        next(err);
    }
});

router.delete('/:id', async(req,res,next)=>{
    try{
        const {id} = req.params;
        const brandDeleted = await services.delete(id);
        res.status(200).json({message: 'La marca eliminada es la ', data:brandDeleted});
    }catch(err){
        next(err)
    }
})

module.exports=router;