import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import Especialitys from '../TasksOnHome'
import defaultStyle from '../styles/Default'

// onPress={() => this.props.navigation.navigate('Agendamento')}

const { width, height } = Dimensions.get("window")


export default class WorkShopLayout extends Component {
    state = {
        workShopname: '',
        distance: '',
        Especialitys: []
    }


    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'oficina_name');
        const distance = navigation.getParam('distance', 'distance');
        const address = navigation.getParam('address', 'endereço')
        const idWorkshop = navigation.getParam('id', 0)

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
                        <Text style={styles.workShopName}>Oficina {name}</Text>
                        <View style={styles.workShopInformation}>
                            <Icon name="md-locate" size={20} color={defaultStyle.colors.primaryColor} />
                            <Text style={{ fontSize: 16, marginLeft: 5, paddingRight: 10 }}>{distance} Km</Text>
                        </View>
                        <View style={styles.workShopInformation}>
                            <Icon name="md-home" size={20} color={defaultStyle.colors.primaryColor} />
                            <Text style={{ fontSize: 16, marginLeft: 5, paddingRight: 10 }} >{address}</Text>
                        </View>
                        
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.buttonAgendamento}
                                onPress={() => this.props.navigation.navigate('Agendamento', {
                                    name: name,
                                    endereco: address,
                                    id: idWorkshop
                                })}>
                                <Text style={styles.buttonText}>Fazer Agendamento</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.EspecialitysContainer}>
                        <Text style={{ paddingHorizontal: 20, marginBottom: 20, fontSize: 24, }}>Essas são nossas especialidades</Text>
                        <ScrollView style={{ backgroundColor: "#F5F5F5" }} horizontal showsHorizontalScrollIndicator={false}>
                            <Especialitys imageUri={require('../../images/Services/Funilaria.jpg')} name='Funilaria' />
                            <Especialitys imageUri={require('../../images/Services/Eletrica.jpg')} name='Elétrica' />
                            <Especialitys imageUri={require('../../images/Services/Mecanica.jpg')} name='Mecânica' />
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
        fontSize: 30,
        fontFamily: 'bebas',
        color: 'black',
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