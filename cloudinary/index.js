const cloudinary = require('cloudinary').v2; // Import the Cloudinary library
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Import the Cloudinary storage engine for multer

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set the Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Set the Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Set the Cloudinary API secret
});

// Create a new instance of CloudinaryStorage
const storage = new CloudinaryStorage({
    cloudinary, // Pass the configured cloudinary instance
    params: {
        folder: 'YelpCamp', // Set the folder name where images will be stored in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg'] // Allow only specific image formats
    }
});

module.exports = {
    cloudinary, // Export the configured cloudinary instance
    storage // Export the configured storage instance
};
