import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import Especialitys from '../TasksOnHome'

// onPress={() => this.props.navigation.navigate('Agendamento')}

const { width, height } = Dimensions.get("window")

export default class WorkShopLayout extends Component {
    state={
        workShopname: '',
        distance: '',
        Especialitys: []
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Icon
                        name="md-arrow-back"
                        size={30}
                        style={{ padding: 16, color: '#fff' }}
                        onPress={() => this.props.navigation.goBack()} />
                    <Icon
                        name="md-heart"
                        size={30}
                        style={{ padding: 16, color: '#fff' }} />
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.workShopContainer}>
                        <Text style={styles.workShopName}>Oficina do Manoel - Ipsep</Text>
                        <View style={styles.workShopInformation}>
                            <Icon name="md-navigate" size={20} />
                            <Text style={{ fontSize: 16, marginLeft: 5 }}>1.8 KM</Text>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 16 }}>
                            <TouchableOpacity
                                style={styles.buttonAgendamento}
                                onPress={() => this.props.navigation.navigate('Agendamento')}>
                                <Text style={styles.buttonText}>Fazer Agendamento</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.EspecialitysContainer}>
                        <Text style={{ paddingHorizontal: 20, marginBottom: 20, fontSize: 24, }}>Essas são nossas especialidades</Text>
                        <ScrollView style={{backgroundColor: "#F5F5F5"}} horizontal showsHorizontalScrollIndicator={false}>
                            <Especialitys imageUri={require('../../images/Services/Funilaria.jpg')} name='Funilaria'/>
                            <Especialitys imageUri={require('../../images/Services/Eletrica.jpg')} name='Elétrica'/>
                            <Especialitys imageUri={require('../../images/Services/Mecanica.jpg')} name='Mecânica'/>
                        </ScrollView>

                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d47a1"
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0d47a1'
    },
    bodyContainer: {
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#F5F5F5"
    },
    workShopContainer: {
        width: width,
        height: height / 4,
    },

    workShopName: {
        marginLeft: 20,
        marginTop: 30,
        fontSize: 23,
        fontWeight: 'bold'

    },

    workShopInformation: {
        flexDirection: 'row',
        marginLeft: 20,
    },

    buttonAgendamento: {
        alignItems: 'center',
        borderRadius: 5,
        width: width - 80,
        padding: 16,
        backgroundColor: '#0d47a1'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },

    EspecialitysContainer: {
        marginTop: 20
    }
})