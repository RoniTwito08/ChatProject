const Post = require('../models/postdb');
const User = require('../models/usersdb');

const chatHistory = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'User not logged in' });
    }

    const loggedInUserId = req.session.user;
    const { toUser } = req.query;

    try {
        const fromUser = await User.findById(loggedInUserId).select('username');
        if (!fromUser) {
            return res.status(404).json({ msg: 'Logged-in user not found' });
        }

        console.log('Fetching sent messages:', fromUser.username, '->', toUser);
        const sentMessages = await Post.find({ fromUser: fromUser.username, ToUser: toUser });
        console.log('Sent messages:', sentMessages);

        console.log('Fetching received messages:', toUser, '->', fromUser.username);
        const receivedMessages = await Post.find({ fromUser: toUser, ToUser: fromUser.username });
        console.log('Received messages:', receivedMessages);

        const chats = [...sentMessages, ...receivedMessages].sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log('Combined chat history:', chats);

        res.status(200).json(chats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Failed to retrieve chat history' });
    }
};
module.exports = { chatHistory };
