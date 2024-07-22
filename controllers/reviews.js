const Campground = require('../models/campground'); // Import the Campground model
const Review = require('../models/review'); // Import the Review model

// Controller function to create a new review
module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id); // Find the campground by ID from the request parameters
    const review = new Review(req.body.review); // Create a new review instance with data from the request body
    review.author = req.user._id; // Set the author of the review to the logged-in user
    campground.reviews.push(review); // Add the review to the campground's reviews array
    await review.save(); // Save the new review to the database
    await campground.save(); // Save the updated campground to the database
    req.flash('success', 'Created new review!'); // Flash a success message
    res.redirect(`/campgrounds/${campground._id}`); // Redirect to the campground's show page
};

// Controller function to delete a review
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params; // Extract the campground ID and review ID from the request parameters
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Find the campground by ID and remove the review from its reviews array
    await Review.findByIdAndDelete(reviewId); // Find and delete the review by ID
    req.flash('success', 'Successfully deleted review'); // Flash a success message
    res.redirect(`/campgrounds/${id}`); // Redirect to the campground's show page
};
