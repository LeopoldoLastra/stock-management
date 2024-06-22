const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Tabla Usuarios")
});

module.exports=router;