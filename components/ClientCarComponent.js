import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const { height, width } = Dimensions.get('window')

//props: serviceName, serviceType, price, date

export default props => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{ width: width - 75, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                        name='md-car'
                        size={30}
                    />
                    <Text style={styles.text}>{props.model}</Text>
                </View>
                <Text style={styles.princeText}>{props.Vplate}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        width: width - 40,
        height: 70,
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#ddd',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },

    informationContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },

    text: {
        marginLeft: 10,
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