const Joi = require('joi'); // Import Joi for schema validation
const { number } = require('joi'); // Destructure the number validator from Joi

// Define a validation schema for campgrounds
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(), // Campground title must be a string and is required
        price: Joi.number().required().min(0), // Campground price must be a number, required, and at least 0
        image: Joi.string().required(), // Campground image URL must be a string and is required
        location: Joi.string().required(), // Campground location must be a string and is required
        description: Joi.string().required() // Campground description must be a string and is required
    }).required() // The campground object itself is required
});

// Define a validation schema for reviews
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5), // Review rating must be a number, required, and between 1 and 5
        body: Joi.string().required() // Review body must be a string and is required
    }).required() // The review object itself is required
});
