const Sequelize = require('sequelize');
const config = require('./../config/index').default;

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  logging: console.log,
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize

