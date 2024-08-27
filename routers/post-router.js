const express = require('express');
const router = express.Router();
const Post = require('../models/postdb');
const { chatHistory } = require('../controllers/post-controller');


router.get('/post', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
}
);

router.post('/post', async (req, res) => {
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
});
router.get('/chatHistory',chatHistory);


module.exports = router;