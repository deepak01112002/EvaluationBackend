const express = require("express")
const UserModel = require("../models/user.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRoute = express.Router()

UserRoute.post("/register",async(req,res)=>{
  const {name,email,gender,password} = req.body
   try {
     bcrypt.hash(password, 5, async(err, hash)=>{
      if(err){
        res.send({"msg" : err})
      }else{
      let data = new UserModel({name,email,gender,password : hash})
      await data.save()
      res.send({"msg":"User Register"})
      }
     });
     
   } catch (err) {
     res.send({"msg" : err})
   }
})

UserRoute.post ("/login",async(req,res)=>{
  const {email,password} = req.body
  try {
     const data = await UserModel.find({email:email})
     if(data.length>0){ 
       bcrypt.compare(password, data[0].password, (err, result)=> {
        if(result){
         var token = jwt.sign({ authorID : data[0]._id }, 'deepak')
         res.send({"msg" : "Login Successfull", "token" : token})
        }else if (err){
          res.send({"msg" : "err"})
        }
       })
       
     }
   } catch (error) {
     res.send({"msg" : "Something wrong"})
   }
})


module.exports = UserRoute