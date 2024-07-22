const express = require('express'); // Import Express
const path = require('path'); // Import Path
const mongoose = require('mongoose'); // Import Mongoose
const ejsMate = require('ejs-mate'); // Import ejs-mate for layout support in EJS
const session = require('express-session'); // Import express-session for session management
const flash = require('connect-flash'); // Import connect-flash for flash messages
const ExpressError = require('./utils/ExpressError'); // Import custom ExpressError
const methodOverride = require('method-override'); // Import method-override for supporting PUT and DELETE methods
const passport = require('passport'); // Import Passport for authentication
const LocalStrategy = require('passport-local'); // Import Passport-Local for local authentication strategy
const User = require('./models/user'); // Import User model
require('dotenv').config(); // Load environment variables from .env file

const userRoutes = require('./routes/users'); // Import user routes
const campgroundRoutes = require('./routes/campgrounds'); // Import campground routes
const reviewRoutes = require('./routes/reviews'); // Import review routes

// Construct the MongoDB Atlas connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection; // Get a reference to the database connection
db.on('error', console.error.bind(console, 'connection error:')); // Handle connection errors
db.once('open', () => {
    console.log('Database connected to MongoDB Atlas'); // Log when successfully connected
});

const app = express(); // Create a new Express application

app.engine('ejs', ejsMate); // Set ejs-mate as the rendering engine for EJS templates
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(methodOverride('_method')); // Middleware to support PUT and DELETE methods
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files

// Session configuration
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
};
app.use(session(sessionConfig)); // Use session middleware
app.use(flash()); // Use flash middleware

app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session middleware
passport.use(new LocalStrategy(User.authenticate())); // Configure Passport to use local strategy for authentication

passport.serializeUser(User.serializeUser()); // Serialize user into session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

// Middleware to set up local variables for templates
app.use((req, res, next) => {
    console.log(req.session); // Log the session
    res.locals.currentUser = req.user; // Set the current user
    res.locals.success = req.flash('success'); // Set success flash message
    res.locals.error = req.flash('error'); // Set error flash message
    next(); // Call the next middleware
});

// Use imported routes
app.use('/', userRoutes); // Use user routes
app.use('/campgrounds', campgroundRoutes); // Use campground routes
app.use('/campgrounds/:id/reviews', reviewRoutes); // Use review routes

// Home route
app.get('/', (req, res) => {
    res.render('home'); // Render home template
});

// Catch-all route for handling all other requests
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404)); // Create and pass a new ExpressError to the next middleware
});

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err; // Default status code to 500 if not specified
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'; // Default error message if not specified
    res.status(statusCode).render('error', { err }); // Render the error template with the error object
});

// Start the Express server on port 3000
app.listen(3000, () => {
    console.log('Serving on port 3000'); // Log that the server is running
});
