import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-swipeable'



//props: serviceName, serviceType, price, date

export default props => {
    const leftContent = (
        <View style={styles.exclude}>
            <Icon name="trash" size={20} color="#ffffff" />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )
    
    const rightContent = (
        <TouchableOpacity
            style={[styles.exclude, { justifyContent: 'flex-start', padding: 20}]}
            onPress={() => props.onDelete(props.id)}>
            <Icon name="trash" size={30} color="#ffffff" />
        </TouchableOpacity>
    )
    return (
        <Swipeable
            leftActionActivationDistance={250}
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent}>
            <View style={styles.container}>
                <View style={styles.informationContainer}>
                    <Text style={styles.text}>{props.serviceName}</Text>
                    <Text>{props.serviceType}</Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.princeText}>R$ {props.price}</Text>
                    <Text>{moment(props.date).locale('pt-br').format('DD[/]MM[/]YYYY')}</Text>
                </View>
            </View>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 75,
        borderBottomWidth: 0.5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    informationContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    priceContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: 10
    },

    princeText: {
        fontSize: 20
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