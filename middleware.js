const { campgroundSchema, reviewSchema } = require('./schemas.js'); // Import validation schemas
const ExpressError = require('./utils/ExpressError'); // Import custom ExpressError
const Campground = require('./models/campground'); // Import Campground model
const Review = require('./models/review'); // Import Review model

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { // Check if the user is not authenticated
        req.session.returnTo = req.originalUrl; // Store the original URL in session to return after login
        req.flash('error', 'You must be signed in first!'); // Flash an error message
        return res.redirect('/login'); // Redirect to the login page
    }
    next(); // Proceed to the next middleware if authenticated
};

// Middleware to store the return URL in response locals
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) { // Check if there is a return URL in session
        res.locals.returnTo = req.session.returnTo; // Store the return URL in response locals
    }
    next(); // Proceed to the next middleware
};

// Middleware to validate campground data
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body); // Validate the request body against campground schema
    if (error) { // If validation fails
        const msg = error.details.map((el) => el.message).join(','); // Create an error message from validation details
        throw new ExpressError(msg, 400); // Throw a new ExpressError with the message and status code 400
    } else {
        next(); // Proceed to the next middleware if validation passes
    }
};

// Middleware to check if the current user is the author of the campground
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params; // Extract campground ID from request parameters
    const campground = await Campground.findById(id); // Find campground by ID
    if (!campground.author.equals(req.user._id)) { // Check if the logged-in user is not the author
        req.flash('error', 'You do not have permission to do that!'); // Flash an error message
        return res.redirect(`/campgrounds/${id}`); // Redirect to the campground page
    }
    next(); // Proceed to the next middleware if the user is the author
};

// Middleware to check if the current user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params; // Extract campground ID and review ID from request parameters
    const review = await Review.findById(reviewId); // Find review by ID
    if (!review.author.equals(req.user._id)) { // Check if the logged-in user is not the author
        req.flash('error', 'You do not have permission to do that!'); // Flash an error message
        return res.redirect(`/campgrounds/${id}`); // Redirect to the campground page
    }
    next(); // Proceed to the next middleware if the user is the author
};

// Middleware to validate review data
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // Validate the request body against review schema
    if (error) { // If validation fails
        const msg = error.details.map((el) => el.message).join(','); // Create an error message from validation details
        throw new ExpressError(msg, 400); // Throw a new ExpressError with the message and status code 400
    } else {
        next(); // Proceed to the next middleware if validation passes
    }
};