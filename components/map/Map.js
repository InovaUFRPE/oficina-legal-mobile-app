import React, { Component } from 'react'
import { View, Image } from 'react-native'
import MapView from 'react-native-maps'
import Search from './Search'
import Directions from './Directions'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class Map extends Component {
    state = {
        region: null,
        destination: null
    }
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
                    }
                })
            }, //Sucesso

            () => {console.log('Erro')}, //Erro
            {
                timeout: 2000,
                enableHighAccuracy: false,
                maximumAge: 1000,
            }
        )
    }

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }

    render() {
        const { region, destination } = this.state
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={region}
                    showsUserLocation
                    ref={map => this.mapView = map}
                >
                    {destination && (
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={result => {
                                this.mapView.fitToCoordinates(result.coordinates), {
                                    edgeePadding: {
                                        right: 50,
                                        left: 50,
                                        top: 50,
                                        bottom: 50,
                                    }
                                }
                            }}
                        />
                    )}
                </MapView>

                <Search onLocationSelected={this.handleLocationSelected} />

                <Icon
                    name="bars"
                    size={30}
                    color='#2250d9'
                    style={{ position: 'absolute', padding: 10 }}
                    onPress={() => this.props.navigation.toggleDrawer()}
                />

                <Image
                    source={require('../../images/LogoAzulR.png')}
                    style={{position: 'absolute', width: 50, height: 50, bottom: 1, right: 1, paddingBottom: 20, paddingRight: 20}}
                />

            </View>
        )
    }
}