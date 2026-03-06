import { Model, DataTypes } from "sequelize"
import { sequelize } from "../bd/index.js"

export class Auth extends Model { }

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
  userId:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
      model:"User",
      key:"id"
    }

  }
}, {
  sequelize,
  modelName: "Auth",
  tableName: "Auths"
})

 

