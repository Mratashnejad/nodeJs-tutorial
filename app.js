const express = require('express');
require('dotenv').config();

//debuging 
const startupdebug = require('debug')('startup')


const helmet = require('helmet');
const morgan = require('morgan');


const app = express();
app.use(express.json());
const Logger = require('./logger');
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


//detecting Mode
startupdebug('helloo')
if(app.get('env') === 'development')app.use(morgan('tiny'));


const courses = [
    {id:1 , name:'html'},
    {id:2 , name:'css'},
    {id:3 , name:'javaScript'},
]

//routing
app.get('/' ,(req , res)=>{
    res.send("hello ")

})

app.get('/api/courses' , (req , res)=>{
    res.send(['html' , 'css' , 'java'])
})

app.get('/api/courses/:id/',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('course with given id not found')
    res.send(course)
});

//post
app.post('/api/courses' ,(req,res)=>{
    if(!req.body.name || req.body.name.length <3)
    {
        res.status(400).send("name is required")
        return
    }
    const course={
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course)
    res.send(course)
})

// app.get('/api/courses/:courseid/:name?',(req,res)=>{
//     res.send([req.params.courseid , req.params.name , req.query.sort])
// })

//put
app.put("/api/courses/:id" , (req, res) =>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("course with given id not found")
    if(!req.body.name || req.body.name.length <3)
        return res.status(400).send("name is required and more than 3 charachter")
    
    course.name = req.body.name
    res.send(course)
})



const port = process.env.PORT || 3000
app.listen(port,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", port);
    });

app.delete('/api/courses/:id' , (req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("course with given id not found")
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})



//middleware
