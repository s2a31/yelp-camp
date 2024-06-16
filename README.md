# YelpCamp

YelpCamp is a web application for sharing and reviewing campgrounds. Users can create, view, edit, and delete campgrounds. This project is built using Node.js, Express, MongoDB, and EJS.

## Features

- View a list of all campgrounds
- View details of a specific campground
- Add a new campground
- Edit an existing campground
- Delete a campground

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/s2a31/yelpcamp.git
    cd yelpcamp
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add your MongoDB connection string:
        ```
        DB_URL=mongodb://localhost:27017/yelpcamp
        ```

4. Start the application:
    ```bash
    nodemon app.js
    ```

5. Visit `http://localhost:3000` in your browser.

## Project Structure

- `app.js` - The main application file
- `models` - Mongoose models
- `views` - EJS templates
- `routes` - Application routes
- `public` - Static files (CSS, JavaScript, images)

## License

This project is licensed under the MIT License.
