import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Dimensions, DatePickerIOS, Platform, TouchableOpacity, TextInput, ScrollView, Image, FlatList, KeyboardAvoidingView } from 'react-native'
import moment from 'moment';
import 'moment/locale/pt-br';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyle from '../styles/Default';
import ModalSelector from 'react-native-modal-selector';
import { getApiUrl } from '../../service/api'

const baseURL = getApiUrl();

export default class Agendamento extends Component {
    state = {
        isDateTimePickerVisible: false,
        date: this.props.navigation.getParam('date', ''),
        typeProb: this.props.navigation.getParam('idProb', 0),
        tempoRealizacao: this.props.navigation.getParam('tempoRealizacao', null),
        nomeServico: this.props.navigation.getParam("nomeServico", "SERVIÇOS DA OFICINA"),
        carId: '',
        carProblem: '',
        idAgendamento: 0,
        pickerSection: [{}],
        listOfCars: [],
        data: [],
        error: null,
        loading: false,
        agendamentoLabel: 'HORÁRIO',
    }


    //Funções para LISTAGEM DE CARROS
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

    getVeiculos = async () => {
        const id = await AsyncStorage.getItem('client')
        const client = await axios.get(`${baseURL}/api/veiculo/${id}/veiculos`)
        return client.data
    }


    componentDidMount = async () => {
        const vehicles = await this.getVeiculos()
        this.setState({ pickerSection: vehicles })
        this.mountDataCars()
    }
    //

    //Funçoes para o RELOGIO
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            date,
            agendamentoLabel: moment(date).format('L') + ' às ' + moment(date).format('LT')
        })
        this.hideDateTimePicker();
    };
    //

    //Função de TRATAMENTO DE ERRO

    isAnyFieldEmpty = () => {
        if (this.state.date === ''){
            return(1)
        }else if(this.state.carId === ''){
            return (2)
        }else if(this.state.typeProb === 0){
            return (3)
        }else{
            return (0)
        }
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
    //

    //Funções para o AGENDAMENTO

    createAgendamentoRegister = () => {
        console.log('1° - Criar registro de agendamento')
        const agendamento = this.createAgendamentoObject()
        console.log('Objeto Agendamento: ', agendamento)
        axios.post(`${baseURL}/api/agendamento/create`, agendamento)
            .then(response => this.createOsRegister(agendamento.dataHora)) //O Bug do agendamento nao ta passando daqui
            .catch(response => JSON.stringify(response))
    }

    createAgendamentoObject = () => {
        if (this.isAnyFieldEmpty() === 0) {
            const dataStr = this.state.date.toString()
            const month = this.discoverMonth(dataStr.substring(4, 7));
            const data = dataStr.substring(11, 15) + "/" + month + "/" + dataStr.substring(8, 10)
            const hora = dataStr.substring(16, 25)
            agendamento = {
                dataHora: data + " " + hora,
                idVeiculo: this.state.carId,
                idOficina: this.props.navigation.getParam('id', 0),
                idServico: this.state.typeProb,
                observacao: this.state.carProblem
            }
            console.log('2° Retornar objeto do agendamento')
            return agendamento
        } else if (this.isAnyFieldEmpty() === 1) {
            alert('Você precisa escolher uma data para realizar o agendamento')
        } else if(this.isAnyFieldEmpty() === 2) {
            alert('Escolha um veículo para completar o agendamento, caso não tenha nenhum veículo cadastrado, cadastre no seu Perfil')
        } 
        else {
            alert('Você precisa selecionar um serviço da oficina')
        }

    }

    createOsRegister = (hora) => {
        console.log('2.1° Entrar para criar o registro de OS')
        try {
            console.log('3° Registrar a OS')
            axios.post(`${baseURL}/api/os/create`, this.createOsObject(hora))
            console.log('5° OS registrada')
            alert("Agendamento realizado com sucesso.")
            this.props.navigation.navigate("HomeClient")
        } catch (err) {
            alert("Não foi possível criar uma ordem de serviço")
        }
    }

    createOsObject = (realizacao) => {
        console.log('4° Criar Objeto OS')
        os = {
            idServico: this.props.navigation.getParam('idProb'),
            idVeiculo: this.state.carId,
            idOficina: this.props.navigation.getParam('id', 0),
            horaInicio: this.state.date,
            horaFim: this.getHoraFim(),
            dataRealizacao: realizacao
        }
        console.log('4.1° Criar Objeto OS')
        return os
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
    render() {
        const { navigation } = this.props;
        const workShopName = navigation.getParam('name', 'oficina_name');
        const endereco = navigation.getParam('endereco', "endereço");
        const oficina = navigation.getParam('id', 0);

        //Definição do Relegio
        let datePicker = null
        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='time' date={this.state.date} minimumDate={this.state.date}
                onDateChange={date => this.setState({ date })} />
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.showDateTimePicker} style={{ width: '100%' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-light', color: 'black', letterSpacing: 2, marginLeft: 20, }}>
                        {/*Data formatada*/}
                        {this.state.date === ''
                            ? 'HORÁRIO'
                            : moment(this.state.date).format('L') + ' às ' + moment(this.state.date).format('LT')}
                    </Text>
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
            <View style={styles.container} >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>
                        AGENDAMENTO
                    </Text>
                </View>
                {/*Botao voltar para act*/}
                <TouchableOpacity
                    style={{ position: 'absolute', left: 0, padding: 15 }}
                    onPress={() => { this.props.navigation.navigate('WorkShopLayout') }}>
                    <Icon
                        name={'ios-arrow-back'}
                        size={25}
                        color='#fff'
                    />
                </TouchableOpacity>
                <View style={styles.componentsContainer}>
                    <View style={styles.workShopNameContainer}>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 15, letterSpacing: 2 }}>
                            OFICINA
                        </Text>
                        <Text style={styles.workShopNameText}>
                            {workShopName}
                        </Text>
                    </View>
                    <View style={[styles.timeContainer, { marginTop: 20 }]}>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => { }}
                        >
                            <Icon
                                name='md-calendar'
                                size={35}
                                color={defaultStyle.colors.primaryColor}
                            />
                            {/*Calendário e Relógio*/}
                            {datePicker}
                        </View>
                    </View>
                    <View style={styles.timeContainer}>
                        <TouchableOpacity
                            style={styles.buttonComponent}
                            onPress={() => this.props.navigation.navigate('TypeProblem', {
                                date: this.state.date,
                                oficina: oficina
                            })}
                        >
                            <Icon
                                name='ios-settings'
                                size={35}
                                color={defaultStyle.colors.primaryColor}
                            />
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-light', color: 'black', letterSpacing: 2, marginLeft: 20, width: '80%' }}>
                                {this.state.nomeServico}
                            </Text>
                            {this.state.typeProb === 0
                                ?
                                null
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            typeProb: 0,
                                            tempoRealizacao: null,
                                            nomeServico: 'SERVIÇOS DA OFICINA'
                                        })
                                    }}>
                                    <Icon
                                        name='md-close'
                                        size={20}
                                        color={defaultStyle.colors.primaryColor}
                                    />
                                </TouchableOpacity>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timeContainer}>
                        <TouchableOpacity
                            style={styles.buttonComponent}
                            onPress={() => { }}
                        >
                            <Icon
                                name='md-car'
                                size={35}
                                color={defaultStyle.colors.primaryColor}
                            />
                            <View style={{ width: '80%', marginLeft: 20 }}>
                                <ModalSelector
                                    data={this.state.listOfCars}
                                    initValue="Escolha um veículo"
                                    supportedOrientations={['landscape']}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancelar'}
                                    onChange={(option) => this.setState({ carId: option.key })}>
                                </ModalSelector>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.timeContainer}>
                        <TouchableOpacity
                            style={styles.buttonComponent}
                            onPress={() => { }}
                        >
                            <Icon
                                name='ios-alert'
                                size={35}
                                color={defaultStyle.colors.primaryColor}
                            />
                            <TextInput
                                style={{ marginLeft: 20, width: '80%' }}
                                placeholder="Detalhe o problema do veículo"
                                autoCorrect={false}
                                maxLength={160}
                                multiline={true}
                                returnKeyType='done'
                                blurOnSubmit={true}
                                value={this.state.carProblem}
                                onChangeText={problem => this.setState({ carProblem: problem })}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonAgendar}
                        onPress={() => this.createAgendamentoRegister()}
                    >
                        <Text style={{ padding: 16, fontFamily: 'Roboto-Regular', letterSpacing: 1, fontSize: 20, color: '#fff' }}>
                            AGENDAR
                        </Text>
                    </TouchableOpacity>

                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: defaultStyle.colors.primaryColor
    },
    headerContainer: {
        width: "100%",
        height: "20%",
        backgroundColor: defaultStyle.colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerTitle: {
        fontSize: 25,
        fontFamily: 'Roboto-Light',
        letterSpacing: 2,
        color: '#fff'
    },

    componentsContainer: {
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center'
    },

    workShopNameContainer: {
        width: '100%',
        marginLeft: 40,
        marginVertical: 10
    },

    workShopNameText: {
        fontSize: 25,
        fontFamily: 'Roboto-Regular',
        color: 'black',
        letterSpacing: 2
    },

    timeContainer: {
        flexDirection: 'row',
        height: '15%',
        width: '80%',
        borderTopWidth: 0.5,
    },

    buttonComponent: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttonAgendar: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: defaultStyle.colors.primaryColor,
        width: '70%',
    },
})