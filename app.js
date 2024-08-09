if (process.env.NODE_ENV !== "production") {
    require('dotenv').config(); // Load environment variables from .env file if not in production
}

const express = require('express'); // Import Express for building web applications
const path = require('path'); // Import Path for working with file and directory paths
const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const ejsMate = require('ejs-mate'); // Import ejs-mate for layout support in EJS
const session = require('express-session'); // Import express-session for session management
const flash = require('connect-flash'); // Import connect-flash for flash messages
const ExpressError = require('./utils/ExpressError'); // Import custom ExpressError for error handling
const methodOverride = require('method-override'); // Import method-override for supporting PUT and DELETE methods
const passport = require('passport'); // Import Passport for authentication
const LocalStrategy = require('passport-local'); // Import Passport-Local for local authentication strategy
const User = require('./models/user'); // Import User model
const helmet = require('helmet'); // Import Helmet for security headers
const mongoSanitize = require('express-mongo-sanitize'); // Import express-mongo-sanitize to prevent NoSQL injection attacks

const userRoutes = require('./routes/users'); // Import user routes
const campgroundRoutes = require('./routes/campgrounds'); // Import campground routes
const reviewRoutes = require('./routes/reviews'); // Import review routes
const MongoStore = require('connect-mongo'); // Import connect-mongo to store session data in MongoDB

const dbUrl = process.env.DB_URL; // Database URL from environment variables

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(dbUrl);

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
app.use(mongoSanitize({
    replaceWith: '_' // Replace prohibited characters with '_'
}));

const secret = process.env.SESSION_SECRET; // Secret for session encryption

// Configure MongoDB session store
const store = MongoStore.create({
    mongoUrl: dbUrl, // Database URL
    touchAfter: 24 * 60 * 60, // Only update session every 24 hours
    crypto: {
        secret, // Encrypt the session data
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e); // Log session store errors
});

// Session configuration
const sessionConfig = {
    store, // Use MongoDB session store
    name: 'session', // Session cookie name
    secret, // Secret for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // Ensure cookies are sent only over HTTP(S), not client JavaScript
        // secure: true, // Uncomment for HTTPS
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Set cookie expiration to 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // Maximum age of the cookie in milliseconds (1 week)
    },
};
app.use(session(sessionConfig)); // Use session middleware
app.use(flash()); // Use flash middleware for flash messages
app.use(helmet()); // Use helmet to set various HTTP headers for security

// Define content security policies
const scriptSrcUrls = [
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://unpkg.com/",
    "https://3001.scriptcdn.net/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://unpkg.com/",
    "https://cdn.jsdelivr.net/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls], // Allowed sources for connecting
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls], // Allowed sources for scripts
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls], // Allowed sources for styles
            workerSrc: ["'self'", "blob:"], // Allowed sources for workers
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dfjatsdjg/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/", // Unsplash images
            ],
            fontSrc: ["'self'", ...fontSrcUrls], // Allowed sources for fonts
        },
    })
);

app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session middleware
passport.use(new LocalStrategy(User.authenticate())); // Configure Passport to use local strategy for authentication

passport.serializeUser(User.serializeUser()); // Serialize user into session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

// Middleware to set up local variables for templates
app.use((req, res, next) => {
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

const port = process.env.PORT || 3000; // Set the port from environment or default to 3000

// Start the Express server
app.listen(port, () => {
    console.log(`Serving on port ${port}`); // Log that the server is running
});
