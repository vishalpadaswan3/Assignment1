const express=require("express");
const cors=require("cors");
const { sequelize } = require("./config");
const { UserRoute } = require("./router/user");
const app=express();


app.get("/",(req,res)=>{
    res.send("Hello Vipin!!!");
})
app.use(cors());
app.use(express.json());
app.use("/user",UserRoute);


app.listen(3000,async()=>{
    try {
     await sequelize.sync()
     console.log("connected to DB");
    } catch (error) {
        console.log("error");
    }
    console.log("connected at 3000 port");

})