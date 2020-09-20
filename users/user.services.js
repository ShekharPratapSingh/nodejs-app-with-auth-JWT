const pool = require('../config/database');

module.exports = {
    create: function (body, callback) {
        pool.query(`INSERT INTO registration(firstname,lastname,gender,email,password,number) VALUES(?,?,?,?,?,?)`, [
            body.firstname,
            body.lastname,
            body.gender,
            body.email,
            body.password,
            body.number
        ], (err, results)=>{
                if (err) {
                    return callback(err)
                } else {
                    return callback(null,results)
                }
        })
    }}