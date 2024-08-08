const mongoose = require('mongoose'); // Import mongoose library
const cities = require('./cities'); // Import the cities data
const { places, descriptors } = require('./seedHelpers'); // Destructure and import places and descriptors arrays from seedHelpers.js
const Campground = require('../models/campground'); // Import the Campground model
// const images = require('./images'); // Import the array of images (commented out as it's not used)
require('dotenv').config(); // Load environment variables from .env file
const dbUrl = process.env.DB_URL

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(dbUrl);

const db = mongoose.connection; // Get a reference to the database connection
db.on('error', console.error.bind(console, 'connection error:')); // Handle connection errors
db.once('open', () => {
    console.log('Database connected to MongoDB Atlas'); // Log a message when successfully connected
});

// Function to pick a random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Seed function to delete all campgrounds and add new ones
const seedDB = async () => {
    await Campground.deleteMany({}); // Delete all existing campgrounds
    for (let i = 0; i < 5; i++) {
        // Loop to create 300 new campgrounds
        const random1000 = Math.floor(Math.random() * 1000); // Pick a random index for cities array
        const price = Math.floor(Math.random() * 20) + 10; // Generate a random price between 10 and 30
        const camp = new Campground({
            author: '66b4f06b903abdd08ea84153', // Set a static author ID for all seeded campgrounds
            location: `${cities[random1000].city}, ${cities[random1000].state}`, // Set location to a random city and state
            title: `${sample(descriptors)} ${sample(places)}`, // Combine a random descriptor and place to form the title
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!', // Set a static description for all seeded campgrounds
            price, // Set the randomly generated price
            geometry: {
                type: "Point", // Set geometry type to Point
                coordinates: [
                    cities[random1000].longitude, // Longitude of the random city
                    cities[random1000].latitude, // Latitude of the random city
                ] // Set coordinates to the random city's longitude and latitude
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfjatsdjg/image/upload/v1721921217/YelpCamp/xhgv3naoh0gbsgunlsd6.jpg', // URL of the first static image
                    filename: 'YelpCamp/xhgv3naoh0gbsgunlsd6', // Filename of the first static image
                },
                {
                    url: 'https://res.cloudinary.com/dfjatsdjg/image/upload/v1722022384/YelpCamp/snu0uuxjqmsuepl1rekn.jpg', // URL of the second static image
                    filename: 'YelpCamp/snu0uuxjqmsuepl1rekn', // Filename of the second static image
                },
                {
                    url: 'https://res.cloudinary.com/dfjatsdjg/image/upload/v1722256535/YelpCamp/wmmhn8zbucvljzjwgawq.jpg', // URL of the third static image
                    filename: 'YelpCamp/wmmhn8zbucvljzjwgawq', // Filename of the third static image
                },
                {
                    url: 'https://res.cloudinary.com/dfjatsdjg/image/upload/v1723132786/YelpCamp/rifpu6s1w10rrn9xdbto.jpg', // URL of the forth static image
                    filename: 'YelpCamp/rifpu6s1w10rrn9xdbto', // Filename of the forth static image
                },
            ], // Set static images for all seeded campgrounds
        });
        await camp.save(); // Save the new campground to the database
    }
};

seedDB().then(() => {
    db.close(); // Close the database connection when done
});
