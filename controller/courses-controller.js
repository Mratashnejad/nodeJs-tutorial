//logig of program
//const {result} = require('underscore')
//import trycatch handler from utilities
const {tryCatchHandler} = require('../utilities/tryCatch_handler');

//IF USING MYSQL =>
//////////const CoursesModel = require('../models/courses-model')
// if using SQL SERVER =>
const CoursesModelSql = require('../models/courses-model-mssql')

// const tryCatchHandler = (controller)=>{
//     return async (req,res,next)=>{
//         try {
//             await controller(req,res)
//          } catch (error) {
//              next(error)
//          }
//     }
// }

// Get one course by its ID.
const getCourse = tryCatchHandler(async(req,res)=>{
        const result = await CoursesModelSql.getCourse(parseInt(req.params.id))

        //const course = courses.find(c => c.id === parseInt(req.params.id))
        if(!result) res.status(404).send('course with given id not found');
        res.send(result);
        //res.status(400).send('something failed')

})

// Get a list of all courses.
const getCourses = tryCatchHandler(async (req , res)=>{
   
        const result = await CoursesModelSql.getCourses(parseInt(req.params.id))
            if(!result)res.status(404).send('course with given id is not found');
            res.send(result);        
    
    // res.send(['html' , 'css' , 'java'])
})


//insert course
const insertCourse = tryCatchHandler(async (req,res)=>{

        if(!req.body.name || req.body.name.length <3){
            res.status(400).send('name is required');
            return;
        }
    
        const result  = await CoursesModelSql.insertCourse(req.body.name)
            res.send(result)
    })
        

//update course
const updateCourses = tryCatchHandler(async (req, res) =>{
    
        const existingCourse = await CoursesModelSql.getCourse(parseInt(req.params.id))
        if(!existingCourse) return res.status(404).send("Course with the given ID not found");

        if(!req.body.name || req.body.name.length <3)
            return res.status(400).send("Name is required and must be at least 3 characters long");
            const updatedCourse = await CoursesModelSql.updateCourse(parseInt(req.params.id),result.name = req.body.name)
        res.send(updatedCourse)
})


// Delete an existing course.
const deleteCourse = tryCatchHandler(async (req,res )=>{
    CoursesModelSql.getCourse(parseInt(req.params.id)).then((result)=>{
        if(!result) return res.status(404).send("course with given id not found");
    })
    CoursesModelSql.deleteCourse(parseInt(req.para,s.id)).then((result)=>{
        res.send(result)
    })
    // if(!course) return res.status(404).send("course with given id not found")
    // const index = courses.indexOf(course)
    // courses.splice(index,1)
    // res.send(course)
})


const postCourses = tryCatchHandler(async(req,res)=>{
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

// Export all route handlers.
module.exports={
    insertCourse,
    getCourse,
    getCourses,
    postCourses,
    updateCourses,
    deleteCourse,
}





//template courses locally
// const courses = [
//     {id:1 , name:'html'},
//     {id:2 , name:'css'},
//     {id:3 , name:'javaScript'},
// ]