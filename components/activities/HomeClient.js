import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Alert, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackButton from '../../busnisses/BackButton'
import Map from '../map/Map'

export default class HomeClient extends Component {

    onBack = () => {
        Alert.alert(
            'Mensagem',
            'Voce deseja deslogar?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => this.props.navigation.navigate('Login') },
            ],
            { cancelable: false },
        );
    }

    render() {

        return (

            <View style={styles.container}>
                <Map>
                </Map>
            </View>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: 'white'
    },

    menuIcon: {
        position: 'absolute',
        paddingLeft: 20
    },

    buttonWorkshop: {
        width: 300,
        height: 380,
        top: 40,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },

    workshop: {
        color: 'black',
        top: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop2: {
        color: 'black',
        top: 150,
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop3: {
        color: 'black',
        top: 155,
        fontSize: 20,
        fontWeight: 'bold'
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 5
    }

})