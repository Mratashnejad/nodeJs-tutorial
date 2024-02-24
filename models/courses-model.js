const pool =require('../utilities/dbconnection')
//MYSQL SETTING
class CoursesModel {

//insert
static insertCourse = async(course_name)=>{
    const [result] = await pool.query('insert into courses (course_name,datatime) values(?,NOW())',
    [course_name])
    console.log(result.insertId)
    return result
}
//all list of courses
static getCourses = async(id)=>{
    const [result] = await pool.query('SELECT * FROM Courses')
    return result
}
//just one courese
static getCourse = async(id)=>{
    const [result] = await pool.query(`SELECT * FROM Courses where id=?`,[id])
    return result
}

//update
static updateCourse = async(id,course_name)=>{
    const [result] = await pool.query(`update courses set course_name = ? where id = ?`,[course_name,id])
    return getCourses(id)
}

//delete 
static deleteCourse = async(id)=>{
    const result = await pool.query('DELETE from Courses where id =?',[id])
    return id
}

//working with store procedure
static callStoredProcedure =async(id)=>{
    const [result] = await pool.query('call sp_select(?)' , [id])
    return result[0]
}
}


module.exports = CoursesModel