const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class BranchModel extends Model {}

BranchModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
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
    created: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    modified: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    deleted: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    companyid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
  sequelize,
  timestamps: false,
  modelName: 'branch',
  tableName:'branches'
});
