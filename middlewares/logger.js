function Log(req,res,next){
    console.log("logging...")
    next()
}


module.exports = Log