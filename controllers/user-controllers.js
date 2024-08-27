const express = require('express');
const router = express.Router();
const User = require('../models/usersdb');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        req.session.user = user._id;
        res.status(200).json({ msg: 'Logged in' , user: user.username});
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

const register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            console.log(existingUserName);
            return res.status(400).json({ msg: 'User already exists' });
        }

        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        const newUser = new User({
            username,
            password: await bcrypt.hash(password, 10),
            email
        });

        await newUser.save();
        res.status(200).json({ msg: 'User created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
const loggedUser = async (req, res) => {
    if(!req.session.user){
        console.log('Failed to logged in');
        return res.status(401).json({msg:'failed'}) ;
    }
    try {
        const user = await User.findById(req.session.user);
        if(!user){
            console.log('user not find');
            return res.status(404).json({msg:'user not found'});
        }
        res.status(200).json({user:user.username});


        
    }catch(err){
        console.error('server eror');
        res.status(500).json({msg:'server eror'})
    }
}
        

module.exports = { login, register,allUsers,loggedUser};
