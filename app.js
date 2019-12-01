const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const authRouter = require('./routes/auth');
const friendRouter = require('./routes/friend');
const messageRouter = require('./routes/message');
const siteLayoutRouter = require('./routes/siteLayout');

app.use(passport.initialize());
require('./middleware/passport')(passport);
const uploadFile = require('./middleware/file');

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(uploadFile.single('file'));
// app.use('/images', express.static('images'));
app.use('/resources',express.static(__dirname + '/images'));

app.use('/api/auth', authRouter);
app.use('/api/friends', friendRouter);
app.use('/api/message', messageRouter);
app.use('/api', siteLayoutRouter);


module.exports = app;


