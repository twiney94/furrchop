import { Map as GLMap, Marker } from 'react-map-gl';
import { Box } from "@chakra-ui/react";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ results }) => {
    return (
        <Box w="100%" h="100%">
            <GLMap
                id="map"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_GLJS_TOKEN}
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {/* For each result add marker */}
                {results.map((result) => (
                    <Marker
                        key={result.id}
                        longitude={result.location.lng}
                        latitude={result.location.lat}
                        color='red'
                    >
                        <div>Marker</div>
                    </Marker>
                ))}
            </GLMap>
        </Box>
    );
};

export default Map;