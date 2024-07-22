const express = require('express'); // Import Express
const router = express.Router(); // Create a new router object
const campgrounds = require('../controllers/campgrounds'); // Import the campgrounds controller
const catchAsync = require('../utils/catchAsync'); // Import the catchAsync utility for error handling
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware'); // Import middleware functions

// Route for displaying all campgrounds and creating a new campground
router.route('/')
    .get(catchAsync(campgrounds.index)) // GET request to display all campgrounds
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground)) // POST request to create a new campground

// Route for rendering the form to create a new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm); // GET request to display the new campground form

// Route for displaying, updating, and deleting a specific campground by ID
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) // GET request to display a specific campground
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground)) // PUT request to update a specific campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); // DELETE request to delete a specific campground

// Route for rendering the form to edit a specific campground by ID
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)); // GET request to display the edit campground form

module.exports = router; // Export the router object
