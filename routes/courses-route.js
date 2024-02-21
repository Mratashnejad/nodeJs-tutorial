const express = require('express');
const router = express.Router();

const courses = [
    {id:1 , name:'html'},
    {id:2 , name:'css'},
    {id:3 , name:'javaScript'},
]


router.get('/' , (req , res)=>{
    res.send(['html' , 'css' , 'java'])
})

router.get('/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('course with given id not found')
    res.send(course)
});

//post
router.post('/' ,(req,res)=>{
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

// router.get('/api/courses/:courseid/:name?',(req,res)=>{
//     res.send([req.params.courseid , req.params.name , req.query.sort])
// })

//put
router.put("/:id" , (req, res) =>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("course with given id not found")
    if(!req.body.name || req.body.name.length <3)
        return res.status(400).send("name is required and more than 3 charachter")
    
    course.name = req.body.name
    res.send(course)
})

router.delete('/:id' , (req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("course with given id not found")
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})

module.exports = router