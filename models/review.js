const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Use the Schema constructor from mongoose

// Define the schema for a review
const reviewSchema = new Schema({
    body: String, // The text content of the review
    rating: Number, // The rating given in the review
    author: {
        type: Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // The 'User' model is referenced here
    },
});

// Export the Review model based on the reviewSchema
module.exports = mongoose.model('Review', reviewSchema);
