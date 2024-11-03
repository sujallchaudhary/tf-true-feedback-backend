const express = require('express');
const jwt = require('../middlewares/jwt');
const fileUpload = require('../middlewares/fileUpload');
const { createUser, getUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/',fileUpload,createUser);
router.get('/:userId',getUser);
router.delete('/',jwt,deleteUser);

module.exports = router;