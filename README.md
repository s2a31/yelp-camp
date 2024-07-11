# YelpCamp

YelpCamp is a web application where users can create, view, edit, and delete campgrounds. Users can also leave reviews for campgrounds. The project demonstrates various web development concepts using Node.js, Express, MongoDB, and Mongoose.

## Features

- User authentication and authorization
- CRUD operations for campgrounds
- Server-side validation using Joi
- Client-side validation using Bootstrap
- Error handling with custom error classes
- Reviews for campgrounds, including CRUD operations
- Middleware to automatically delete associated reviews when a campground is deleted
- Serving static assets
- Configurable sessions for user authentication and flash messages
- Flash messages for user feedback on actions (e.g., successful campground creation, review deletion)
- Dynamic navigation bar showing login, register, and logout options based on user authentication status
- Protected routes ensuring only authenticated users can create, edit, or delete campgrounds and reviews

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/s2a31/yelpcamp.git
    cd yelpcamp
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your environment variables:
    - Create a `.env` file in the root directory
    - Add the following variables:
        ```
        DB_USER=yourDatabaseUsername
        DB_PASS=yourDatabasePassword
        DB_HOST=yourDatabaseHost
        DB_NAME=yourDatabaseName
        DB_OPTIONS=yourDatabaseOptions
        ```

4. Start the server:
    ```sh
    node app.js
    ```

## Usage

- Visit `http://localhost:3000` to view the application.
- Create an account or log in to add, edit, or delete campgrounds.
- Browse and review existing campgrounds.

## Validation

The application uses Joi for server-side validation and Bootstrap for client-side validation:

- **Server-Side Validation**: Joi schemas ensure that all required fields are present and correctly formatted before processing requests.
- **Client-Side Validation**: Bootstrap validation classes provide immediate feedback to users on form inputs.

## Error Handling

Custom error handling is implemented to provide meaningful error messages and to ensure the application does not crash due to unexpected issues. An `ExpressError` class is used to create consistent error responses, and an error-handling middleware renders error templates for a better user experience.

## Flash Messages

Flash messages are used to provide feedback to the user after certain actions, such as creating or deleting campgrounds and reviews. These messages are displayed using Bootstrap alerts and can be dismissed by the user.

## Static Assets

Static assets (e.g., images, custom style sheets, JavaScript files) are served from the public directory. This allows for the inclusion of custom styles and scripts to enhance the user interface and experience.

## Session Configuration

Sessions are configured using `express-session` to manage user authentication and flash messages. Sessions include a secret and have an expiration date set for security purposes.

## User Authentication

User authentication is implemented using Passport.js, which simplifies the process of handling authentication. The following features are included:
- Registration of new users with unique usernames and emails
- User login with session management
- User logout
- Dynamic display of navigation options based on authentication status
- Middleware to protect routes and ensure only authenticated users can access certain features
- Automatic redirection of users back to their intended page after login

## License

This project is licensed under the MIT License.
