const express = require("express")
const Connection = require("./db")
const cors = require("cors")
const UserRoute = require("./routes/user.route")
const PostRoute = require("./routes/post.route")


const app = express()
app.use(express.json())
app.use(cors())



app.use("/user",UserRoute)
app.use("/post",PostRoute)

app.listen(8080,async()=>{
    try {
        await Connection
        console.log("Connection done at 8080")
    } catch (error) {
        console.log(error)
    }
    
})