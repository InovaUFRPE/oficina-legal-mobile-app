import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome5'


//done - description - estimateAt

export default props => {
    let check = null
    if (props.done !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={'white'} />
            </View>
        )
    } else {
        check = <View style={styles.pending} />
    }

    const deskStyle = props.done !== null
        ? { textDecorationLine: 'line-through' }
        : {}


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>{check}</View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.description, deskStyle]}>
                    {props.description}
                </Text>
                <Text style={styles.date}>Previsão: {moment(props.estimateAt).locale('pt-br').format('DD [/] MM [/] YYYY')}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#AAA'
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    pending: {
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 15,
        borderColor: '#555'
    },

    done: {
        height: 40,
        width: 40,
        borderRadius: 15,
        backgroundColor: '#2250d9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontSize: 15
    },
    date: {
        fontSize: 12
    }


})