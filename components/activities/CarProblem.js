import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Platform} from 'react-native'
import { contains } from '../SearchConfig'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import moment from 'moment';
import 'moment/locale/pt-br';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { getApiUrl } from '../../service/api'
import defaultStyle from '../styles/Default'
const baseURL = getApiUrl();
const { width, height } = Dimensions.get('window')


export default class CarProblem extends Component {
    state = {
        typeProb: null,
        loading: false,
        data: [{ id: 20, nomeServico: 'OlaMundo', tempoRealizacao: '02:20:10', preco: '24.52' }],
        error: null,
        query: "",
        fullData: [],
        date: null,
        isDateTimePickerVisible: false,
        carId: '',
        listOfCars: [],
        pickerSection: [{}],
        agendamentoLabel: 'Horário',
    }



    getVeiculos = async () => {
        const id = await AsyncStorage.getItem('client')
        const client = await axios.get(`${baseURL}/api/veiculo/${id}/veiculos`)
        this.setState({pickerSection: client.data})
        return client.data
    }

    mountDataCars = () => {
        const cars = this.state.pickerSection
        const listCars = []
        cars.map((value, index) => {
            objectCar = {}
            objectCar.key = value.id
            objectCar.label = "Carro: " + value.modelo + ", Placa: " + (value.placa).substring(0, 3).toUpperCase() + "-" + (value.placa).substring(3, 6)
            listCars[index] = objectCar
        })
        this.setState({ listOfCars: listCars })
    }

    makeRemoteRequest = async () => {
        this.setState({ loading: true });
        console.log('Loading: ', this.state.loading)

        await axios.get(`${baseURL}/api/servico/oficina/${this.props.navigation.getParam('oficina', 0)}`)
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

    RenderItem = (obj) => {
        const object = obj.item
        const name = object.nomeServico
        const price = object.preco
        const time = object.tempoRealizacao

        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        typeProb: obj.item
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
                        <Text style={{ color: 'black', fontSize: 16 }}>{name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name="md-time"
                                size={15}
                                color={defaultStyle.colors.primaryColor}
                            />
                            <Text style={{ marginLeft: 5 }}>{time}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginRight: 10, width: '20%' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Robot-Light', letterSpacing: 1, color: 'black' }}>R$ {price}</Text>
                </View>
            </TouchableOpacity>
        )
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

    toggleModal = () => {
        this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible })
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

    getHoraFim = () => {
        const dataStr = this.state.date.toString()
        const hora = parseInt(dataStr.substring(16, 18))
        const minuto = parseInt(dataStr.substring(19, 21))
        const segundo = parseInt(dataStr.substring(22, 25))
        const data2 = new Date();
        data2.setHours(hora)
        data2.setMinutes(minuto)
        data2.setSeconds(segundo)
        const realizacao = data2 + this.state.tempoRealizacao;
        return realizacao;
    }

    discoverMonth = (month) => {
        if (month == "Jan") { return "01"; }
        if (month == "Feb") { return "02"; }
        if (month == "Mar") { return "03"; }
        if (month == "Apr") { return "04"; }
        if (month == "May") { return "05"; }
        if (month == "Jun") { return "06"; }
        if (month == "Jul") { return "07"; }
        if (month == "Aug") { return "08"; }
        if (month == "Sep") { return "09"; }
        if (month == "Oct") { return "10"; }
        if (month == "Nov") { return "11"; }
        if (month == "Dec") { return "12"; }
    }

    createAgendamentoObject = () => {
        const dataStr = this.state.date.toString()
        const month = this.discoverMonth(dataStr.substring(4, 7));
        const data = dataStr.substring(11, 15) + "/" + month + "/" + dataStr.substring(8, 10)
        const hora = dataStr.substring(16, 25)
        agendamento = {
            dataHora: data + " " + hora,
            idVeiculo: this.state.carId,
            //idOficina: this.props.navigation.getParam('id', 0),
            idServico: this.state.typeProb,
            observacao: this.state.carProblem
        }
        return agendamento
    }

    createAgendamentoRegister = () => {
        const agendamento = this.createAgendamentoObject()
        axios.post(`${baseURL}/api/agendamento/create`, agendamento)
            .then(response => this.createOsRegister(agendamento.dataHora))
            .catch(response => JSON.stringify(response))
            
    }

    createOsRegister = (hora) => {
        try {
            axios.post(`${baseURL}/api/os/create`, this.createOsObject(hora))
            alert("Agendamento realizado com sucesso.")
            this.props.navigation.navigate("HomeClient")
        } catch (err) {
            alert("Não foi possível criar uma ordem de serviço")
        }
    }

    createOsObject = (realizacao) => {
        os = {
            //idServico: this.props.navigation.getParam('idProb'),
            idVeiculo: this.state.carId,
            //idOficina: this.props.navigation.getParam('id', 0),
            horaInicio: this.state.date,
            horaFim: this.getHoraFim(),
            dataRealizacao: realizacao
        }
        return os
    }

    componentDidMount() {
        //this.makeRemoteRequest();
        this.getVeiculos()
        this.mountDataCars()
    }

    render() {
        const { navigation } = this.props;
        //const name = navigation.getParam('name', 'oficina_name');
        //const endereco = navigation.getParam('endereco', "endereço");
        //const oficina = navigation.getParam('id', 0);
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
        console.log(this.state)
        return (
            <View
                style={styles.container}>
                <View style={{ width: '100%', height: '20%', backgroundColor: defaultStyle.colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Agendamento')
                        }}
                        style={{ padding: 15, position: 'absolute', top: 0, left: 0 }}>
                        <Icon
                            name='md-arrow-back'
                            size={30}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    {this.state.typeProb === null ?
                        <Text style={{ fontFamily: 'Roboto-Light', color: '#fff', fontSize: 25, letterSpacing: 2 }}>SERVIÇOS DA OFICINA</Text>
                        :
                        <Text style={{ fontFamily: 'Roboto-Light', color: '#fff', fontSize: 25, letterSpacing: 2 }}>AGENDAMENTO</Text>
                    }

                </View>
                {this.state.typeProb === null ?
                    //Escolhendo o problema do carro
                    <View style={styles.servicesContainer}>
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
                    :
                    <View style={styles.servicesContainer}>


                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyle.colors.primaryColor,
        alignItems: 'center',

    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: 'white'
    },

    workShopComponent: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        height: 60,
        width: width - 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
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

    servicesContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})