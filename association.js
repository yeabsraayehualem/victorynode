const User = require("./models/account/accountModel")
const School = require("./models/school/schoolModel")

User.belongsTo(School, { foreignKey: 'school' });
School.hasMany(User, { foreignKey: 'school' });

console.log("** association completed **")