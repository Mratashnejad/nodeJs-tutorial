const express = require('express');
require('dotenv').config();

//debuging 
const startupdebug = require('debug')('startup')
//import router
const coursesRoute = require('./routes/courses-route')
const homeRoute = require('./routes/home-route')
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(express.json());

const Logger = require('./middlewares/logger');
const Authentication = require('./auth');
///

app.use(helmet());
///
app.use(Logger);
app.use(Authentication);
/// key=value&key2=value2
app.use(express.urlencoded({extended:true}));
///public static files
app.use(express.static('public'))
//third-party-middleware

//router
app.use('/api/courses',coursesRoute)
app.use('/',homeRoute)

//detecting Mode
startupdebug('helloo')
if(app.get('env') === 'development')app.use(morgan('tiny'));



//routing
//moved to the routes folder

const port = process.env.PORT || 3000
app.listen(port,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", port);
    });

//middleware
