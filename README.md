# YelpCamp

Welcome to YelpCamp! A cutting-edge web platform that allows users to explore, create, review, and manage campgrounds. Built with the modern stack of Node.js, Express, MongoDB, and Mongoose, YelpCamp delivers an intuitive, robust, and secure platform for camping enthusiasts and travelers worldwide.

## Key Features

### Comprehensive User Features
- **Authentication and Authorization**: Secure sign-up and login processes, with role-based permissions ensuring users only access what they need.
- **CRUD Functionality**: Users can create, read, update, and delete campgrounds with ease, providing a dynamic user experience.
- **Advanced Reviews System**: Allows users to leave detailed reviews on campgrounds, fostering a community of engaged users.

### Technical Prowess
- **Server-Side Validation**: Uses Joi to enforce data integrity and prevent erroneous or malicious data entry.
- **Client-Side Validation**: Implemented with Bootstrap to provide real-time feedback to users, enhancing the interactivity of forms.
- **Error Management**: Custom error handling strategies ensure the application is robust against unexpected user inputs and system failures.

### Interactive and Responsive Design
- **Dynamic Navigation**: Responsive navigation elements that adapt based on user authentication status.
- **Protected Routes**: Ensures that sensitive actions and areas are shielded from unauthorized access.
- **Association and Permissions**: Links between campgrounds and their creators are maintained securely, with editing and deletion rights carefully managed.

### Media Management and Mapping
- **Cloudinary for Images**: Seamless integration with Cloudinary to handle image uploads, storage, and display efficiently.
- **Mapbox Integration**: Utilizes Mapbox to provide real-time geocoded maps and location data, enhancing the visual appeal and functionality of campground listings.

### Security First
- **MongoDB Injection Protection**: Protects against NoSQL injection threats, safeguarding database integrity.
- **Content Security Policy (CSP)**: Implemented via Helmet to restrict and manage resource loading, mitigating potential XSS and other attacks.
- **Secure Session Management**: Sessions are fortified with HTTP-only and secure flags to enhance confidentiality and integrity.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/s2a31/yelp-camp.git

# Navigate to the project directory
cd yelpcamp

# Install dependencies
npm install

# Set up your environment variables in a .env file
echo "DB_URL=yourDatabaseUrl" >> .env
echo "CLOUDINARY_CLOUD_NAME=yourCloudinaryCloudName" >> .env
echo "CLOUDINARY_API_KEY=yourCloudinaryApiKey" >> .env
echo "CLOUDINARY_API_SECRET=yourCloudinaryApiSecret" >> .env
echo "MAPBOX_TOKEN=yourMapboxToken" >> .env
echo "SESSION_SECRET=yourSessionSecret" >> .env

# Start the server
node app.js
```

## Usage

After launching the server, visit `http://localhost:3000` to start exploring campgrounds, or log in to personalize your experience and manage your campgrounds.

## Why YelpCamp?

YelpCamp isn't just a project; it's a solution crafted to enhance the camping experience through technology. Whether it's managing campgrounds or sharing experiences through reviews, YelpCamp provides a platform that is:

- **Intuitive**: Easy to use, with a clean, user-friendly interface.
- **Responsive**: Fully responsive design, providing a seamless experience on both desktop and mobile.
- **Secure**: Advanced security measures ensure user data protection and application integrity.

Join the vibrant community of campers and outdoor enthusiasts at YelpCamp today!

## License

This project is made available under the MIT License. For more details, see the LICENSE file.
