const UsersModel = require('../models/users-model')
//sudo npm i bcrypt
const bcrypt = require('bcrypt')
//npm i Joi
const Joi = require('joi')
//npm i lodash
const _= require('lodash')
//npm i jsonwebtoken
const jwt = require('jsonwebtoken')
//importing envfiles
require('dotenv').config()
//trycatch controller
const { tryCatchHandler } = require('../utilities/tryCatch_handler')

//import class appError for Handeling error
const AppError = require('../utilities/app_errors')

const register = tryCatchHandler(
    async (req,res,next) =>{
        const schema = {
            username: Joi.string().min(3).max(50).required().messages({"string.min" : "name charecter is less than 3 " ,"string.max" : "name charecter is higher that 50"}),
            email: Joi.string().email().required(),
            pwd: Joi.string().min(8).max(50).required(),
        }
        const validationResult = Joi.object(schema).validate(req.body)

        if(validationResult.error)
        throw new AppError(400).send(validationResult.error.details[0].message)
            
        const user = await UsersModel.getUserByEmail(req.body.email);   
        if(user)
                throw new AppError(409, 'User already registered', 409)

        // send the errors to trycatch handler
        // throw validationResult.error

        //hash the password
        const hashPassword = await bcrypt.hash(req.body.pwd,10)
        // insert new user
        const newUser  = await UsersModel.insertUser(
            req.body.username ,
            req.body.email,
            hashPassword
            )
            //Generate token
        const token = jwt.sign({id:newUser.id},process.env.SECRET_KEY)
        // Set the Authorization header with the token value
        res.header('Authorization', `Bearer ${token}`);


        //sending selected data with message 
        const responseData = _.pick(newUser , ['id','username','email']);
        const message = 'User registered successfully.' ;

            // Respond with user data message
        res.status(201).json({user :responseData , message:message});

        //     if(err.message === 'Username is already taken.'){
        //         return res.status(409).send('Username is already taken. Please choose a diffrent username.');

        //     }else{
        //         console.error('Error registreing user:' , err);
        //         res.status(500).send('Internal Server Error.');
        //     }
        // }
        //console.log(validateResult)
        // console.log(result)
        // console.log(req.body)
        // res.send('OK')
    }
);

const login =  tryCatchHandler (async(req,res,next) =>{
        const schema = {
            email: Joi.string().email().required(),
            pwd: Joi.string().min(8).max(50).required(),
        }
        const validationResult = Joi.object(schema).validate(req.body)
        if(validationResult.error)
           throw new AppError(100).send(validationResult.error.details[0].message)

    const user = await UsersModel.getUserByEmail(req.body.email);
    
    // for test passwords
    // console.log("user :" ,user)
    //console.log("Plaintext password:", req.body.pwd);
    //console.log("Hashed password from database:", user.pwd);


    if (!user) 
        throw new AppError (101, 'Email or password is invalid',400)
    const validPwd = await bcrypt.compare(req.body.pwd , user.pwd);
    
    if(!validPwd)
        throw new AppError (102 , 'Email or password is invalid' ,400)
    const token = jwt.sign({id:user.id},process.env.SECRET_KEY)
    res.send(token);
    }
)

module.exports = {register , login}; 