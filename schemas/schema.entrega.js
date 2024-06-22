const Joi= require('joi');

const idCliente = Joi.number().integer();
const fechaEntrega = Joi.date();
const horaEntrega = Joi.string().regex(/^[\w\s-]+$/);
const observacionesEntrega = Joi.string();
const idDependenciaLogistica = Joi.number().integer();
const estadoEntrega = Joi.string().valid('pendiente','en proceso', 'finalizada', 'anulada').insensitive();;

const createEntrega = Joi.object({  
    idCliente:idCliente.required(),
    fechaEntrega:fechaEntrega.required(),
    horaEntrega:horaEntrega.required(),
    observacionesEntrega:observacionesEntrega.required(),
    idDependenciaLogistica:idDependenciaLogistica,
    estadoEntrega:estadoEntrega
});


const updateEntrega = Joi.object({  
    idCliente:idCliente,
    fechaEntrega:fechaEntrega,
    horaEntrega:horaEntrega,
    observacionesEntrega:observacionesEntrega,
    idDependenciaLogistica:idDependenciaLogistica,
    estadoEntrega:estadoEntrega
});

module.exports ={ createEntrega, updateEntrega}