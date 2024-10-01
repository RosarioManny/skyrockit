const dotenv = require('dotenv'); // allows you to have a dot.env file
dotenv.config();
const express = require('express');
const app = express(); // An instance of the express server
const mongoose = require('mongoose'); // Translates JSON to BSON & vice versa
const methodOverride = require('method-override'); // 
const morgan = require('morgan'); 
const session = require('express-session'); // stores session data

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false })); // How to read an encoded URL
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView); 

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.use('/auth', authController);
app.use(isSignedIn) // This has to be after the auth, because this is the user signing in.
// You can only be signed in if you have already been authorized

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
