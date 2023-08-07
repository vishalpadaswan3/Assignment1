const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize("users", process.env.admin_name, process.env.password, {
  host: "database-5.c4wyxfqovg91.eu-east-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = { sequelize };
