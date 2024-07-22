const mongoose = require('mongoose'); // Import mongoose library
const Schema = mongoose.Schema; // Use the Schema constructor from mongoose
const passportLocalMongoose = require('passport-local-mongoose'); // Import passport-local-mongoose plugin

// Define the schema for a user
const UserSchema = new Schema({
    email: {
        type: String, // Email field of type String
        required: true, // Email is required
        unique: true, // Email must be unique
    },
});

// Add passport-local-mongoose plugin to the UserSchema
UserSchema.plugin(passportLocalMongoose); // This plugin adds username and password fields to the schema and provides authentication methods

// Export the User model based on the UserSchema
module.exports = mongoose.model('User', UserSchema);
