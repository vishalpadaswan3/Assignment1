const DataTypes=require("sequelize");
const { sequelize } = require("../config");
const users=sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    age:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    picture:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
        timestamps: false
      }
);

module.exports=users;