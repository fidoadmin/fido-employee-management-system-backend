const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connect/index"); // Adjust the import as per your actual connection

export class ClientModel extends Model {}

ClientModel.init(
  {
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
    code: {
      type: DataTypes.STRING(50), 
      allowNull: false,
      unique: true, 
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
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Client",
    tableName: "clients",
    schema: "common", 
  }
);
