const mongoose = require('mongoose');
const cities = require('./cities'); // Import the cities data
const { places, descriptors } = require('./seedHelpers'); // Destructure and import places and descriptors arrays from seedHelpers.js
const Campground = require('../models/campground'); // Import the Campground model
const images = require('./images'); // Import the array of images
require('dotenv').config(); // Load environment variables from .env file

// Construct the MongoDB Atlas connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri);

const db = mongoose.connection; // Get a reference to the database connection
db.on('error', console.error.bind(console, 'connection error:')); // Handle connection errors
db.once('open', () => {
    console.log('Database connected to MongoDB Atlas');
});

// Function to pick a random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Seed function to delete all campgrounds and add new ones
const seedDB = async () => {
    await Campground.deleteMany({}); // Delete all existing campgrounds
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000); // Pick a random index for cities array
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`, // Set location to a random city and state
            title: `${sample(descriptors)} ${sample(places)}`, // Combine a random descriptor and place to form the title
            image: sample(images), // Select a random image from the images array
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
        });
        await camp.save(); // Save the new campground to the database
    }
};

seedDB().then(() => {
    db.close(); // Close the database connection when done
});
