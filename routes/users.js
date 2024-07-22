const express = require('express'); // Import Express
const router = express.Router(); // Create a new router object
const passport = require('passport'); // Import Passport for authentication
const catchAsync = require('../utils/catchAsync'); // Import the catchAsync utility for error handling
const User = require('../models/user'); // Import the User model
const { storeReturnTo } = require('../middleware'); // Import middleware to store the return URL
const users = require('../controllers/users'); // Import the users controller

// Route for user registration
router.route('/register')
    .get(users.renderRegister) // GET request to render the registration form
    .post(catchAsync(users.register)); // POST request to handle user registration

// Route for user login
router.route('/login')
    .get(users.renderLogin) // GET request to render the login form
    .post(
        storeReturnTo, // Middleware to store the return URL
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), // Authenticate the user using Passport
        users.login // Handle the login logic
    );

// Route for user logout
router.get('/logout', users.logout); // GET request to handle user logout

module.exports = router; // Export the router object
