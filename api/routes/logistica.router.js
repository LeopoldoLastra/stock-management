const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send("Tabla Logística")
});

module.exports=router;