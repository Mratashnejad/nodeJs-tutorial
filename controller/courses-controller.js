//logig of program
const CoursesModel = require('../models/courses-model')




const courses = [
    {id:1 , name:'html'},
    {id:2 , name:'css'},
    {id:3 , name:'javaScript'},
]

const getCourse = (req,res)=>{

    CoursesModel.getCourses(parseInt(req.params.id)).then((result)=>{
        //const course = courses.find(c => c.id === parseInt(req.params.id))
        if(!result) res.status(404).send('course with given id not found');
        res.send(result);
    });
}

const getCourses = (req , res)=>{
    res.send(['html' , 'css' , 'java'])
}

const postCourses = (req,res)=>{
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
}

const updateCourses = (req, res) =>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("course with given id not found")
    if(!req.body.name || req.body.name.length <3)
        return res.status(400).send("name is required and more than 3 charachter")
    
    course.name = req.body.name
    res.send(course)
}

const deleteCourses = (req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("course with given id not found")
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
}

module.exports={
    getCourse,
    getCourses,
    postCourses,
    updateCourses,
    deleteCourses,
}