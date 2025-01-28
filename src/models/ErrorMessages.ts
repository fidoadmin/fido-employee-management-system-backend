const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class ErrorMessageModel extends Model {}

ErrorMessageModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  guid: {
    type: DataTypes.STRING
  },
  statuscode: {
    type: DataTypes.INTEGER,
  },
  errormessage: {
    type: DataTypes.STRING,
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
  modelName: 'ErrorMessage',
  tableName: 'errormessages',
  schema: 'common', // Specifies the schema for the table

});


