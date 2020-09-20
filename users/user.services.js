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
    },
    getUsers: callback => {
        pool.query(`SELECT id,firstname,lastname,gender,email,number FROM registration`, [], (err, results) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null,results)
            }
        });

    },
    getUsersById: (id,callback) => {
        pool.query(`SELECT id,firstname,lastname,gender,email,number FROM registration WHERE id=?`, [id], (err, results) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null,results)
            }
        });

    },

    updateUser: (data, callback) => {
        pool.query(`UPDATE registration SET firstname=?,lastname=?,gender=?,email=?,password=?,number=? WHERE id=?`,
        
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ], (err, results) => {
                if (err) {
                    return callback(err)
                } else {
                    return callback(null,results)
                }
            }
        
        )
    },
    deleteuser: (data, callback) => {
        pool.query(`DELETE FROM registration WHERE id=?`, [data.id], (err, results) => {
            if (err) {
                return callback(err);

            } else {
                return callback(null,results[0])
            }
        })
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(`SELECT * FROM registration WHERE email=? `, [email], (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results[0]);
        })
    }
    

}