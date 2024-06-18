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
        DB_USER=your_db_user
        DB_PASS=your_db_password
        DB_HOST=your_db_host
        DB_NAME=your_db_name
        DB_OPTIONS=your_db_options
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
  - `layouts` - Layout templates
  - `partials` - Partial templates
  - `campgrounds` - Campground templates
- `routes` - Application routes
- `public` - Static files (CSS, JavaScript, images)
- `seeds` - Database seed files

## License

This project is licensed under the MIT License.