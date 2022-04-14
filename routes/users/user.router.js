const {getUsers, getUserById, createUser, updateUser, deleteUser, getAuthToken} = require("../../controller/users/user.controller");
const router = require("express").Router();
const {authUser} = require("../../middleware/authentication")

router.get('/', authUser, getUsers);
router.get('/:id', authUser, getUserById);
router.post('/', authUser, createUser);
router.put('/', authUser, updateUser);
router.delete('/:id', authUser, deleteUser);

router.post('/auth', getAuthToken);

module.exports = router;
