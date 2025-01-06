
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class LogModel extends Model {}

LogModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  guid: {
    type: DataTypes.UUID,
  },
  message: {
    type: DataTypes.STRING,
    allowNll: false,
  },
  severity: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  userid: {
    type: DataTypes.INTEGER,
  },
  clientid: {
    type: DataTypes.INTEGER,
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
  schema: 'common',
  modelName: 'Log',
  tableName:'logs'
});


