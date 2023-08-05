const UserRoute=require("express").Router();
const url="https://randomuser.me/api/?results=50";
const fetch=require("node-fetch2");
const users = require("../model/user");
UserRoute.get("/",async(req,res)=>{
    try {
        let res1= await fetch(url);
        let data=await res1.json();
        let payload= data.results.map((el)=>{return{"first_name":el.name.first,"last_name":el.name.last,"user_name":el.login.username,"age":el.dob.age,"email":el.email,"phone":el.phone,"picture":el.picture.thumbnail}})
       payload.forEach( async(element) => {
       await users.create(element);
       });  
    res.status(200).send("ok");
    } catch (error) {
        console.log(error)
        res.status(500);
    }
      
})

UserRoute.delete("/",async(req,res)=>{
    try {
        await users.destroy({ where: {} });
        res.send({"msg":"done"})
    } catch (error) {
     res.send({"msg":"error"})  ; 
    }
})
UserRoute.get("/read",async(req,res)=>{
    try {
        let page_size=10;
        let page_num=req.query.page;
        let offset=(page_num-1)*page_size;
        let data=await users.findAll({limit: page_size,
            offset: offset,});
            let count=await users.count();
            res.send({"data":data,"page_num":count/10});
    } catch (error) {
        res.send(error);
    }
})


module.exports={UserRoute}