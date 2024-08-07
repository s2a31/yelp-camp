const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

// Define a validation schema for campgrounds
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(), // Campground title must be a string and is required
        price: Joi.number().required().min(0), // Campground price must be a number, required, and at least 0
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(), // The campground object itself is required
    deleteImages: Joi.array() // Array of images to be deleted
});

// Define a validation schema for reviews
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5), // Review rating must be a number, required, and between 1 and 5
        body: Joi.string().required().escapeHTML() // Review body must be a string and is required
    }).required() // The review object itself is required
});
