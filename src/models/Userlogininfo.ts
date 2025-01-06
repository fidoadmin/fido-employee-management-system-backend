const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class UserLoginInfoModel extends Model {}

UserLoginInfoModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  guid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loggedin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loggedout: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
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
  modelName: 'UserLoginInfo',
  schema: 'common',
  tableName:'userlogininfo'
});
