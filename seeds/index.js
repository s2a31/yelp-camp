const mongoose = require('mongoose'); // Import mongoose library
const cities = require('./cities'); // Import the cities data
const { places, descriptors } = require('./seedHelpers'); // Destructure and import places and descriptors arrays from seedHelpers.js
const Campground = require('../models/campground'); // Import the Campground model
// const images = require('./images'); // Import the array of images (commented out as it's not used)
require('dotenv').config(); // Load environment variables from .env file

// Construct the MongoDB Atlas connection URI using environment variables
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri);

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
    for (let i = 0; i < 300; i++) {
        // Loop to create 300 new campgrounds
        const random1000 = Math.floor(Math.random() * 1000); // Pick a random index for cities array
        const price = Math.floor(Math.random() * 20) + 10; // Generate a random price between 10 and 30
        const camp = new Campground({
            author: '66975fdf0fa92b6d1882311a', // Set a static author ID for all seeded campgrounds
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
                    filename: 'YelpCamp/qqq8cccx6jfy0bcjva3s', // Filename of the second static image
                },
            ], // Set static images for all seeded campgrounds
        });
        await camp.save(); // Save the new campground to the database
    }
};

seedDB().then(() => {
    db.close(); // Close the database connection when done
});
