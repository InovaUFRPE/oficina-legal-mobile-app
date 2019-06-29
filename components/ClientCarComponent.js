import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import defaultStyle from './styles/Default'


const { height, width } = Dimensions.get('window')

//props: serviceName, serviceType, price, date

export default props => {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon
                name='md-car'
                size={30}
                color={defaultStyle.primaryColor}

            />
            <Text style={styles.title}>
                {props.modelo.toUpperCase()}
            </Text>

            <Text style={styles.subtitle}>
                {props.placa.toUpperCase()}
            </Text>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: width-50,
        height: 100,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    title: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        letterSpacing: 1.5,
        color: defaultStyle.darkColor
    },
    subtitle: {
        fontFamily: 'Roboto-Light',
        letterSpacing: 2
    }
})