mapboxgl.accessToken = mapToken; // Set the Mapbox access token
const map = new mapboxgl.Map({
    container: 'cluster-map', // ID of the container element for the map
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Mapbox style URL
    center: [-103.5917, 40.6699], // Initial center of the map [longitude, latitude]
    zoom: 3 // Initial zoom level
});

map.addControl(new mapboxgl.NavigationControl()); // Add navigation controls (zoom and rotation) to the map

// Execute the following once the map has loaded
map.on('load', () => {
    // Add a new data source for campgrounds using GeoJSON
    // Enable clustering for the source data
    map.addSource('campgrounds', {
        type: 'geojson', // Type of data source
        data: campgrounds, // GeoJSON data for the campgrounds
        cluster: true, // Enable clustering
        clusterMaxZoom: 14, // Max zoom level to cluster points
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    // Add a layer to display the clusters
    map.addLayer({
        id: 'clusters', // Layer ID
        type: 'circle', // Circle layer
        source: 'campgrounds', // Data source
        filter: ['has', 'point_count'], // Filter to include only clusters
        paint: {
            // Use step expressions to determine circle color based on point count
            // Blue circles for count < 10, Yellow for 10-29, Pink for >= 30
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#00BCD4', // color for < 10 points
                10,
                '#2196F3', // color for 10-29 points
                30,
                '#3F51B5' // color for 30 or more points
            ],
            // Use step expressions to determine circle radius based on point count
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15, // Radius for < 10 points
                10,
                20, // Radius for 10-29 points
                30,
                25 // Radius for 30 or more points
            ]
        }
    });

    // Add a layer to display the cluster count as text
    map.addLayer({
        id: 'cluster-count', // Layer ID
        type: 'symbol', // Symbol layer
        source: 'campgrounds', // Data source
        filter: ['has', 'point_count'], // Filter to include only clusters
        layout: {
            'text-field': ['get', 'point_count_abbreviated'], // Use abbreviated point count as the label
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'], // Font for the label
            'text-size': 12 // Text size
        }
    });

    // Add a layer to display individual, unclustered points
    map.addLayer({
        id: 'unclustered-point', // Layer ID
        type: 'circle', // Circle layer
        source: 'campgrounds', // Data source
        filter: ['!', ['has', 'point_count']], // Filter to exclude clusters
        paint: {
            'circle-color': '#11b4da', // Color for individual points
            'circle-radius': 4, // Radius for individual points
            'circle-stroke-width': 1, // Stroke width for individual points
            'circle-stroke-color': '#fff' // Stroke color for individual points
        }
    });

    // Click event handler for clusters
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id; // Get the cluster ID
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId, // Pass cluster ID to get the expansion zoom
            (err, zoom) => {
                if (err) return; // Handle errors

                map.easeTo({
                    center: features[0].geometry.coordinates, // Center the map on the cluster
                    zoom: zoom // Zoom in on the cluster
                });
            }
        );
    });

    // Click event handler for unclustered points
    map.on('click', 'unclustered-point', (e) => {
        const { popUpMarkup } = e.features[0].properties; // Get the popup markup
        const coordinates = e.features[0].geometry.coordinates.slice(); // Get the coordinates of the point

        // Ensure the popup appears over the correct feature
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Create a new popup and set its content and location
        new mapboxgl.Popup()
            .setLngLat(coordinates) // Set the popup location
            .setHTML(popUpMarkup) // Set the popup HTML content
            .addTo(map); // Add the popup to the map
    });

    // Change the cursor to a pointer when hovering over clusters
    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer'; // Change cursor style
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = ''; // Reset cursor style
    });
});