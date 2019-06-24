import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Especialitys from '../TasksOnHome'
import defaultStyle from '../styles/Default'
import { createOpenLink } from 'react-native-open-maps';
import axios from 'axios';

// onPress={() => this.props.navigation.navigate('Agendamento')}

const { width, height } = Dimensions.get("window")


export default class WorkShopLayout extends Component {
    constructor(props){
        super(props);
        this.getEspeciality();
    }
    state = {
        workShopname: '',
        distance: '',
        Especialitys: [],
        shopLat: '',
        shopLon: '',
    }

    getEspeciality = async () => {
        try{
            await axios.get(`http://192.168.0.10:4000/api/especializacaooficina/${idWorkshop}`)
                .then(response => this.setState({Especialitys: response.data}))

        }catch(err){

        }
    }

    _goToWorkShop = (shopLat, shopLon) => {
        createOpenLink({ latitude: shopLat, longitude: shopLon })
    }

    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'oficina_name');
        const distance = navigation.getParam('distance', 'distance');
        const address = navigation.getParam('address', 'endereço')
        const id = navigation.getParam('idWorkshop', 0)
        const shopLat = navigation.getParam('shopLat', 'ErroGetLat').toString()
        const shopLon = navigation.getParam('shopLon', 'ErroGetLon').toString()
        const travelType = 'drive'
        const end = shopLat + ',' + shopLon;

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
                            <Text style={styles.information}>{distance} KM</Text>
                        </View>
                        <View style={styles.workShopInformation}>
                            <Icon name="md-home" size={20} color={defaultStyle.colors.primaryColor} />
                            <Text style={styles.information} >{address}</Text>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('Agendamento', {
                                    name: name,
                                    endereco: address,
                                    id: id
                                })}>
                                <Icon
                                    name='md-calendar'
                                    size={30}
                                    color='#fff'
                                />
                                <Text style={styles.buttonText}>AGENDAMENTO</Text>
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

                    <View style={{ width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={createOpenLink({ travelType, end })}
                            title={name}
                            style={styles.button}>
                            <Icon
                                name='ios-navigate'
                                size={30}
                                color='#fff'
                            />
                            <Text style={styles.buttonText}>IR ATÉ OFICINA</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.buttonAgendamento}
                                onPress={() => this.props.navigation.navigate('Agendamento', {
                                    name: name,
                                    endereco: address,
                                    id: id
                                })}>
                                <Text style={styles.buttonText2}>Avalie esta oficina!</Text>
                            </TouchableOpacity>
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
        fontFamily: 'Roboto-Medium',
        letterSpacing: 0.15,
        color: 'black',
    },

    workShopInformation: {
        flexDirection: 'row',
        marginLeft: 20,
    },

    information: {
        fontSize: 16, 
        marginLeft: 5,
        paddingRight: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        letterSpacing: 0.75
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: width - 80,
        backgroundColor: '#0d47a1'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        letterSpacing: 1.25,
        marginLeft: 10,
        padding: 16
    },

    buttonText2: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        letterSpacing: 1.25,
        marginLeft: 10,
        padding: 16
    },

    EspecialitysContainer: {
        marginTop: 20
    }
})