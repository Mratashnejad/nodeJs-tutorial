const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());


const courses = [
    {id:1 , name:'html'},
    {id:2 , name:'css'},
    {id:3 , name:'javaScript'},
]

//routing
app.get('/' ,(req , res)=>{
    res.send("hello from alireza")

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
app.put("/api/courses/:id")

const port = process.env.PORT || 3000
app.listen(port,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", port);
    });