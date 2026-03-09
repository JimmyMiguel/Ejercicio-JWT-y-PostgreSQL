import { Model, DataTypes } from "sequelize"
import { sequelize } from "../bd/index"
import { UUID } from "node:crypto"

export class Auth extends Model {
  declare email: string
  declare password: string
  declare userId: number
}

Auth.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }

  }
}, {
  sequelize,
  modelName: "Auth",
  tableName: "Auths",
  freezeTableName: true
})




