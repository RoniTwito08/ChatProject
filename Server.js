const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://ronitwito08:Rt220995@cluster0.wmaql.mongodb.net/');
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('Connection error', error);
    }
}
connect();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));


const User = require('./routers/user-router');
const Post = require('./routers/post-router');

 app.use('/users', User);
 app.use('/posts', Post);

app.use('/register' , (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'register.html'));
}); 

app.use('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'html', 'post.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
