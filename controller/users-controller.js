const UsersModel = require('../models/users-model')
//sudo npm i bcrypt
const bcrypt = require('bcrypt')
//npm i Joi
const Joi = require('joi')
//npm i lodash
const _= require('lodash')


const register = async (req,res,next) =>{
    try{
    const schema = {
        username: Joi.string().min(3).max(50).required().messages({"string.min" : "name charecter is less than 3 " ,"string.max" : "name charecter is higher that 50"}),
        email: Joi.string().email().required(),
        pwd: Joi.string().min(8).max(50).required(),
    }
    const validationResult = Joi.object(schema).validate(req.body)

    if(validationResult.error)
       return res.status(400).send(validationResult.error.details[0].message)

       //hashpassword 
        const hashPassword = await bcrypt.hash(req.body.pwd,10)


      const newUser  = await UsersModel.insertUser(
        req.body.username ,
        req.body.email,
        hashPassword
        )
        //sending selected data with message 
        const responseData = _.pick(newUser , ['id','username','email']);
        const message = 'User registered successfully.' ;
        res.status(201).json({user :responseData , message:message});

    }catch(err){
        if(err.message === 'Username is already taken.'){
            return res.status(409).send('Username is already taken. Please choose a diffrent username.');

        }else{
            console.error('Error registreing user:' , err);
            res.status(500).send('Internal Server Error.');
        }
    }
    //console.log(validateResult)
    // console.log(result)
    // console.log(req.body)
    // res.send('OK')
};

const login =async(req,res,next) =>{
    try{
        const schema = {
            email: Joi.string().email().required(),
            pwd: Joi.string().min(8).max(50).required(),
        }
        const validationResult = Joi.object(schema).validate(req.body)
        if(validationResult.error)
           return res.status(400).send(validationResult.error.details[0].message)

    const user = await UsersModel.getUserByEmail(req.body.email);
    if (!user) return res.status(400).send('email or password is invalid');

    const validPwd = await bcrypt.compare(req.body.pwd , user.pwd);
        if(!validPwd)
            return res.status(400).send('email or password invalid')
        
}catch(err){

}}


module.exports = {register , login}; 