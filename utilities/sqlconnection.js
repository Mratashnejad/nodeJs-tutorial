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

  module.exports = {sql , poolPromise}