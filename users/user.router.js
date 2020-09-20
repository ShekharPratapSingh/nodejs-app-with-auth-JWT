
const { createUser,getUsersById,getUsers,updateUser,deleteuser,login } = require('./user.controller');
const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUsersById);
router.patch('/', updateUser);
router.delete('/', deleteuser);
router.post('/login',login)




module.exports = router;