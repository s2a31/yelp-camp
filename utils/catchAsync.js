// Export a function that takes another function (func) as an argument
module.exports = (func) => {
    // Return a new function that takes the request (req), response (res), and next middleware (next) as arguments
    return (req, res, next) => {
        // Call the passed function (func) with req, res, and next
        // If the function returns a promise, catch any errors and pass them to the next middleware
        func(req, res, next).catch(next);
    };
};
