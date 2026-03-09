"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Auth = void 0;
// associations.ts
const user_1 = require("./user"); // ajustá la ruta
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const auth_1 = require("./auth"); // ajustá la ruta
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_1.Auth; } });
user_1.User.hasOne(auth_1.Auth, { foreignKey: 'userId' });
auth_1.Auth.belongsTo(user_1.User, { foreignKey: 'userId' });
