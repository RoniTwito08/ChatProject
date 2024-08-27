const { login, register,allUsers,loggedUser } = require('../controllers/user-controllers');
const express = require('express');
const User = require('../models/usersdb');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ msg: 'Failed to logout' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ msg: 'Logged out successfully' });
    });
});
router.get('/allUsers',allUsers);
router.get('/user',loggedUser);

module.exports = router;
