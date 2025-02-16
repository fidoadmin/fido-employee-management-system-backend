const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index'); // Adjust the import as per your actual connection

export class CompanyModel extends Model {}

CompanyModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null
    },
    emailaddress: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null
    },
    pan: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null
    },
    clientname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    locallevel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ward: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    modified: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleted: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: false,
    modelName: 'Company',
    tableName: 'companies', // Explicitly maps to 'companies' table in the database
    schema: 'common' // Explicitly set the schema if needed
});

export default CompanyModel;
