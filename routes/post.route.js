const express = require("express")
const auth = require("../middleware/auth.middelware")
const PostModel = require("../models/post.model")

const PostRoute = express.Router()

PostRoute.post("/add",auth,async(req,res)=>{
    try {
        const data = new PostModel(req.body)
        await data.save()
        res.send("Post is Added")
    } catch (error) {
        res.send({"msg" : error})
    }
})

PostRoute.get("/",auth,async(req,res)=>{
    const {authorID} = req.body
    const {device} = req.query
    const {device1,device2} = req.query
    if(device ){
        try {
            if(authorID){
               const data = await PostModel.find({authorID,device})
               res.send({"msg" : "Data Present", "data" : data})
            }else{
                res.send("Add Data first")
            }
         } catch (error) {
             res.send({"msg" : error})
         }
    }else{
        try {
            if(authorID){
               const data = await PostModel.find({authorID})
               res.send({"msg" : "Data Present", "data" : data})
            }else{
                res.send("Add Data first")
            }
        } catch (error) {
             res.send({"msg" : error})
        }
    }
    
    
})

PostRoute.patch("/update/:id",auth,async(req,res)=>{
    const {authorID} = req.body
   
    const {id} = req.params
    try {
        let data = await PostModel.find({_id : id})
        
        if(data[0].authorID==authorID){
            await PostModel.findByIdAndUpdate({_id : id},req.body)
            res.send("Data is Modidified")
        }else{
            res.send("You are not eligible to do")
        }
        
    } catch (error) {
        res.send({"msg" : error})
    }
})

PostRoute.delete("/delete/:id",auth,async(req,res)=>{
    const {authorID} = req.body
   
    const {id} = req.params
    try {
        let data = await PostModel.find({_id : id})
        
        if(data[0].authorID==authorID){
            await PostModel.findByIdAndDelete({_id : id},req.body)
            res.send("Data is Deleted")
        }else{
            res.send("You are not eligible to do")
        }
        
    } catch (error) {
        res.send({"msg" : error})
    }
})

module.exports = PostRoute


// "title" : "Hello",
//     "body" : "dhgaosdgfjgasofghasofgashof",
//     "Device" : "Laptop"