//logig of program



//IF USING MYSQL =>
//const CoursesModel = require('../models/courses-model')
// if using SQL SERVER =>
const CoursesModelSql = require('../models/courses-model-mssql')

//get one course
const getCourse = (req,res)=>{
    CoursesModelSql.getCourse(parseInt(req.params.id)).then((result)=>{
        //const course = courses.find(c => c.id === parseInt(req.params.id))
        if(!result) res.status(404).send('course with given id not found');
        res.send(result);
    });
}
//get list of all coureses
const getCourses = (req , res)=>{
    CoursesModelSql.getCourses(parseInt(req.params.id)).then((result)=>{
        if(!result)res.status(404).send('course with given id is not found');
        res.send(result);
    })
    // res.send(['html' , 'css' , 'java'])
}

//insert course
const insertCourse = (req,res)=>{
    if(!req.body.name || req.body.name.length <3){
        res.status(400).send('name is required');
        return;
    }
    CoursesModelSql.insertCourse(req.body.name).then((result)=>{
        res.send(result)
    })
}

//update course
const updateCourses = (req, res) =>{
    CoursesModelSql.getCourse(parseInt(req.params.id)).then((result)=>{
        if(!result) return res.status(404).send("course with given id not found");
    })
        if(!req.body.name || req.body.name.length <3)
            return res.status(400).send("name is required and more than 3 charachter");
            CoursesModelSql.updateCourse(parseInt(req.params.id),result.name = req.body.name).then((result)=>{
        res.send(result)
    }) 
}

const deleteCourse = (req,res)=>{
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