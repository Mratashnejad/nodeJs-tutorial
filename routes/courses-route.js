const express = require('express');
const router = express.Router();
const coursesController= require('../controller/courses-controller')
const auth = require('../middlewares/auth')

// if we wanna use for all the routes down using 
//router.use(auth)



// if wann use for only one route or specefice route with use it inside the route
//router.get('/' ,auth,coursesController.getCourses);
router.get('/',coursesController.getCourses);
//get
router.get('/:id', coursesController.getCourse);
//post
router.post('/' ,coursesController.postCourses);

//put
router.put("/:id" , coursesController.updateCourses)
//delete
router.delete('/:id' , coursesController.deleteCourse)

module.exports = router


// router.get('/api/courses/:courseid/:name?',(req,res)=>{
//     res.send([req.params.courseid , req.params.name , req.query.sort])
// })
