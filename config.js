const { Sequelize } = require("sequelize");
// const sequelize=new Sequelize("userblogs","admin","shanu123",{
// host:"database-1.c4wyxfqovg91.eu-north-1.rds.amazonaws.com",
//     dialect:"mysql"
// });
require("dotenv").config();
let password=process.env.password;
let admin_name=process.env.admin_name;
const sequelize = new Sequelize("users", admin_name, password, {
  host: "database-2.c4wyxfqovg91.eu-north-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = { sequelize };
