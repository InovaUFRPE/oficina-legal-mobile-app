import React from 'react'
import MapViewDirections from 'react-native-maps-directions'


const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections 
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyBt_eiz3DNuvA0nVm1pukOn4N2TEGA7GUs"
        strokeWidth={3}
        strokeColor='#0000FF'
    />
    )

export default Directions