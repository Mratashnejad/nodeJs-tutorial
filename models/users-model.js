const { sql, poolPromise } = require('../utilities/sqlconnection');

class UsersModel {
    static insertUser = async (username, email, pwd) => {
        try {
            const pool = await poolPromise;

            username = username.trim();
            email = email.trim();
            pwd = pwd.trim();

            const insertQuery = `
                INSERT INTO users (id, username, email, pwd) 
                VALUES (NEWID(), @username, @email, @pwd);
            `;

            // Execute the INSERT query to add the new user to the database
            await pool.request()
                .input('username', sql.NVarChar, username)
                .input('email', sql.NVarChar, email)
                .input('pwd', sql.NVarChar, pwd)
                .query(insertQuery);

            // Fetch the newly inserted user's data
            const selectNewUserQuery = `
                SELECT * FROM users WHERE username = @username;
            `;

            // Execute the SELECT query to retrieve the newly inserted user
            const { recordset } = await pool.request()
                .input('username', sql.NVarChar, username)
                .query(selectNewUserQuery);

            // Return the first record (newly inserted user) from the result set
            return recordset[0];
        } catch (err) {
            if (err.number === 2627 || err.number === 2601) {
                throw new Error('Username is already taken.');
            } else {
                console.error('Error inserting user:', err);
                throw err;
            }
        }
    }
    static getUserByEmail = async(email)=>{
        const [result] = await pool.query('SELECT * FROM users WHERE email =?', [email])
        return result[0]
    }
}

module.exports = UsersModel;
