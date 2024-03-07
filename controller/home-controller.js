const getHome = (req , res)=>{
    res.send("hello ")
}

const getHomePost = (req , res)=>{
    console.log(req.body)
        res.send("hello  fro get home post")
}
module.exports = {getHome , getHomePost}