// Define a custom error class that extends the built-in Error class
class ExpressError extends Error {
    // Constructor takes a message and a statusCode as parameters
    constructor(message, statusCode) {
        super(); // Call the parent class's constructor
        this.message = message; // Set the error message
        this.statusCode = statusCode; // Set the HTTP status code
    }
}

// Export the ExpressError class so it can be used in other parts of the application
module.exports = ExpressError;
