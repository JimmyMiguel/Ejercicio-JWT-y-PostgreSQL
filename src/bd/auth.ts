import { Model, DataTypes } from "sequelize"
import { sequelize } from "../bd/index.js"
import { UUID } from "node:crypto"

export class Auth extends Model {
  public email!:string
  public password!:string
  public userId!:UUID
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
 

 

