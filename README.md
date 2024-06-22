# stock-management
Surgió como un software para la gestión de stock, pero fué sumando funcionalidades.

Lo que se busca es que cualquier movimiento de un producto quede registrado, de forma tal que se pueda tener un registro del stock de cada una de las sucursales (dependencias) con las que se trabaje.

    1-La tabla "productos" tienen los detalles del producto. 
    Esta se relaciona con las tablas:
       1.a- "Categorías": están definidas las distintas categorías de productos existentes.
       1.b- "Marcas": están definidas las distintas marcas con las que se trabaja.
       1.c- "Proveedores": están definidos los distintos proveedores con los que se trabaja
     Conjugando estas cuatro tablas podemos tener información completa de cada producto.

     2-La tabla "clientes", tiene información de cada cliente con el que trabajamos. 

     3-La tabla "entregas" permite crear entregas para aquellos clientes que hayan realizado una compra. Estas entregas estarán pendientes hasta que se concreten.

     4-La tabla "remitos" permite controlar cualquier movimiento de mercadería. No puede realizarse un movimiento, si que haya un remito que lo respalde.
     Existen cuatro tipos de remito:
       1- "Entrada": se recibe mercadería de un proveedor.
       2- "Entrega": se entrega mercadería a aquel cliente que ha realizado una compra.
       3- "Movimiento Interno": se traslada mercadería entre las distintas sucursales (dentro de la aplicación se las menciona como dependencias)
       4- "Salida a Service": se utiliza cuando un producto es enviado al servicio técnico.
      
      Al generarse un remito, dependiendo del tipo de remito que se trate y del estado ("pendiente", "en proceso" o finalizado"), se generarán distintos movimientos de mercadería (que se registrarán en la tabla "movimientos") e impactarán en el stock (de la dependencia correspondiente) una vez que su estado sea "finalizado".

Para el desarrollo de la aplicación se utiliza:
      
**el Framework Express (https://expressjs.com/es/).

**Para la lectura de las variables de entorno se utiliza dotenv (https://www.npmjs.com/package/dotenv)

**Para las validacones de datos se utiliza la librería JOI (https://joi.dev/)

**Para el manejo de errores se utiliza la librería @hapi/boom (https://hapi.dev/).

**Para la gestión de base de datos se utiliza el ORM Sequelize (https://sequelize.org/).

**La base de datos está en Postgres (https://www.postgresql.org/), y se utiliza el gestor gráfico PgAdmin.
