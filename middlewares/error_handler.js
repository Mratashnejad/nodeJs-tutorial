//npm i winston
const {createLogger , format , transports} = require('winston')
const AppError = require('../utilities/app_errors')

const logger = require('../utilities/winston_logger')

const errorHandler =(error,req,res,next)=>{
    //console.log(error)
    //for typing error in terminal
    //logger.log('info', 'this is message from winston')
    // for loggging error in file
    logger.log('error' ,  'this is message from winston')
    //for loging eeror in api
    //logger.log('warn' ,  'this is message from winston')



    if(error instanceof AppError){
        return res.status(error.statusCode).send({ errorCode: error.errorCode, message: error.message });
    }else if (error.name === 'ValidationError'){
        return res.status(400).send('validation Failed');
    }else{
        res.status(500).send( "something is failed")
    }    
}
module.exports = errorHandler;