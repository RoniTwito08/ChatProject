const Post = require('../models/postdb');
const express = require('express');
const router = express.Router();   


const chatHistory =  async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
}
const newMessage = async (req, res) => {
    const { title, content, fromUser, ToUser } = req.body;
    try {
        const newPost = new Post({
            title,
            content,
            fromUser,
            ToUser
        });
        await newPost.save();
        res.status(200).json({ msg: 'Post created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { chatHistory , newMessage };
