const BaseJoi = require('joi'); // Import the Joi library for schema validation
const sanitizeHtml = require('sanitize-html'); // Import sanitize-html to remove HTML tags

// Define an extension to Joi for HTML escaping
const extension = (joi) => ({
    type: 'string', // Define a custom type 'string'
    base: joi.string(), // Base type is string
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!' // Custom error message for HTML content
    },
    rules: {
        escapeHTML: { // Define a rule to escape HTML
            validate(value, helpers) {
                const clean = sanitizeHtml(value, { // Sanitize the value to remove HTML
                    allowedTags: [], // No tags are allowed
                    allowedAttributes: {}, // No attributes are allowed
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value }) // Return error if HTML was found
                return clean; // Return the sanitized value
            }
        }
    }
});

// Extend Joi with the custom HTML escape extension
const Joi = BaseJoi.extend(extension);

// Define a validation schema for campgrounds
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(), // Campground title must be a string, required, and free of HTML
        price: Joi.number().required().min(0), // Campground price must be a number, required, and at least 0
        location: Joi.string().required().escapeHTML(), // Campground location must be a string, required, and free of HTML
        description: Joi.string().required().escapeHTML() // Campground description must be a string, required, and free of HTML
    }).required(), // The campground object itself is required
    deleteImages: Joi.array() // Array of images to be deleted
});

// Define a validation schema for reviews
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5), // Review rating must be a number, required, and between 1 and 5
        body: Joi.string().required().escapeHTML() // Review body must be a string, required, and free of HTML
    }).required() // The review object itself is required
});
