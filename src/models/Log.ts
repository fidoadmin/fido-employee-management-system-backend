const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class Log extends Model {}

Log.init({
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
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    severity: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
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
    modelName: 'log',
    tableName: 'logs',
    schema: 'common', // Specify the schema
});

module.exports = Log;
