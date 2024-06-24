const Joi= require('joi');

const codigoProducto = Joi.string().regex(/^[\w\s\-\/\(\)]+$/);;
const nombreProducto = Joi.string().regex(/^[\w\s-]+$/);
const idCategoria = Joi.number().integer();
const idProveedor = Joi.number().integer();
const idMarca = Joi.number().integer();
const descripcionProducto = Joi.string();
const bultoProducto = Joi.number().integer();

const createProduct = Joi.object({  
    codigoProducto:codigoProducto.required(),
    nombreProducto:nombreProducto.required(),
    idCategoria:idCategoria.required(),
    idProveedor:idProveedor.required(),
    idMarca:idMarca.required(),
    descripcionProducto:descripcionProducto,
    bultosProducto:bultoProducto.required()
});

const editProduct = Joi.object({
    codigoProducto:codigoProducto,
    nombreProducto:nombreProducto,
    idCategoria:idCategoria,
    idProveedor:idProveedor,
    idMarca:idMarca,
    descripcionProducto:descripcionProducto,
    bultosProducto:bultoProducto
})

module.exports ={createProduct, editProduct}