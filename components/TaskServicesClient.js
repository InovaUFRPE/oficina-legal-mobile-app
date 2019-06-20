import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'



export default props => {

    let check = null

    if (props.isDone !== 'pendente') {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={25} color={'white'} />
            </View>
        )

    } else {
        check = <View style={styles.pending} />
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Text style={styles.serviceName}>{props.serviceName}</Text>
                <Text style={styles.informationText}>Previsão: {props.date}</Text>
            </View>
            <View style={styles.statusContainer}>
                {check}
            </View>
        </TouchableOpacity>
    )
}

const { width, height } = Dimensions.get('window')

const taskHeight = height / 10

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: taskHeight,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#CCC',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

    },

    serviceName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },

    informationText: {
        marginLeft: 20,
        fontSize: 13
    },

    statusContainer: {
        width: '30%',
        height: taskHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },


    done: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#2250d9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    pending: {
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: '#555'
    },
})