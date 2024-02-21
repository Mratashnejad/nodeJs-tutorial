function Auth(req,res,next){
    console.log('authentication...')
    next()
}

module.exports = Auth