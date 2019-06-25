import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Dimensions, DatePickerIOS, Platform, TouchableOpacity, TextInput, ScrollView, Image, FlatList } from 'react-native'
import moment from 'moment';
import 'moment/locale/pt-br';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyle from '../styles/Default';
import LinearGradient from 'react-native-linear-gradient';
import ModalSelector from 'react-native-modal-selector';
import { getApiUrl } from '../../service/api'

const baseURL = getApiUrl();

const initialState = { desc: '', date: null, workShopInformation: [{ name: '', adress: '', phoneNumber: '' }], pickerSection: '', agendamentoLabel: 'Horário' }
const { width, height } = Dimensions.get('window')

export default class Agendamento extends Component {
    state = {
        ...initialState,
        isDateTimePickerVisible: false,
        carId: '',
        date: '',
        idAgendamento: 0,
        typeProb: this.props.navigation.getParam('idProb', 0),
        tempoRealizacao: this.props.navigation.getParam('tempoRealizacao', null),
        carProblem: '',
        pickerSection: [{}],
        listOfCars: [{}],
        loading: false,
        data: [],
        error: null,
        query: "",
        fullData: [],
        date: null,
        agendamentoLabel: 'Horário',
    }

    getVeiculos = async () => {
        const id = await AsyncStorage.getItem('client')
        const client = await axios.get(`${baseURL}/api/veiculo/${id}/veiculos`)
        return client.data
    }

    mountDataCars = () => {
        const cars = this.state.pickerSection
        const listCars = []
        cars.map((value, index) => {
            objectCar = {}
            objectCar.key = value.id
            objectCar.label = "Carro: "+ value.modelo + ", Placa: " + (value.placa).substring(0,3).toUpperCase()+"-"+(value.placa).substring(3,6)
            listCars[index] = objectCar
        })
        this.setState({ listOfCars: listCars })
    }

    componentDidMount = async () => {
        const vehicles = await this.getVeiculos()
        this.setState({pickerSection: vehicles})
        this.mountDataCars()
    }

    discoverMonth = (month) => {
        if(month == "Jan"){ return "01"; }
        if(month == "Feb"){ return "02"; } 
        if(month == "Mar"){ return "03"; }
        if(month == "Apr"){ return "04"; }
        if(month == "May"){ return "05"; }
        if(month == "Jun"){ return "06"; }
        if(month == "Jul"){ return "07"; }
        if(month == "Aug"){ return "08"; }
        if(month == "Sep"){ return "09"; }
        if(month == "Oct"){ return "10"; }
        if(month == "Nov"){ return "11"; }
        if(month == "Dec"){ return "12"; }
    }
    
    createAgendamentoObject = () => {
        const dataStr = this.state.date.toString()
        const month = this.discoverMonth(dataStr.substring(4,7));
        const data = dataStr.substring(11,15)+"/"+month+"/"+dataStr.substring(8,10)
        const hora = dataStr.substring(16,25)
        agendamento = {
            dataHora: data + " " + hora,
            idVeiculo: this.state.carId,
            idOficina: this.props.navigation.getParam('id', 0),
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
    
    createOsObject = (realizacao) => {
        os = {
            idServico: this.props.navigation.getParam('idProb'),
            idVeiculo: this.state.carId,
            idOficina: this.props.navigation.getParam('id', 0),
            horaInicio: this.state.date,
            horaFim: this.getHoraFim(),
            dataRealizacao: realizacao
        }
        return os
    }
    
    getHoraFim = () => {
        const dataStr = this.state.date.toString()
        const hora = parseInt(dataStr.substring(16,18))
        const minuto = parseInt(dataStr.substring(19,21))
        const segundo = parseInt(dataStr.substring(22, 25))
        const data2 = new Date();
        data2.setHours(hora)
        data2.setMinutes(minuto)
        data2.setSeconds(segundo)
        const realizacao = data2 + this.state.tempoRealizacao;
        return realizacao; 
    }
    
    createOsRegister = (hora) => {
        try{
            axios.post(`${baseURL}/api/os/create`, this.createOsObject(hora))
            alert("Agendamento realizado com sucesso.")
            this.props.navigation.navigate("HomeClient")
        }catch(err){
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

    createScheduleRequisition = () => {
        const schedule = {
            idOficina: navigation.getParam('id', 0),
            idVeiculo: this.state.carId,
            data_hora: this.state.date,
    
        }
    }
    
    schedule = async () => {
        this.createScheduleRequisition()
    
    }
    

    render(){

        const { navigation } = this.props;
        const name = navigation.getParam('name', 'oficina_name');
        const nomeServico = navigation.getParam("nomeServico", "Nome do Serviço")
        const endereco = navigation.getParam('endereco', "endereço");
        const oficina =  navigation.getParam('id', 0);
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
                        <Text style={{ fontSize: 35, fontFamily: 'roboto', color: defaultStyle.colors.textOnPrimary, textAlign: 'center' }}>AGENDE UM HORÁRIO</Text>
                    </View>
                </LinearGradient>
    
                {this.state.typeProb != 0 ?
    
                    <View style={{ width: '100%', height: '70%', backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center' }}>
                        <ScrollView>
                            <View style={{ justifyContent: 'flex-start', marginTop: 10, borderTopRightRadius: 10, width: width, marginLeft: 20 }}>
                                <Text style={{ fontSize: 25, fontFamily: 'Roboto-Regular', color: '#0b111f' }}>{name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        name='md-navigate'
                                        size={15}
                                        color='#1a237e'
                                        style={{}}
                                    />
                                    <Text style={{ fontSize: 15, marginLeft: 5 }}>{endereco}</Text>
                                </View>
                            </View>
    
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width, marginTop: 20, padding: 15, alignItems: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 20, marginLeft: 20 }}>{nomeServico}</Text>
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
                                    <ModalSelector
                                        data={this.state.listOfCars}
                                        initValue="Escolha um carro"
                                        supportedOrientations={['landscape']}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancelar'}
                                        onChange={(option)=> this.setState({carId: option.key})}></ModalSelector>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <TouchableOpacity style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', width: width - 80, borderRadius: 5, backgroundColor: defaultStyle.colors.primaryColor }} onPress={() => this.createAgendamentoRegister()}>
                                    <Text style={{ padding: 20, fontSize: 16, color: '#fff' }}>AGENDAR</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    //Caso o problema nao tenha sido selecionado ainda
                    <View
                        style={{ width: width, backgroundColor: '#fff', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: '70%' }}>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('TypeProblem', {
                                    oficina:oficina
                                })}>
                                <Text style={styles.buttonText}>QUAL PROBLEMA SEU CARRO APRESENTA ?</Text>
                            </TouchableOpacity>
                        </View>
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
    textAlign: 'center',
    letterSpacing: 1.25,
    marginLeft: 10,
    padding: 16
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


