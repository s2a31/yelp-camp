const mongoose = require('mongoose'); // Import mongoose library
const Review = require('./review'); // Import the Review model
const Schema = mongoose.Schema; // Use the Schema constructor from mongoose

// Define the schema for an image
const ImageSchema = new Schema({
    url: String, // URL of the image
    filename: String // Filename of the image
});

// Virtual property to generate a thumbnail URL
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200'); // Modify the URL to request a 200px wide version of the image
});

// Define the schema for Campground
const CampgroundSchema = new Schema({
    title: String, // Title of the campground
    images: [ImageSchema],
    price: Number, // Price of staying at the campground
    description: String, // Description of the campground
    location: String, // Location of the campground
    author: {
        type: Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // The 'User' model is referenced here
    },
    reviews: [
        {
            type: Schema.Types.ObjectId, // Each review is an ObjectId reference
            ref: 'Review', // The 'Review' model is referenced here
        },
    ],
});

// Middleware to delete associated reviews when a campground is deleted
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) { // If a document was found and deleted
        await Review.deleteMany({
            _id: {
                $in: doc.reviews, // Delete all reviews where the ID is in the deleted campground's reviews array
            },
        });
    }
});

// Export the Campground model based on the CampgroundSchema
module.exports = mongoose.model('Campground', CampgroundSchema);
