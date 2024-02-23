const pool =require('../utilities/dbconnection')

class CoursesModel {
    
// const insertCourses = async(id,course_name,datatime)=>{
//     const [result] = await pool.query('insert into courses (id,course_name,datatime) values(?,?,?)',
//     [id,course_name,datatime])
//     console.log(result.insertId)
//     return result
// }

//insert
static insertCourses = async(course_name)=>{
    const [result] = await pool.query('insert into courses (course_name,datatime) values(?,NOW())',
    [course_name])
    console.log(result.insertId)
    return result
}



// const getCourse = async(id)=>{
//     const [result] = await pool.query(`SELECT * FROM Courses where id=?`,[id])
//     return result
// }

// const allcourse = getCourses().then((result)=>{
//     console.log(result)
// })
// static data = insertCourses('next.js').then((result)=>{
//     console.log(result)
// })

//insert data to database
// const insertData = insertCourses(6,'SAAS','2033-10-10').then((result)=>{
//     console.log(result)
// })


//update
static updateCourse = async(id,course_name)=>{
    const [result] = await pool.query(`update courses set course_name = ? where id = ?`,[course_name,id])
    return getCourses(id)
}
// static CourseUpdate = updateCourse(1,'next.js').then((result)=>{
//     console.log(result)
// })

static getCourses = async(id)=>{
    const [result] = await pool.query('SELECT * FROM Courses where id =?', [id])
    return result
}


//delete 
static deleteData = async(id)=>{
    const result = await pool.query('DELETE from Courses where id =?',[id])
    return id
}
// static delData = deleteData(1).then((result)=>{
//     console.log(result)
// })

// static upData = updateCourse(1).then((result)=>{
//     console.log(result)
// })

//working with store procedure
static callStoredProcedure =async(id)=>{
    const [result] = await pool.query('call sp_select(?)' , [id])
    return result[0]
}
}


module.exports = CoursesModel