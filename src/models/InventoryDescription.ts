const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');
const moment = require("moment");

export class InventoryDescriptionModel extends Model {}

InventoryDescriptionModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  guid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modelname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hasexpirydate :{
    type: DataTypes.BOOLEAN,
  },
  manufacturerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created: {
    type : 'TIMESTAMP',
    defaultValue : moment().format(),
    allowNull: false,
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
  modelName: 'InventoryDescription',
  tableName:'inventorydescriptions'
});
