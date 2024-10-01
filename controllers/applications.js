const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here

router.get('/', (req, res) => {
    try {
        res.render('applications/index.ejs');
      } catch (error) {
        console.error(error)
        res.redirect('/')
      }
});

module.exports = router;
