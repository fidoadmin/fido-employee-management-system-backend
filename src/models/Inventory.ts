const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');
const moment = require("moment");

export class InventoryModel extends Model {}

InventoryModel.init({
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
  modelnumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  packsize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  branchid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manufacturerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supplierid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agentid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shelf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  partnumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  manufacturerdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expirationdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  statusid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hscode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  categoryid: {
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
  modelName: 'Inventory',
  tableName:'inventories'
});
