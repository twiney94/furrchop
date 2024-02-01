import { Map as GLMap } from 'react-map-gl';
import { Box } from "@chakra-ui/react";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    return (
        <Box w="100%" h="100%">
            <GLMap
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_GLJS_TOKEN}
                initialViewState={{
                    longitude : -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </Box>
    );
};

export default Map;