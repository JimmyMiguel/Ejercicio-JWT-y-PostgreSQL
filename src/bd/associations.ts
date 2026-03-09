// associations.ts
import { User } from './user'; // ajustá la ruta
import { Auth } from './auth'; // ajustá la ruta

 User.hasOne(Auth, { foreignKey: 'userId' });
 Auth.belongsTo(User, { foreignKey: 'userId' });

 export {User,Auth}