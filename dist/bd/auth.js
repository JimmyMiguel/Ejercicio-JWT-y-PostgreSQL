"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const sequelize_1 = require("sequelize");
const index_js_1 = require("../bd/index.js");
class Auth extends sequelize_1.Model {
    email;
    password;
    userId;
}
exports.Auth = Auth;
Auth.init({
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "User",
            key: "id"
        }
    }
}, {
    sequelize: index_js_1.sequelize,
    modelName: "Auth",
    tableName: "Auths"
});
