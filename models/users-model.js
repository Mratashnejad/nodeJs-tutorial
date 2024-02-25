const {sql , poolPromise} = require('../utilities/sqlconnection');

class UsersModel{
    static insertUser = async(username,email,pwd) =>{
        try{
        const pool = await poolPromise;
        username = username.trim();
        email= email.trim();
        pwd = pwd.trim();

        const query =`INSERT INTO users
        (id,username,email,pwd) 
        VALUES (NEWID(),@username,@email,@pwd)`;

        const queryResult = await pool
        .request()
        .input('username',sql.NVarChar,username)
        .input('email',sql.NVarChar,email)
        .input('pwd',sql.NVarChar,pwd)
        .query(query)

        return queryResult.recordset;

        
        } catch(err){
            if (err.number === 2627 || err.number === 2601){
                throw new Error('Username is already taken.');

            }else{
                console.error('error inserting user' , err);
                throw err;
            }
           

        }
    }
}
module.exports = UsersModel;