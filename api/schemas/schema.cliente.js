const Joi= require('joi');

const nombreCliente = Joi.string().regex(/^[\w\s-]+$/);
const apellidoCliente = Joi.string().regex(/^[\w\s-]+$/);
const dniCliente = Joi.number().integer().positive();
const calleCliente = Joi.string().regex(/^[\w\s-]+$/);
const numeroCliente = Joi.number().integer();
const pisoCliente = Joi.string();
const departamentoCliente = Joi.string().regex(/^[\w\s-]+$/);
const ufCliente = Joi.number().integer();
const barrioCliente = Joi.string().regex(/^[\w\s-]+$/);
const telefonoCliente = Joi.number().integer().positive();
const telefono2Cliente = Joi.number().integer().positive();
const mailCliente = Joi.string();
const cpCliente = Joi.number().integer();
const observacionesCliente = Joi.string();
const userName = Joi.string();
const password = Joi.string();

const createCostumer = Joi.object({  
    nombreCliente:nombreCliente.required(),
    apellidoCliente:apellidoCliente.required(),
    dniCliente:dniCliente.required(),
    calleCliente:calleCliente.required(),
    numeroCliente:numeroCliente.required(),
    pisoCliente:pisoCliente,
    departamentoCliente:departamentoCliente,
    ufCliente:ufCliente,
    barrioCliente:barrioCliente,
    telefonoCliente:telefonoCliente,
    telefono2Cliente :telefono2Cliente,
    mailCliente:mailCliente.required(),
    cpCliente:cpCliente,
    observacionesCliente:observacionesCliente,
    externalUser:Joi.object({
        userName:userName.required(),
        password:password.required()
    })
});


const updateCostumer = Joi.object({  
    nombreCliente:nombreCliente,
    apellidoCliente:apellidoCliente,
    dniCliente:dniCliente,
    calleCliente:calleCliente,
    numeroCliente:numeroCliente,
    pisoCliente:pisoCliente,
    departamentoCliente:departamentoCliente,
    ufCliente:ufCliente,
    barrioCliente:barrioCliente,
    telefonoCliente:telefonoCliente,
    telefono2Cliente :telefono2Cliente,
    mailCliente:mailCliente,
    cpCliente:cpCliente,
    observacionesCliente:observacionesCliente
});

module.exports ={ createCostumer, updateCostumer}