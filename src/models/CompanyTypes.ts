const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class CompanyTypeModel extends Model {}

CompanyTypeModel.init({
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
    code: {
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
    }
   
}, {
  sequelize,
  timestamps: false,
  modelName: 'companytype',
  schema: 'common',
  tableName:'companytypes'
});
