const express = require('express'); // Import Express
const router = express.Router({ mergeParams: true }); // Create a new router object and merge params from parent router
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware'); // Import middleware functions
const Campground = require('../models/campground'); // Import the Campground model
const Review = require('../models/review'); // Import the Review model
const reviews = require('../controllers/reviews'); // Import the reviews controller
const ExpressError = require('../utils/ExpressError'); // Import the ExpressError utility for error handling
const catchAsync = require('../utils/catchAsync'); // Import the catchAsync utility for error handling

// Route for creating a new review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview)); // POST request to create a new review

// Route for deleting a review by ID
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview)); // DELETE request to delete a review

module.exports = router; // Export the router object