const User = require('../models/user'); // Import the User model

// Controller function to render the registration form
module.exports.renderRegister = (req, res) => {
    res.render('users/register'); // Render the register template
};

// Controller function to handle user registration
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body; // Extract email, username, and password from the request body
        const user = new User({ email, username }); // Create a new user instance with the provided email and username
        const registeredUser = await User.register(user, password); // Register the user with the provided password
        req.login(registeredUser, (err) => {
            // Log in the newly registered user
            if (err) return next(err); // Handle login errors
            req.flash('success', 'Welcome to Yelp Camp!'); // Flash a success message
            res.redirect('/campgrounds'); // Redirect to the campgrounds index page
        });
    } catch (e) {
        // Handle registration errors
        req.flash('error', e.message); // Flash an error message
        res.redirect('register'); // Redirect back to the registration form
    }
};

// Controller function to render the login form
module.exports.renderLogin = (req, res) => {
    res.render('users/login'); // Render the login template
};

// Controller function to handle user login
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!'); // Flash a success message
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // Redirect to the originally requested URL or the campgrounds index page
    res.redirect(redirectUrl); // Redirect to the appropriate URL
};

// Controller function to handle user logout
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        // Log out the user
        if (err) {
            // Handle logout errors
            return next(err); // Pass the error to the next middleware
        }
        req.flash('success', 'Goodbye!'); // Flash a success message
        res.redirect('/campgrounds'); // Redirect to the campgrounds index page
    });
};
