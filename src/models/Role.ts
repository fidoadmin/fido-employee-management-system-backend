const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');  // Assuming this is your Sequelize connection

// Define the Roles model
export class RolesModel extends Model {}

RolesModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Automatically increments
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensures this field is required
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures the code is unique
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Sets the default to the current timestamp
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
    sequelize,  // The sequelize instance
    modelName: 'Roles',
    tableName: 'roles',  // You can adjust the table name if it's different
    timestamps: false, // Disable automatic timestamp fields if not needed
    schema: 'common'
});

// Export the model for use in other parts of your application
export default RolesModel;
 