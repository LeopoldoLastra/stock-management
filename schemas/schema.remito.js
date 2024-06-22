const Joi= require('joi');


const fechaRemito = Joi.date();
const origenRemito = Joi.string().regex(/^[\w\s-]+$/);
const destinoRemito = Joi.string().regex(/^[\w\s-]+$/);
const estadoRemito = Joi.string().valid('pendiente','en proceso', 'finalizado');
const idRemitoAsociado = Joi.number().integer();
const tipoRemito = Joi.string().valid('entrada','movimiento interno', 'entrega', 'salida a service').insensitive();;
const dependenciaOriginante = Joi.number().integer();
const entregaAsociada = Joi.number().integer();
const idProducto = Joi.number().integer();
const tipoMovimiento = Joi.string().valid('entrada','salida').insensitive();;
const movimientoCantidad = Joi.number().integer();
const dependenciaAfectada = Joi.number().integer();

const createRemito = Joi.object({  
    fechaRemito:fechaRemito.required(),
    origenRemito:origenRemito.required(),
    destinoRemito:destinoRemito.required(),
    estadoRemito:estadoRemito,
    idRemitoAsociado:idRemitoAsociado,
    tipoRemito:tipoRemito.required(),
    dependenciaOriginante:dependenciaOriginante.required(),
    entregaAsociada:entregaAsociada,
    remitosMovimientos:Joi.array().items({
        idProducto:idProducto.required(),
        tipoMovimiento:tipoMovimiento.required(),
        movimientoCantidad:movimientoCantidad.required(),
        dependenciaAfectada:dependenciaAfectada
    })
});


const updateRemito = Joi.object({  
    fechaRemito:fechaRemito,
    origenRemito:origenRemito,
    destinoRemito:destinoRemito,
    estadoRemito:estadoRemito,
    idRemitoAsociado:idRemitoAsociado,
    tipoRemito:tipoRemito,
    dependenciaOriginante:dependenciaOriginante,
    entregaAsociada:entregaAsociada,
    remitosMovimientos:Joi.array().items({
        idProducto:idProducto,
        tipoMovimiento:tipoMovimiento,
        movimientoCantidad:movimientoCantidad,
        dependenciaAfectada:dependenciaAfectada
    })
});

module.exports ={createRemito, updateRemito}