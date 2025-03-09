import { DataTypes, Model } from 'sequelize';
const sequelize = require('../connect/index');

export class EmployeeModel extends Model {}

EmployeeModel.init({
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
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailaddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  staffnumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  joindate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dateofbirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  pan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  citizennumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employeedetailsid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created: {
    type: DataTypes.DATE,
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
  modelName: 'Employee',
  tableName: 'employees',
  schema:'common'
});

export default EmployeeModel;
