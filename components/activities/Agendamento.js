import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, View, Dimensions, DatePickerIOS, Platform, TouchableOpacity, TextInput, ScrollView, Image, FlatList } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from 'react-native-modal-datetime-picker'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyle from '../styles/Default'
import LinearGradient from 'react-native-linear-gradient'
import { Dropdown } from 'react-native-material-dropdown';

const initialState = { desc: '', date: null, workShopInformation: [{ name: '', adress: '', phoneNumber: '' }], pickerSection: '', agendamentoLabel: 'Horário' }
const { width, height } = Dimensions.get('window')

export default class Agendamento extends Component {
    state = {
        ...initialState,
        isDateTimePickerVisible: false,
        carId: '',
        typeProb: 0, //this.props.navigation.getParam('idProb', 0),
        carProblem: '',
        data: [{
            value: 'Carro 1'
        },
        {
            value: 'Carro 2'
        }
        ],

        loading: false,
        data: [],
        error: null,
        query: "",
        fullData: [],
        date: null,
        agendamentoLabel: 'Horário',
    }

    createServicoRegister = async () => {
        try {
            await axios.post(`http://192.168.25.184:4000/api/servico/register`, this.createServicoObject())
        } catch (err) {
            alert("Não foi possível criar um serviço")
        }
    }

    createAgendamentoRegister = async () => {
        try {
            await axios.post(`http://192.168.25.184:4000/api/agendamento/create`, this.createAgendamentoObject())
        } catch (erro) {
            alert("Não foi possível criar um agendamento")
        }
    }

    createOsRegister = async () => {
        try {
            await axios.post(`http://192.168.25.184:4000/api/os/create`, this.createOsObject())
        } catch (err) {
            alert("Não foi possível criar uma ordem de serviço")
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            date,
            agendamentoLabel: moment(date).format('llll')
        })
        this.hideDateTimePicker();
    };

    componentDidMount = async () => {
        this.makeRemoteRequest();

        const id = await AsyncStorage.getItem('user')
        try {
            await axios.post("http://192.168.25.184:4000/api/cliente/usuario", { idUsuario: id })
                .then(response => this.getVeiculos(response.data.id))
        } catch (err) {
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }

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

    getVeiculos = async (id) => {
        await axios.get(`http://192.168.25.184:4000/api/cliente/${id}/veiculos`)
            .then(response => this.setState({ pickerSection: response.data }))
    }

    createScheduleRequisition = () => {
        const schedule = {
            //idOficina: navigation.getParam('id', 0),
            idVeiculo: this.state.carId,
            data_hora: this.state.date,

        }
    }

    schedule = async () => {
        this.createScheduleRequisition()

    }

    makeRemoteRequest = async () => {
        this.setState({ loading: true });
        console.log('Loading: ', this.state.loading)

        await axios.get(`http://192.168.25.184:4000/api/servico/oficina/${this.props.navigation.getParam('oficina', 0)}`)
            .then(problems => {
                this.setState({
                    loading: false,
                    data: problems.data,
                    fullData: problems
                });
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }

    RenderItem = (obj) => {
        const object = obj.item
        const name = object.nomeServico
        const id = object.id
        const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
        const price = object.preco
        const time = object.tempoRealizacao

        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        typeProb: id
                    })
                }}

                style={styles.workShopComponent}>
                <View style={{ flexDirection: 'row', marginLeft: 15, alignItems: 'center' }}>
                    <View style={{ backgroundColor: defaultStyle.colors.primaryColor, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                        <Icon
                            name='ios-settings'
                            size={20}
                            color='#fff'
                        />
                    </View>

                    <View style={{ marginLeft: 10 }}>
                        <Text>{formatedName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name="md-time"
                                size={15}
                            />
                            <Text style={{ marginLeft: 5 }}>{time}</Text>
                        </View>


                    </View>
                </View>
                <View style={{ marginRight: 15 }}>
                    <Text style={{ fontSize: 15 }}>R$ {price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const { navigation } = this.props;
        //const name = navigation.getParam('name', 'oficina_name');
        //const endereco = navigation.getParam('endereco', "endereço");
        //const oficina =  navigation.getParam('id', 0);
        let datePicker = null

        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='time' date={this.state.date} minimumDate={this.state.date}
                onDateChange={date => this.setState({ date })} />
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.showDateTimePicker} style={{ width: '100%' }}>
                    <Text style={{ fontSize: 20, padding: 16 }}>{this.state.agendamentoLabel}</Text>
                    <DateTimePicker
                        mode='datetime'
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        minimumDate={new Date()}
                    />
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container} >
                <LinearGradient colors={['#3949ab', '#303f9f', '#283593', '#1a237e']} style={styles.background}>
                    <Icon
                        name="md-arrow-back"
                        size={30}
                        color={defaultStyle.colors.textOnPrimary}
                        style={{ padding: 15, position: 'absolute', top: 0, left: 0 }}
                        onPress={() => { this.props.navigation.goBack() }}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width }}>
                        <Text style={{ fontSize: 35, fontFamily: 'roboto', color: defaultStyle.colors.textOnPrimary, textAlign: 'center' }}>SERVIÇOS DA OFICINA</Text>
                    </View>
                </LinearGradient>

                {this.state.typeProb != 0 ?

                    <View style={{ width: '100%', height: '70%', backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center' }}>
                        <ScrollView>
                            <View style={{ justifyContent: 'flex-start', marginTop: 10, borderTopRightRadius: 10, width: width, marginLeft: 20 }}>
                                <Text style={{ fontSize: 25, fontFamily: 'Roboto-Regular', color: '#0b111f' }}>Oficina do Manoel{/*{name}*/}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        name='md-navigate'
                                        size={15}
                                        color='#1a237e'
                                        style={{}}
                                    />
                                    <Text style={{ fontSize: 15, marginLeft: 5 }}>Rua Rio Xingu, Ibura, Recife{/*{{endereco}}*/}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width, marginTop: 20, padding: 15, alignItems: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 20, marginLeft: 20 }}>Troca de Óleo</Text>
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.setState({ typeProb: 0 })}>
                                    <Icon
                                        name='md-close'
                                        size={20}
                                        color={defaultStyle.colors.primaryColor}
                                    />
                                </TouchableOpacity>
                            </View>


                            <View style={[styles.infoContainer, { marginTop: 20 }]}>
                                <Icon
                                    name='md-alarm'
                                    size={30}
                                    color='#0b111f'
                                />
                                {datePicker}
                            </View>

                            <View style={styles.infoContainer}>
                                <Icon
                                    name='md-alert'
                                    color='#0b111f'
                                    size={30}
                                />
                                <TextInput
                                    style={{ marginLeft: 16 }}
                                    placeholder="Detalhe o problema do veículo"
                                    autoCorrect={false}
                                    maxLength={180}
                                    multiline={true}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    value={this.state.carProblem}
                                    onChangeText={problem => this.setState({ carProblem: problem })}
                                />
                            </View>

                            <View style={styles.infoContainer}>
                                <Icon
                                    name='md-car'
                                    color='#0b111f'
                                    size={30}
                                />
                                <View style={{ width: '70%', marginLeft: 16 }}>
                                    <Dropdown
                                        label='Seu carro'
                                        data={this.state.data}
                                    />
                                </View>

                            </View>
                            
                            <View style={styles.infoContainer}>
                                <TouchableOpacity style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', width: width - 80, borderRadius: 5, backgroundColor: defaultStyle.colors.primaryColor }}>
                                    <Text style={{ padding: 20, fontSize: 16, color: '#fff' }}>AGENDAR</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    //Caso o problema nao tenha sido selecionado ainda
                    <View
                        style={{ width: width, backgroundColor: '#fff', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: '70%' }}>
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
                        </View>

                        <FlatList
                            data={this.state.data}
                            keyExtractor={item => `${item.id}`}
                            renderItem={this.RenderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1a237e'
    },
    background: {
        width: "100%",
        height: "30%",
        //backgroundColor: defaultStyle.colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'red',
        fontSize: 40,
        marginLeft: 20,
        marginBottom: 10,
        textShadowRadius: 19

    },
    subtitle: {
        color: 'blue',
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    inputsContainer: {
        flex: 7,
    },

    infoContainer: {
        marginLeft: 20,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    infoText: {
        color: 'lightgray',
        fontWeight: '500',
        fontSize: 20
    },

    date: {
        fontSize: 20,
        fontWeight: '400',
        width: '100%'

    },
    buttonAgendar: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#2250d9",
        alignSelf: 'stretch',
        width: 300
    },
    textButton: {
        color: "#FFF",
        fontSize: 15,
        textAlign: "center",
    },

    problemComponent: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: width - 50,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    workShopComponent: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        height: 60,
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
})