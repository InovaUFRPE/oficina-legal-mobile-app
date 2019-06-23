import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { getUsers, contains } from '../SearchConfig'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwersome from 'react-native-vector-icons/FontAwesome'
import Data from '../users'
import _ from 'lodash'
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action"
import Snackbar from 'react-native-snackbar'
import defaultStyles from '../styles/Default'

const { width, height } = Dimensions.get('window')
const actions = [
    {
        text: "Agendamentos",
        icon: require('../../images/calendarIcon.png'),
        name: 'bt_addcar',
        position: 1
    }
]
export default class HomeClient extends Component {

    state = {
        region: null,
        loading: false,
        data: [],
        error: null,
        query: "",
        fullData: [],

        isFilterModalVisible: false,
        agendamentoMarcado: false,
    }

    componentDidMount() {
        this.makeRemoteRequest();
        this.getUserLocation()
        /* Colocar a função de checagem se o usuario tem algum agendamento marcado

            isAgendamentoMarcado retornar True
            ? this.setState({agendamentoMarcado: true})
            : null
        
        */
    }

    makeRemoteRequest = async () => {
        this.setState({ loading: true });
        console.log('Loading: ', this.state.loading)

        await axios.get("http://192.168.25.184:4000/api/oficina/findAll")
            .then(users => {
                this.setState({
                    loading: false,
                    data: users.data,
                    fullData: users
                });
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
                    }
                })
            }, //Sucesso

            () => { console.log('Erro') }, //Erro
            {
                timeout: 2000,
                enableHighAccuracy: false,
                maximumAge: 1000,
            }
        )
    }

    CalcRadiusDistance(lat2, lon2) {
        var RADIUSMILES = 3961,
            RADIUSKILOMETERS = 6373,
            latR1 = this.deg2rad(lat1),
            lonR1 = this.deg2rad(lon1),
            latR2 = this.deg2rad(lat2),
            lonR2 = this.deg2rad(lon2),
            latDifference = latR2 - this.state.region.latitude,
            lonDifference = lonR2 - this.state.region.longitude,
            a = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
            dm = c * RADIUSMILES,
            dk = c * RADIUSKILOMETERS;
        let mi = this.round(dm);
        let km = this.round(dk);
        return km;
    }
    CalcRadiusDistance = (deg) => {
        var rad = deg * Math.PI / 180;
        return rad;
    };
    CalcRadiusDistance = (x) => {
        return Math.round(x * 10) / 10;
    };

    removeAcento = () => {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        return text;
    }

    handlerSearch = (text) => {
        const formatQuery = text
        console.log(text)
        const data = _.filter(this.state.fullData, user => {
            return contains(user, formatQuery)
        })
        this.setState({ query: formatQuery, data }, () => this.makeRemoteRequest())
    }

    toggleModal = () => {
        this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })
    }
    floatingButtonPress = () => {
        if (this.state.agendamentoMarcado) {
            Alert.alert(
                'Oficina Do Manoel',
                'Endereço: Rua da Aurora \nData: 05/02/20\nHora: 14:00',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else {
            Snackbar.show({
                title: 'Você ainda não tem nenhum agendamento marcado.',
                duration: Snackbar.LENGTH_LONG,
            });
        }
    }
    RenderItem = (obj) => {
        const object = obj.item
        const name = object.razaoSocial
        const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
        const endereco = object.endereco.toUpperCase()
        const cidade = object.cidade.toUpperCase()
        const bairro = object.bairro.toUpperCase()
        const id = object.id
        const shopLat = object.latitude
        const shopLon = object.longitude

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('WorkShopLayout', {
                        name: formatedName,
                        shopLat: shopLat,
                        shopLon: shopLon,
                        distance: (this.CalcRadiusDistance(shopLat, shopLon) * -1),
                        address: endereco + ", " + bairro + ", " + cidade,
                        idWorkshop: id
                        /* distance: distance, */
                    })
                }}
                style={styles.workShopComponent}>
                <View style={{ width: '30%', height: 100, borderWidth: 0.2, borderRadius: 5,  marginLeft: 20 }}>

                    <Image source={{ uri: 'https://i.pinimg.com/originals/54/27/90/542790397e99c703291753baa0700d57.jpg' }}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                </View>
                <View style={{ width: '70%', height: 100 }}>
                    <View style={{ marginTop: 10, marginLeft: 20 }}>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20, color: 'black', letterSpacing: 0.15 }}>{formatedName}</Text>
                        
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name="md-home"
                                size={13}
                                style={{ marginTop: 3 }}
                                color={defaultStyles.colors.primaryColor}
                            />
                            <Text style={{ marginLeft: 4, textAlign: 'justify', paddingRight: 5, fontFamily: 'Roboto-Regular', fontSize: 14}}>{endereco}, {bairro}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name="md-locate"
                                size={13}
                                style={{ marginTop: 3 }}
                                color={defaultStyles.colors.primaryColor}
                            />
                            <Text style={{ marginLeft: 3, fontFamily: 'Roboto-Regular', fontSize: 14, letterSpacing: 0.75 }}>{this.CalcRadiusDistance(shopLat, shopLon) * -1} KM</Text>
                        </View>
                    </View>

                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name="md-star"
                            size={16}
                            color='#0d47a1'
                        />
                        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>Especialidade</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (

            <View
                style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: width, backgroundColor: defaultStyles.colors.primaryColor, justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <FontAwersome
                            name="bars"
                            size={30}
                            style={{ padding: 15, color: '#fff' }}
                            onPress={() => this.props.navigation.toggleDrawer()}
                        />
                        <Text style={{ padding: 15, fontSize: 30, color: '#fff', fontFamily: defaultStyles.fontFamily }}>Oficina Legal</Text>
                    </View>

                    <Image
                        source={require('../../images/LogoBranca.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.searchContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Icon
                                name="md-search"
                                size={30}
                                style={{ padding: 10, color: '#0d47a1', marginLeft: 10 }}
                            />
                            <TextInput style={styles.input}
                                placeholder="Pesquisar"
                                value={this.state.query}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={this.handlerSearch} />
                        </View>


                        { //Condicionador de render do "X" para apagar o campo de pesquisa
                            this.state.query !== ''
                                ?
                                <TouchableOpacity onPress={() => this.handlerSearch('')}>
                                    <Icon
                                        name="md-close"
                                        size={20}
                                        style={{ color: '#0d47a1', paddingRight: 15 }}
                                    />
                                </TouchableOpacity>
                                :
                                null
                        }

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={this.toggleModal}>
                            <Text style={{ color: '#0d47a1', fontSize: 15 }}>Filtros</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    onBackButtonPress={this.toggleModal}
                    onBackdropPress={this.toggleModal}
                    animationIn='zoomIn'
                    animationOut='zoomOut'
                    isVisible={this.state.isFilterModalVisible}
                >
                    <View style={{ backgroundColor: '#fff', justifyContent: 'center', borderRadius: 5, width: width - 40 }}>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{ backgroundColor: '#0d47a1', padding: 10, width: '100%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#fff' }}>Filtrar Busca</Text>
                            </View>
                            <Text style={{ color: '#0d47a1', marginTop: 10, marginLeft: 10 }}>Especialidade</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { this.handlerSearch('Mecânica'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible }) }}>
                                    <Text style={styles.filterButtonText}>Mecânica</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { this.handlerSearch('Elétrica'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible }) }}>
                                    <Text style={styles.filterButtonText}>Elétrica</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { this.handlerSearch('Funilaria'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible }) }}>
                                    <Text style={styles.filterButtonText}>Funilaria</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <FlatList
                    data={this.state.data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.RenderItem}
                    showsVerticalScrollIndicator={false}
                />
                <FloatingAction
                    actions={actions}
                    position='right'
                    overlayColor='trasparent'
                    onPressItem={
                        this.floatingButtonPress
                    }

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: 'white'
    },

    menuIcon: {
        position: 'absolute',
        paddingLeft: 20
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 10
    },

    input: {
        borderRadius: 5,
        alignSelf: 'stretch',
        fontSize: 16,
        paddingVertical: 10,
        width: '75%'
    },

    filterButton: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 5
    },

    filterButtonText: {
        fontSize: 15,
        color: 'black'
    },

    searchContainer: {
        marginLeft: 20,
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#f1f2f6',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    workShopComponent: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: 120,
        width: width - 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    }

})