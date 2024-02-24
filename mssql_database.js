const { config } = require('dotenv')
const sql = require('mssql')

//access to .ENV data
require('dotenv').config()


//connect to SQL SERVER 
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  
  const poolPromise = new sql.ConnectionPool(sqlConfig).connect().then(pool=>{
    console.log('connected to pool')
    return pool
  }).catch(err => 'error :' + err)


  //getlist all courses

  const getCourses = async()=>{
    const pool = await poolPromise
    const request = pool.request()
    const result = await request.query("select * from courses")
    console.log(result)
  }

  //get course
  const getCourse = async(id)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Id",sql.Int,id);
    const result = await request.query("select * from courses where id = @Id")
    console.log(result)
    return result.recordset

  }


  //insert course
   //get course
   const insertCourse = async(course)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Course",sql.VarChar,course);
    const result = await request.query("insert into courses(course) values(@Course)")
    console.log(result)
   // return result.recordset

  }

  getCourses(); //for getting all courses
  getCourse(2); //for geting a course
  insertCourse('ruby');
