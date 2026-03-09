"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const index_js_1 = require("../bd/index.js");
class User extends sequelize_1.Model {
    id;
    birthDate;
    fullname;
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: index_js_1.sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: false
});
