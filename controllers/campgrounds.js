const Campground = require('../models/campground'); // Import the Campground model

// Controller function to display all campgrounds
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}); // Fetch all campgrounds from the database
    res.render('campgrounds/index', { campgrounds }); // Render the index template with the campgrounds data
};

// Controller function to create a new campground
module.exports.createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground); // Create a new campground instance with data from the request body
    campground.author = req.user._id; // Set the author of the campground to the logged-in user
    await campground.save(); // Save the new campground to the database
    req.flash('success', 'Successfully made a new campground!'); // Flash a success message
    res.redirect(`/campgrounds/${campground._id}`); // Redirect to the newly created campground's show page
};

// Controller function to render the form for creating a new campground
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new'); // Render the new campground form
};

// Controller function to show details of a specific campground
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
            },
        })
        .populate('author'); // Find the campground by ID and populate the reviews and author fields
    if (!campground) { // Check if the campground exists
        req.flash('error', 'Cannot find that campground!'); // Flash an error message if not found
        return res.redirect('/campgrounds'); // Redirect to the campgrounds index page
    }
    res.render('campgrounds/show', { campground }); // Render the show template with the campground data
};

// Controller function to update an existing campground
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params; // Extract the campground ID from the request parameters
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }); // Find and update the campground with new data
    req.flash('success', 'Successfully updated campground!'); // Flash a success message
    res.redirect(`/campgrounds/${campground._id}`); // Redirect to the updated campground's show page
};

// Controller function to delete a campground
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params; // Extract the campground ID from the request parameters
    await Campground.findByIdAndDelete(id); // Find and delete the campground by ID
    req.flash('success', 'Successfully deleted campground'); // Flash a success message
    res.redirect('/campgrounds'); // Redirect to the campgrounds index page
};

// Controller function to render the edit form for a campground
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params; // Extract the campground ID from the request parameters
    const campground = await Campground.findById(id); // Find the campground by ID
    if (!campground) { // Check if the campground exists
        req.flash('error', 'Cannot find that campground!'); // Flash an error message if not found
        return res.redirect('/campgrounds'); // Redirect to the campgrounds index page
    }
    res.render('campgrounds/edit', { campground }); // Render the edit form with the campground data
};