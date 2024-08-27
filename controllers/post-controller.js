const Post = require('../models/postdb');
const User = require('../models/usersdb');


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


module.exports = { chatHistory };
