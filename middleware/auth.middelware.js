const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
const token = req.headers.authorization.split(" ")[1]
if(token!=undefined){
    try {
       const decoded = jwt.verify(token,"deepak")
       if(decoded){
        req.body.authorID = decoded.authorID
        next()
       }else{
        res.send({"msg" : "Login First"})
       }  
    } catch (error) {
        res.send({"msg" : "Login First"})
    }
}else{
    res.send("Login First")
}
    
}

module.exports = auth