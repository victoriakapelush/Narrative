var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
var indexRouter = require('./routes/index');
var cultureRouter = require('./routes/index');
var techRouter = require('./routes/index');
var peopleRouter = require('./routes/index');
var lifestyleRouter = require('./routes/index');
var postRouter = require('./routes/post');
const port = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require('body-parser');
const User = require('./models/user');
const Post = require('./models/post');
var app = express();

app.use(express.json());
app.use(cors());
app.use('/', indexRouter);
app.use('/culture', cultureRouter);
app.use('/technology', techRouter);
app.use('/people', peopleRouter);
app.use('/lifestyle', lifestyleRouter);
app.use('/post', postRouter);

// setup mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://victoriakapelush:sakuraSun123@cluster0.qpt6ako.mongodb.net/blog?retryWrites=true&w=majority";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

require("dotenv").config({ path: "./config.env" });

// view engine setup
app.use(express.static(path.join(__dirname, '../client/dist')));
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user
    const newUser = new User({ username, password });

    // Save the user to the database
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
