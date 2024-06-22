const express = require('express');
const router = express.Router();
const MovimientosServices = require('../services/dependencias.services')
const services = new MovimientosServices()

router.get('/', async (req,res,next)=>{
    try{
        const id = req.params;
        const movementsByDependencyId = await services.findMovementByDependencyId(id);
        res.status(200).json({message:'Los movimientos son: ', data:movementsByDependencyId })
    }catch(err){
        next(err)
    }
});

module.exports=router;