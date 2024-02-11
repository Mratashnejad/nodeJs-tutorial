const express = require('express');
require('dotenv').config();
const app = express();

//routing

app.get('/' ,(req , res)=>{
    res.send("hello from alireza")

})

app.get('/api/courses' , (req , res)=>{
    res.send(['html' , 'css' , 'java'])
})


app.get('/api/courses/:courseid/:name?',(req,res)=>{
    res.send([req.params.courseid , req.params.name , req.query.sort])
})

const port = process.env.PORT || 3000
app.listen(port , ()=>{
    console.log(`listening port ${port}`)
})
