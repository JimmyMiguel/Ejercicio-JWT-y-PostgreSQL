import { Model, DataTypes } from "sequelize"
import { sequelize } from "../bd/index.js"
 

export class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },  
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: false
  })
