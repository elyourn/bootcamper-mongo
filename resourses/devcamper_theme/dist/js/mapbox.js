mapboxgl.accessToken = process.env.GEOCODER_ACCESS_TOKEN; // eslint-disable-line

// eslint-disable-next-line
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 7,
    center: [-71.1054, 42.350498],
    // interactive: false
});

map.on('load', () => {
    map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-71.1054, 42.350498],
                        },
                        properties: {
                            title: 'DevWorks',
                            icon: 'college',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-122.414, 37.776],
                        },
                        properties: {
                            title: 'Mapbox SF',
                            icon: 'harbor',
                        },
                    },
                ],
            },
        },
        layout: {
            'icon-image': '{icon}-15',
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
        },
    });
});
