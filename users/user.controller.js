const { create,getUsers,getUsersById,updateUser,deleteuser,getUserByUserEmail } = require('./user.services');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {sign}= require('jsonwebtoken')

module.exports = {
    createUser: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10); // to work this.. install bcrypt.. npm install bcrypt
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: 0,
                    message:'Data base is not connected'
                })
            } else{
                return res.status(200).json({
                    success: 1,
                    data:results
                })
            }
        })
    },
    getUsersById: (req, res) => {
        id = req.params.id;
        getUsersById(id, (err, results) => {
            if (err) {
                console.log(err);

            } if (!results) {
                res.json({
                    success: 0,
                    message:'user not found'
                })
            } else {
                res.json({
                    success: 1,
                    data:results
                })
            }
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: 1,
                    data:results
                })
            }
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password= hashSync(body.password,salt)
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err)
            } if (!results) {
                res.json({
                    success: 0,
                    message:'user not updated'
                })
            } else {
                res.json({
                    success: 1,
                    message:'User updated successfully'
                })
            }
        })
    },
    deleteuser: (req, res) => {
        const data = req.body;
        deleteuser(data, (err, results) => {
            if (err) {
                console.log(err)
            }if (!results) {
                res.json({
                    success: 0,
                    message:'user not deleted'
                })
            } else {
                res.json({
                    success: 1,
                    message:'user deleted successfully'
                })
            }
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
            } if (!results) {
                res.json({
                    success: 0,
                    data:'Invalid email,password'
                })
            }
            const result = compareSync(body.password, results.password)
            if (result) {
                results.password = undefined;
                const jsontoken = sign({result:results},'www123',{expiresIn:'1h'})
                return res.json({
                    success: 1,
                    message: 'Login Successful',
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message:'Login Unsuccessful'
                })
            }
           
        }
        )

    }
}