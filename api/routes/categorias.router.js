const express = require('express');
const router = express.Router();
const CategoriaServices = require('../services/categorias.services');
const services = new CategoriaServices();

router.post('/', 
    async(req,res,next)=>{
        try{
            const data= req.body;
            const newCategory= await services.create(data);
            res.status(201).json({message:'Categoría creada', data:newCategory});
        }catch(err){
            next(err);
        }   
});

router.get('/', async(req,res,next)=>{
    try{
        const {categoryName} = req.query;
        const editedCategoryName =categoryName.replace(/-/g, ' ').toLowerCase();
        const searchedCategory = await services.findByCategory(editedCategoryName);
        res.status(200).json({message: 'La categoría es: ', data:searchedCategory})
    }catch(err){
        next(err);
    }
});

router.delete('/:id', async(req,res,next)=>{
    try{
        const {id} = req.params;
        const categoryDeleted = await services.delete(id);
        res.status(204).json({message: 'La categoría fué eliminada'})
    }catch(err){
        next(err)
    }
});

router.patch('/:id',async(req,res,next)=>{
    try{
        const category = req.params;
        const changes=req.body;
        const editedCategory = await services.update(id, changes);
        res.status(200).json(editedCategory);
    }catch(err){
        next(err)
    }
})

module.exports=router;