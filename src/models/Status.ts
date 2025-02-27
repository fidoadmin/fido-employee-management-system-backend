const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class StatusModel extends Model {}

StatusModel.init({
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created: {
        type: DataTypes.STRING,
        allowNull: true,
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
  modelName: 'status',
  tableName: 'status'
});
