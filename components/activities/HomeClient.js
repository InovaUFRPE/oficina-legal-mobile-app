import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { getUsers, contains } from '../SearchConfig'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action"
import Snackbar from 'react-native-snackbar'
import defaultStyles from '../styles/Default'
import AsyncStorage from '@react-native-community/async-storage';
import { getApiUrl } from '../../service/api'


const baseURL = getApiUrl();

const { width, height } = Dimensions.get('window')
const actions = [
    {
        text: "Agendamentos",
        icon: require('../../images/calendarIcon.png'),
        name: 'bt_addcar',
        position: 1
    }
]
''
export default class HomeClient extends Component {

    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
        },
        distance: null,
        loading: false,
        data: [],
        error: null,
        query: "",
        fullData: [],
        client: 0,
        isFilterModalVisible: false,
        agendamentoMarcado: false,
    }

    componentDidMount() {
        this.makeRemoteRequest();
        this.getUserLocation();
        this.getClient();
        /* Colocar a função de checagem se o usuario tem algum agendamento marcado

            isAgendamentoMarcado retornar True
            ? this.setState({agendamentoMarcado: true})
            : null
        
        */
    }

    getClient = async () => {
        const idUser = await AsyncStorage.getItem('user')
        const client = await axios.get(`${baseURL}/api/cliente/findByIdUsuario/${parseInt(idUser)}`)
        AsyncStorage.setItem('client', JSON.stringify(client.data.id))
    }

    makeRemoteRequest = async () => {
        this.setState({ loading: true });
        console.log('Fez a requisiçao no banco de dados')
        await axios.get(`${baseURL}/api/oficina/findAll`)
            .then(users => {
                this.setState({
                    loading: false,
                    data: users.data,
                    fullData: users
                });
            })
            .catch(error => {
                console.log('Erro Em makeRemoteRequest ./HomeClient')
                this.setState({ error, loading: false })
            })
    }


    makeLocalRequest = () => {
        console.log('Fez a requisiçao no Localmente')
        getUsers(20, this.state.query, this.state.fullData.data)
            .then(users => {
                this.setState({
                    loading: false,
                    data: users,
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
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }

    // getDistance(shopLat, shopLong) {
    //     let origin = (this.state.region.latitude + ',' + this.state.region.longitude)
    //     let destination = (shopLat + ',' + shopLong)
    //     let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + origin + '&destinations=' + destination + '&key=AIzaSyAOeQqxsLy3yzESYglsQEjhD5iu_UtltuM';
    //     fetch(url)
    //         .then(res => res.json())
    //         .then((out) => {
    //             const distance = (out.rows[0].elements[0].distance.value/1000).toFixed(1)
    //             return distance.GetParentId(nodeId)
    //         })
    //         .catch(err => { throw err });
    // }

    handlerSearch = (text) => {
        console.log('Querry: ', text)
        const formatQuery = text
        const data = _.filter(this.state.data, user => {
            return contains(user, formatQuery)
        })
        this.setState({ query: formatQuery, data }, () => this.makeLocalRequest())
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
        const formatedName = name.toUpperCase()
        const endereco = object.endereco.toUpperCase()
        const cidade = object.cidade.toUpperCase()
        const bairro = object.bairro.toUpperCase()
        const id = object.id
        const shopLat = object.latitude
        const shopLon = object.longitude
        const userLat = this.state.region.latitude
        const userLon = this.state.region.longitude
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('WorkShopLayout', {
                        name: formatedName,
                        shopLat: shopLat,
                        shopLon: shopLon,
                        userLat: userLat,
                        userLon: userLon,
                        address: { endereco, bairro, cidade },
                        idWorkshop: id,
                    },
                    )
                }}
                style={styles.workShopComponent}>
                <View style={{ width: '100%', height: 130, }}>
                    <View style={{ marginTop: 10, marginLeft: 15, height: '85%', marginRight: 10 }}>
                        <Text style={{ fontFamily: 'Roboto-Light', letterSpacing: 1.5 }}>OFICINA</Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', color: 'black', fontSize: 22, letterSpacing: 1 }}>
                            {formatedName}
                        </Text>
                        <Text>
                            {endereco}, {bairro}
                        </Text>
                        <Text>
                            {cidade}
                        </Text>
                    </View>

                    <View style={{ position: 'absolute', right: 0, bottom: 0, flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            name='md-thumbs-up'
                            size={15}
                            color={defaultStyles.colors.primaryColor}
                        />
                        <Text style={{ marginHorizontal: 5, fontFamily: 'Roboto-Light', letterSpacing: 1, color: 'black' }}>
                            1.513
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.state.fullData.data)
        console.log(this.state.data)
        return (

            <View
                style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: width, backgroundColor: 'lighblue', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ padding: 15, }}
                            onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon
                                name="md-menu"
                                size={30}
                                style={{ color: defaultStyles.colors.primaryColor }}
                            />
                        </TouchableOpacity>

                        <Text style={{ padding: 15, fontSize: 22, color: defaultStyles.colors.primaryColor, fontFamily: 'Roboto-Medium', letterSpacing: 2 }}>Oficina Legal</Text>
                    </View>

                    <Image
                        source={require('../../images/LogoAzulR.png')}
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
                                onChangeText={this.handlerSearch}
                            />
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
                                    onPress={() => { /*this.handlerSearch('Mecânica'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })*/ }}>
                                    <Text style={styles.filterButtonText}>Mecânica</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { /*this.handlerSearch('Elétrica'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })*/ }}>
                                    <Text style={styles.filterButtonText}>Elétrica</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={() => { /*this.handlerSearch('Funilaria'); this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })*/ }}>
                                    <Text style={styles.filterButtonText}>Funilaria</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {this.state.loading === true
                    ?
                    <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color={defaultStyles.colors.primaryColor} />
                    </View>
                    :
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => `${item.id}`}
                        renderItem={this.RenderItem}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingBottom: 10 }}
                    />
                }

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
        marginRight: 10,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        height: 130,
        width: width - 30,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }

})