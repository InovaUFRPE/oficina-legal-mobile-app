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
        text: "Meus Agendamento",
        icon: require('../../images/calendarIcon.png'),
        name: 'bt_addcar',
        position: 1
    }
]
export default class HomeClient extends Component {

    state = {
        region: null,
        loading: false,
        data: [
            {id:1 , razaoSocial: 'da hora', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'dahoralins@hotmail.com', likes: 34, especialidade: 'Mecânica', logo: 'https://i.pinimg.com/originals/54/27/90/542790397e99c703291753baa0700d57.jpg', latitude: -8.1177294, longitude: -34.9412915}, 
            {id:2 , razaoSocial: 'do manoel', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'mateus@hotmail.com', likes: 134, especialidade: 'Elétrica', logo: 'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F08%2F25%2F19%2FWDL-Logo-6650_18118_041040027_1552849433.jpg', latitude: 10, longitude: 20}, 
            {id:3 , razaoSocial: 'bateu concertou', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'joao@hotmail.com', likes: 531, especialidade: 'Elétrica', logo: 'https://ae01.alicdn.com/kf/HTB1QxqpRVXXXXbsXXXXq6xXFXXX4/Servi-o-de-repara-o-de-Servi-o-Oficina-Auto-Logotipo-Do-Carro-Adesivo-de-Parede.jpg_640x640.jpg', latitude: 10, longitude: 20}, 
            {id:4 , razaoSocial: 'melhor preço', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'raqyuel@hotmail.com', likes: 12, especialidade: 'funilaria', logo: 'http://www.leaodesign.com.br/images/portfolio/criacao-de-logotipos/3-single.png', latitude: 10, longitude: 20}, 
            {id:5 , razaoSocial: 'da comunidade', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'melhor_preço@hotmail.com', likes: 537, especialidade: 'Mecânica', logo: 'https://storage.googleapis.com/aquitempe-212001.appspot.com/imagens/e23612c9-1700-4dbd-b209-b06154193ff4/oficina%20mecanica%20e%20eletrica%20logo.png', latitude: 10, longitude: 20}, 
            {id:6 , razaoSocial: 'motos e Carros', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'ana@hotmail.com', likes: 76, especialidade: 'funilaria', logo: 'http://mecsm.com.br/wp-content/uploads/2018/03/logo-mec-mecanica-retina.png', latitude: 10, longitude: 20}, 
            {id:7 , razaoSocial: 'joao e neto', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'barbosa@hotmail.com', likes: 41, especialidade: 'Elétrica', logo: 'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2014%2F10%2F05%2F13%2FLogo-e-Papelaria-LV-118391_25301_044356510_289312155.jpg', latitude: 10, longitude: 20}, 
            {id:8 , razaoSocial: 'moura', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'silva@hotmail.com', likes: 97, especialidade: 'Mecânica', logo: 'http://www.portaldosmecanicos.com.br/wp-content/uploads/2016/07/logo-redes-sociais.png', latitude: 10, longitude: 20}, 
            {id:9 , razaoSocial: 'casa do mercedes', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'melo@hotmail.com', likes: 64, especialidade: 'Elétrica', logo: 'http://lucenamanutencaoautomotiva.com.br/wp-content/uploads/2018/10/logo-lucena.png', latitude: 10, longitude: 20}, 
            {id:10 , razaoSocial: 'importados merchan', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'tragoso@hotmail.com', likes: 314, especialidade: 'Mecânica', logo: 'http://oficinamotorpoint.com.br/wp-content/uploads/2016/01/logo-motor-point-lapa.png', latitude: 10, longitude: 20}, 
            {id:11 , razaoSocial: 'carango', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'popoca@hotmail.com', likes: 6473, especialidade: 'Mecânica', logo: 'http://euroscan.com.br/wp-content/uploads/2017/11/LOGO-SCAS.png', latitude: 10, longitude: 20}, 
            {id:12 , razaoSocial: 'carango do Marcos', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'ame@hotmail.com', likes: 1234, especialidade: 'funilaria', logo: 'https://a2roficinaauto.pt/wp-content/uploads/2018/05/Logo-small-square-copy.jpg', latitude: 10, longitude: 20}, 
            {id:13 , razaoSocial: 'shell',endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife', email: 'cosfasdfta@hotmail.com', likes: 564, especialidade: 'Elétrica', logo: 'https://scontent.frec3-1.fna.fbcdn.net/v/t1.0-9/37069252_1899896400068418_7837900116416528384_n.jpg?_nc_cat=110&_nc_ht=scontent.frec3-1.fna&oh=54f4aae7d9708bc75b89757bbee7e81c&oe=5D8980E0', latitude: 10, longitude: 20}, 
            {id:14 , razaoSocial: 'brasil', endereco: 'Rua Rio Das Neves', bairro: 'Ibura', cidade: 'Recife',email: 'gasdf@hotmail.com', likes: 76, especialidade: 'funilaria', logo: 'http://www.logotiposdeempresas.com.br/wp-content/uploads/2011/05/logomarca_renotech_oficina_renault.jpg', latitude: 10, longitude: 20}, ],
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
        console.log(this.state.loading)

        await axios.get("http://192.168.0.10:4000/api/oficina/findAll")
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

    removeAcento = (text) => {
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
        const endereco = object.endereco.charAt(0).toUpperCase() + name.slice(1);
        const cidade = object.cidade.charAt(0).toUpperCase() + name.slice(1);
        const bairro = object.bairro.charAt(0).toUpperCase() + name.slice(1);
        const id = object.id
        const shopLat = object.latitude
        const shopLon = object.longitude
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('WorkShopLayout', {
                        name: formatedName,
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
                        <Text style={{ fontFamily: 'bebas', fontSize: 20 }}>{formatedName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name="md-home"
                                size={13}
                                style={{ marginTop: 3 }}

                            />
                            <Text style={{ marginLeft: 4, textAlign: 'justify', paddingRight: 5}}>{endereco}, {bairro}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name="md-locate"
                                size={13}
                                style={{ marginTop: 3 }}

                            />
                            <Text style={{ marginLeft: 3 }}>{this.CalcRadiusDistance(shopLat, shopLon) * -1} KM</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 5, marginLeft: 15, flexDirection: 'row' }}>
                        <Icon
                            name="md-star"
                            size={20}
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