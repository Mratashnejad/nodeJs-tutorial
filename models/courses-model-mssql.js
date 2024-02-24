const {sql , poolPromise} = require('../utilities/sqlconnection');

//SQL SERVER SETTING

class CoursesModelSql {


  //getlist all courses

  static getCourses = async()=>{
    const pool = await poolPromise
    const request = pool.request()
    const result = await request.query("select * from courses")
    console.log(result)
    return result.recordset
  }

  //get course
  static getCourse = async(id)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Id",sql.Int,id);
    const result = await request.query("select * from courses where id = @Id")
    console.log(result)
    return result.recordset

  }
  //insert course
   //get course
   static insertCourse = async(course)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Course",sql.VarChar,course);
    const result = await request.query("insert into Courses(course) values(@Course)")
    console.log(result)
    return result.recordset
  }


  //Update Course
  static updateCourse = async(id,course)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Id",sql.Int,id);
    request.input("Course",sql.VarChar,course);
    const result = await request.query("update Courses set course=@Course where id = @Id")
    console.log(result)
    return result.recordset
  }


  //delete Course
  static deleteCourse = async(id)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Id",sql.Int,id);
    const result = await request.query("delete  from Courses where id = @Id")
    console.log(result)
    return result.recordset
  }


  //storeprocedure
  static callStoredProcedure = async(id)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input ("Id" , sql.Int , id)
    const result = await request.execute("sp_select")
    console.log(result)
    return result.recordset
  }

}

module.exports = CoursesModelSql