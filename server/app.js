const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Require passport config (assuming it's in a separate file)
require('./config-passport');

// Import routes
const allRouter = require('./routes/all');
const cultureRouter = require('./routes/culture');
const techRouter = require('./routes/technology');
const peopleRouter = require('./routes/people');
const lifestyleRouter = require('./routes/lifestyle');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// setup mongoose
const store = new MongoDBStore({
  uri: 'mongodb+srv://victoriakapelush:sakuraSun123@cluster0.qpt6ako.mongodb.net/blog?retryWrites=true&w=majority',
  collection: 'sessions'
});
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://victoriakapelush:sakuraSun123@cluster0.qpt6ako.mongodb.net/blog?retryWrites=true&w=majority";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Setup express-session
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Setup connect-flash for flash messages
app.use(flash());

// Other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', loginRouter);
app.use('/all', allRouter);
app.use('/all/:id', allRouter)
app.use('/culture', cultureRouter);
app.use('/culture/:id', cultureRouter);
app.use('/technology', techRouter);
app.use('/technology/:id', techRouter);
app.use('/people', peopleRouter);
app.use('/people/:id', peopleRouter);
app.use('/lifestyle', lifestyleRouter);
app.use('/lifestyle/:id', lifestyleRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);

// 404 error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
