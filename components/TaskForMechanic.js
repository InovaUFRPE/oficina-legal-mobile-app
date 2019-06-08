import React from 'react'
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get("window")

/*Props
initalHour
finishHour
serviceName
serviceDescription
carModel
carPlate
finishDate
props.onDelete(props.id)
*/

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <View style={styles.timeContainer}>
                    <Icon name="md-time" color='gray' size={20} />
                    <Text style={{ marginLeft: 10 }}>{props.initialHour} - {props.finishHour}</Text>
                </View>

                <View style={styles.informationContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25}} allowFontScaling={true}>{props.serviceName}</Text>
                    <Text numberOfLines={5}>{props.serviceDescription}</Text>
                </View>

                <View style={{justifyContent: 'flex-start'}}>
                    <Text style={styles.carInformation}>Modelo: {props.carModel}</Text>
                    <Text style={styles.carInformation}>Placa: {props.carPlate}</Text>
                </View>
            </View>

            <View style={[styles.flexContainer, {alignItems: 'flex-end', marginLeft: 0, marginRight: 40}]}>
                <View style={styles.dateContainer}>
                    <Icon name="md-calendar" color='gray' size={20} />
                    <Text style={{ marginLeft: 10 }}>{props.finishDate}</Text>
                </View>

                <TouchableOpacity style={styles.buttonFinish} onPress={() => props.onDelete(props.id)}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Finalizar</Text>
                    <Icon name="md-checkmark" color="#fff" size={25} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#AAA',
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff'
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
    },

    timeContainer: {
        flexDirection: 'row',

    },

    dateContainer: {
        flexDirection: 'row',
    },

    informationContainer: {

        marginVertical: 13
    },


    buttonFinish: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#27ae60',
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
    },

    flexContainer: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginLeft: 40
    },

    carInformation: {
        fontWeight: 'bold'
    }


})