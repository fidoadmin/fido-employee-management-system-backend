import { Sequelize } from 'sequelize'; 
import config from '../config'; 

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


sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports=sequelize