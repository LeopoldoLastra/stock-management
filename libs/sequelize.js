const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels=require('../bd/models/index');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log
});

setupModels(sequelize);
sequelize.sync({ alter: true });


//const sequelize = new Sequelize('negocio','lolol','casa',{
//  host:'localhost',
//  dialect:'postgres'
//})

//const PASSWORD = encodeURIComponent(config.dbPassword);
//const URI = `postgres://lolol:casa@localhost:5432/negocio`;
//const USER = encodeURIComponent(config.dbUser);

//const sequelize = new Sequelize(URI, {
 // dialect: 'postgres',
//  logging: console.log
//});


module.exports = sequelize;