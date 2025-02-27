const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class ContainerModel extends Model {}

ContainerModel.init({
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
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
    modelName: 'container',
    tableName: 'containers'
});

export default ContainerModel;
