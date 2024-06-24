const sequelize = require ('../libs/sequelize');
const {models} = require ('../libs/sequelize');
const boom = require ('@hapi/boom');

class RemitoServices{
   
    async create(data) {
        const tipoRemito = data.tipoRemito.replace(/-/g, ' ').toLowerCase();
        const transaction = await sequelize.transaction();

        try{
                if(tipoRemito === 'entrada' && data.remitosMovimientos){
                    data.estadoRemito ='finalizado';
                    await Promise.all(data.remitosMovimientos.map(async (movimiento)=> {movimiento.estadoMovimiento='finalizado', movimiento.dependenciaAfectada = data.dependenciaOriginante;

                    const stock = await models.Stock.findOne({where:{idDependencia:movimiento.dependenciaAfectada, idProducto: movimiento.idProducto }},{transaction})
                    if (stock) {
                        await stock.update({cantidadStock: stock.cantidadStock + movimiento.movimientoCantidad},{transaction});
                        }
                    }))
                }else{
                    await Promise.all(data.remitosMovimientos.map(async (movimiento)=> {movimiento.dependenciaAfectada = data.dependenciaOriginante;
                    }))

                }
              
                const newRemito = await models.Remito.create(data, {
                    include: [{
                        model: models.Movimiento,
                        as: 'remitosMovimientos',
                    }],
                    transaction
                });

                await transaction.commit();
                return newRemito;  
            
        }catch(err){
                await transaction.rollback();
                throw boom.badImplementation('No se pudo crear el remito y sus movimientos', err);

        }
    }

    async find({editedOrigin, editedDestination, date, editedStatus,id}){
        if(editedOrigin){
            const remitosByOrigin = await models.Remito.findAll({where:{origenRemito:editedOrigin},
                                                                    include: [
                                                                        {
                                                                            model: models.Movimiento,
                                                                            as: 'remitosMovimientos',
                                                                            include: [
                                                                                {
                                                                                    model: models.Producto,
                                                                                    as: 'movimientosProducto'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                });
            return remitosByOrigin;
        } else if(editedDestination){
            const remitosByDestination = await models.Remito.findAll({where:{destinoRemito:editedDestination},
                                                                        include: [
                                                                            {
                                                                                model: models.Movimiento,
                                                                                as: 'remitosMovimientos',
                                                                                include: [
                                                                                    {
                                                                                        model: models.Producto,
                                                                                        as: 'movimientosProducto'
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    });  
            return remitosByDestination;
        }else if(date){
            const remitosByDate = await models.Remito.findAll({where:{fechaRemito:date},
                                                                include: [
                                                                    {
                                                                        model: models.Movimiento,
                                                                        as: 'remitosMovimientos',
                                                                        include: [
                                                                            {
                                                                                model: models.Producto,
                                                                                as: 'movimientosProducto'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            });
            return remitosByDate;
        }else if(editedStatus){
            const remitoByStatus = await models.Remito.findAll({where:{estadoRemito:editedStatus},
                                                                include: [
                                                                    {
                                                                        model: models.Movimiento,
                                                                        as: 'remitosMovimientos',
                                                                        include: [
                                                                            {
                                                                                model: models.Producto,
                                                                                as: 'movimientosProducto'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                        });
            return remitoByStatus;
        }else if(id){
            const remitoById = await models.Remito.findAll({where:{idRemito:id},
                                                            include: [
                                                                {
                                                                    model: models.Movimiento,
                                                                    as: 'remitosMovimientos',
                                                                    include: [
                                                                        {
                                                                            model: models.Producto,
                                                                            as: 'movimientosProducto'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        });
            return remitoById;
        }
        else {
            const remitos = await models.Remito.findAll();
            return remitos;
        } 
    }

    async delete(id){
        const remitoToDelete = await this.find(id);
        if(remitoToDelete){
            await models.Remito.destroy({where:{idRemito:id}});
            return id;
        }else{
            throw new Error ('El remito no existe')
        }  
    }

    async update (id, changes){
        const remito= await models.Remito.findByPk(id,{
            include:[{
                model: models.Movimiento,
                as: 'remitosMovimientos'
            }]
        });

        if(!remito){
            throw boom.notFound('El remito no fué encontrado')
        }else if(remito.estadoRemito === 'finalizado'){
            throw boom.conflict('El remito está finalizado y no puede ser actualizado')
        }

        const editedRemito = await remito.update(changes);
      
        if(changes.estadoRemito==='en proceso'){
        
            if(editedRemito.tipoRemito ==='entrega'){
                const delivery = await models.Entrega.findOne({where:{idEntrega:editedRemito.entregaAsociada}})
                await delivery.update({estadoEntrega:'en proceso'})
            }
            await Promise.all(editedRemito.remitosMovimientos.map(async (movimiento)=>{
                await movimiento.update({ estadoMovimiento: 'finalizado' })

                const stock = await models.Stock.findOne({where:{idDependencia:movimiento.dependenciaAfectada, idProducto: movimiento.idProducto }})
                if (stock) {
                    await stock.update({cantidadStock: stock.cantidadStock - movimiento.movimientoCantidad});
                }
            } ))
             
        }else if(changes.estadoRemito==='finalizado'){
            if(editedRemito.tipoRemito !=='entrega'){  
                await Promise.all(editedRemito.remitosMovimientos.map(async (movimiento)=>{
                    await models.Movimiento.create({
                        idProducto: movimiento.idProducto,
                        tipoMovimiento: 'entrada',
                        movimientoCantidad: movimiento.movimientoCantidad,
                        observacionesMovimiento: movimiento.observacionesMovimiento,
                        idRemito: editedRemito.idRemito,
                        dependenciaAfectada: editedRemito.dependenciaOriginante,
                        estadoMovimiento: 'finalizado',
                    })
                    const stock = await models.Stock.findOne({where:{idDependencia:editedRemito.dependenciaOriginante, idProducto: movimiento.idProducto }})
                    if (stock) {
                        await stock.update({cantidadStock: stock.cantidadStock + movimiento.movimientoCantidad});
                    }
                    
                } ))
            }else{
                const delivery = await models.Entrega.findOne({where:{idEntrega:editedRemito.entregaAsociada}})
                await delivery.update({estadoEntrega:'finalizada'})
            }
           

        }

            if(editedRemito){
                return editedRemito;
            }else{
                throw boom.badData('El remito no puede ser actualizado');
            }  
        }      
    }
module.exports=RemitoServices;