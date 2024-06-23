const {Remito, RemitosSchema}= require('./remito.model');
const {Producto, ProductosSchema}= require('./producto.model');
const {Movimiento, MovimientosSchema}= require('./movimiento.model');
const {RemitoAsociado, RemitosAsociadosSchema}=require('./remito.asociado.model');
const {DependenciaLogistica, DependenciasLogisticaSchema}= require('./dependencia.logistica.model');
const {Entrega, EntregasSchema}= require('./entregas.model');
const {Cliente, ClientesSchema}= require('./cliente.model');
const {Usuario, UsuariosSchema}= require('./usuario.model');
const {Dependencia, DependenciasSchema}= require('./dependencia.model');
const {Stock, StockSchema}= require('./stock.model');
const {StockProducto, StockProductosSchema}= require('./stock_producto.model');
const {ProductoEntrega, ProductoEntregaSchema}= require('./producto_entrega.model');
const {UsuarioExterno, UsuariosExternosSchema}=require('./usuario.externo.model');
const {Categoria, CategoriasSchema} =require('./categoria.model');
const {Proveedor, ProveedoresSchema} =require('./proveedor.models');
const {Marca, MarcasSchema} =require('./marca.model');


function setupModels(sequelize){
    Remito.init(RemitosSchema, Remito.config(sequelize) );
    Producto.init(ProductosSchema,Producto.config(sequelize));
    Movimiento.init(MovimientosSchema, Movimiento.config(sequelize));
    RemitoAsociado.init(RemitosAsociadosSchema, RemitoAsociado.config(sequelize));
    DependenciaLogistica.init(DependenciasLogisticaSchema, DependenciaLogistica.config(sequelize));
    Entrega.init(EntregasSchema, Entrega.config(sequelize));
    Cliente.init(ClientesSchema, Cliente.config(sequelize));
    Usuario.init(UsuariosSchema, Usuario.config(sequelize));
    Dependencia.init(DependenciasSchema, Dependencia.config(sequelize));
    Stock.init(StockSchema,Stock.config(sequelize));
    StockProducto.init(StockProductosSchema, StockProducto.config(sequelize));
    ProductoEntrega.init(ProductoEntregaSchema, ProductoEntrega.config(sequelize));
    UsuarioExterno.init(UsuariosExternosSchema,UsuarioExterno.config(sequelize));
    Categoria.init(CategoriasSchema, Categoria.config(sequelize));
    Marca.init(MarcasSchema, Marca.config(sequelize));
    Proveedor.init(ProveedoresSchema, Proveedor.config(sequelize));

    Producto.associate(sequelize.models);
    Stock.associate(sequelize.models);
    Dependencia.associate(sequelize.models);
    Remito.associate(sequelize.models);
    Movimiento.associate(sequelize.models);
    Cliente.associate(sequelize.models);
    UsuarioExterno.associate(sequelize.models);
    Entrega.associate(sequelize.models);
    Categoria.associate(sequelize.models);
    Proveedor.associate(sequelize.models);
    Marca.associate(sequelize.models);

};


module.exports=setupModels;