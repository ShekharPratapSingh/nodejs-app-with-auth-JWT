const { create } = require('./user.services');
const { genSaltSync, hashSync } = require('bcrypt');

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
    }
}