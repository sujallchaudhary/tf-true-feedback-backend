const express = require('express');
const { createMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const jwt = require('../middlewares/jwt');

const router = express.Router();

router.post('/',createMessage);
router.get('/',jwt,getMessages);
router.delete('/:id',jwt,deleteMessage)

module.exports = router;