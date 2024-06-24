# YelpCamp

YelpCamp is a web application that allows users to browse, create, and review campgrounds. This project is built using Node.js, Express, and MongoDB, with additional front-end support from Bootstrap for styling.

## Features

- User authentication and authorization
- CRUD operations for campgrounds
- Server-side validation using Joi
- Client-side validation using Bootstrap
- Error handling with custom error classes

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

## License

This project is licensed under the MIT License.
