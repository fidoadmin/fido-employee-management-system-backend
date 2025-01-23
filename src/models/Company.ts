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
    clientid: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
