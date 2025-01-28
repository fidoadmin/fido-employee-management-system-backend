const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class UserModel extends Model {}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  guid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  clientid:{
    type:DataTypes.INTEGER,
    allowNull:true,

  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailaddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  created: {
    type: DataTypes.STRING,
  },
  modified: {
    type: DataTypes.STRING,
  },
  deleted: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'User',
  schema: 'common',
  tableName:'employees'
});
