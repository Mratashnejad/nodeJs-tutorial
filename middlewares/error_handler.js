const AppError = require('../utilities/app_errors')
const errorHandler =(error,req,res,next)=>{
    console.log(error)

    if(error instanceof AppError){
        return res.status(error.statusCode).send({ errorCode: error.errorCode, message: error.message });
    }else if (error.name === 'ValidationError'){
        return res.status(400).send('validation Failed');
    }else{
        res.status(500).send( "something is failed")
    }    
}

module.exports = errorHandler;