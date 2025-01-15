const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class ErrorMessage extends Model {}

ErrorMessage.init({
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
    statuscode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Ensures uniqueness of statuscode
    },
    errormessage: {
        type: DataTypes.STRING,
        allowNull: true, // Allows null values if the field is optional
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
    modelName: 'errorMessage',
    tableName: 'errormessages',
    schema: 'common', // Specifies the schema for the table
});

module.exports = ErrorMessage;
