import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-swipeable'


const { height, width } = Dimensions.get('window')

//props: serviceName, serviceType, price, date

export default props => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{ width: width / 2 }}>
                <Text style={styles.text}>Jeep Compass</Text>
            </View>
            <View>
                <Text style={styles.princeText}>ABC-2415</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: width - 40,
        height: 120,
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#ddd',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 5,
    },

    informationContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },

    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    priceContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: 10
    },

    princeText: {
        fontSize: 25
    },

    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    excludeText: {
        color: '#ffffff',
        fontSize: 20,
        margin: 10
    }
})