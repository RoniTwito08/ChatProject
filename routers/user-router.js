const { login, register,allUsers,loggedUser,logoutbutton } = require('../controllers/user-controllers');
const express = require('express');
const User = require('../models/usersdb');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logoutbutton);
router.get('/allUsers',allUsers);
router.get('/user',loggedUser);

module.exports = router;
