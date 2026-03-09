import { Model, DataTypes } from "sequelize"
import { sequelize } from "../bd/index"
import { UUID } from "node:crypto"


export class User extends Model {
  declare id: number
  declare birthDate: string
  declare fullname: string
}

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
    freezeTableName: true
  })

