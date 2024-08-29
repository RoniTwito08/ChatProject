const express = require('express');
const router = express.Router();
const Post = require('../models/postdb');
const { chatHistory , newMessage } = require('../controllers/post-controller');


router.post('/newMessage', newMessage);
router.get('/chatHistory',chatHistory);


module.exports = router;