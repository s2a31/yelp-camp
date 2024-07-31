mapboxgl.accessToken = mapToken; // Set the Mapbox access token

const map = new mapboxgl.Map({
    container: 'map', // ID of the container element for the map
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Mapbox style URL
    center: campground.geometry.coordinates, // Initial map center [longitude, latitude]
    zoom: 10, // Initial map zoom level
});

// Create a new marker at the campground's coordinates
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates) // Set marker position [longitude, latitude]
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Create a new popup with an offset
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>` // Set the HTML content of the popup
            )
    )
    .addTo(map); // Add the marker to the map
