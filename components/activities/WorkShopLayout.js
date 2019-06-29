import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Especialitys from '../TasksOnHome'
import defaultStyle from '../styles/Default'
import { createOpenLink } from 'react-native-open-maps';
import axios from 'axios';
import { getApiUrl } from '../../service/api'
import Colors from '../styles/Default'

const baseURL = getApiUrl();

const { width, height } = Dimensions.get("window")


export default class WorkShopLayout extends Component {
    constructor(props) {
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

    componentDidMount() {
        this.getEspeciality()
    }

    getEspeciality = async () => {
        try {
            await axios.get(`${baseURL}/api/especializacaooficina/${idWorkshop}`)
                .then(response => this.setState({ Especialitys: response.data }))
        } catch (err) {
            console.log('Erro na função getEspeciality ./WorkShopLayout ')
        }
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
        console.log(distance)
        console.log(this.state)
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Icon
                        name='ios-settings'
                        size={25}
                        color='#fff'
                    />
                    <Text style={styles.headerTitle}>
                        {name}
                </Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('HomeClient')}
                    style={{ position: 'absolute', left: 0, top: 0, padding: 15 }}>
                    <Icon
                        name='ios-arrow-back'
                        size={25}
                        color='#fff'
                    />
                </TouchableOpacity>
                <View style={styles.componentsContainer}>
                    <View style={styles.storeHoursContainer}>
                        <View style={styles.hourContainer}>
                            <View style={styles.openAndCloseTime}>
                                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Light', color: Colors.darkColor, letterSpacing: 3 }}>ABRE</Text>
                                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Medium', color: Colors.darkColor, letterSpacing: 2 }}>08:00</Text>
                            </View>
                            <Icon
                                name='ios-time'
                                size={30}
                                color={Colors.colors.primaryColor}
                            />
                            <View style={styles.openAndCloseTime}>
                                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Light', color: Colors.darkColor, letterSpacing: 3 }}>FECHA</Text>
                                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Medium', color: Colors.darkColor, letterSpacing: 2 }}>18:00</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.informationContainer}>
                        <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Icon
                                name='md-home'
                                size={30}
                                color={Colors.colors.primaryColor}
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto-Medium', color: Colors.darkColor, textAlign: 'center' }}>{address.endereco}</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', color: Colors.darkColor }}>{address.bairro}</Text>
                                <Text style={{ fontFamily: 'Roboto-Medium', color: Colors.darkColor }}>{address.cidade}</Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Icon
                                name='ios-navigate'
                                size={30}
                                color={Colors.colors.primaryColor}
                            />
                            <Text style={{ fontFamily: 'Roboto-Light', color: Colors.darkColor, fontSize: 45 }}>9.3 KM</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ width: '90%', height: '20%', backgroundColor: '#fff', marginTop: 5, alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 1, }}
                        onPress={createOpenLink({ travelType, end })}
                        title={name}>
                        <Icon
                            name="ios-navigate"
                            size={30}
                            color={Colors.colors.primaryColor}
                        />
                        <Text style={{ fontFamily: 'Roboto-Regular', letterSpacing: 2, fontSize: 20, color: Colors.darkColor }}>
                            VER ROTA ATÉ OFICINA
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Agendamento', {
                            name: name,
                            endereco: address,
                            id: id,
                            idProb: 0,
                            date: '',
                            tempoRealizacao: null,
                            nomeServico: 'SERVIÇOS DA OFICINA'
                        })}
                        style={{ width: '90%', height: '32%', backgroundColor: '#fff', marginTop: 5, alignItems: 'center', justifyContent: 'center', }}>
                        <Icon
                            name="md-calendar"
                            size={40}
                            color={Colors.colors.primaryColor}
                            style={{}}
                        />
                        <Text style={{ fontFamily: 'Roboto-Regular', letterSpacing: 2, fontSize: 25, color: Colors.darkColor }}>
                            AGENDAR VISITA
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.primaryColor,
    },

    headerContainer: {
        width: width,
        height: '20%',
        backgroundColor: Colors.colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerTitle: {
        color: '#fff',
        letterSpacing: 5,
        fontSize: 30,
        fontFamily: 'Roboto-Light',
        textAlign: 'center'
    },

    componentsContainer: {
        alignItems: 'center',
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },

    storeHoursContainer: {
        borderBottomWidth: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    hourContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '90%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    openAndCloseTime: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    informationContainer: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: '90%',
        height: '25%',
        backgroundColor: '#fff',
        marginTop: 5,
    }
})