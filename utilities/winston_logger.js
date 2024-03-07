const { createLogger, format, transports } = require('winston');

const logger = createLogger ({
    format : format.json(),
    transports :[
            //for typing error in terminal
        new transports.Console({level : 'info'}),
            // for loggging error in file\
        new transports.File({filename:'winstonLogger.log' , level:'error'}),
            //for loging eeror in api
        new transports.Http({level : 'warn' , host : 'localhost',port:5500})
    ]
})
module.exports= logger
