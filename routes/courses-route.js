const express = require('express');
const router = express.Router();
const coursesController= require('../controller/courses-controller')


router.get('/' ,coursesController.getCourses);
//get
router.get('/:id',coursesController.getCourse);
//post
router.post('/' ,coursesController.postCourses);

//put
router.put("/:id" , coursesController.updateCourses)
//delete
router.delete('/:id' , coursesController.deleteCourses)

module.exports = router




// router.get('/api/courses/:courseid/:name?',(req,res)=>{
//     res.send([req.params.courseid , req.params.name , req.query.sort])
// })
