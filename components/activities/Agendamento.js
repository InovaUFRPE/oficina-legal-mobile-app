import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, View, Dimensions, DatePickerIOS, Platform, TouchableOpacity, TextInput, ScrollView, Image, Picker } from 'react-native'
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
        typeProb: this.props.navigation.getParam('idProb', 0),
        carProblem: '',
        data: [{
            value: 'Carro 1'
        },
        {
            value: 'Carro 2'
        }
        ]
    }

    createServicoRegister = async () => {
        try{
            await axios.post(`http://192.168.0.10:4000/api/servico/register`, this.createServicoObject())
        }catch(err){
            alert("Não foi possível criar um serviço")
        }
    }

    createAgendamentoRegister = async () => {
        try{
            await axios.post(`http://192.168.0.10:4000/api/agendamento/create`, this.createAgendamentoObject())
        }catch(erro){
            alert("Não foi possível criar um agendamento")
        }
    }

    createOsRegister = async () => {
        try{
            await axios.post(`http://192.168.0.10:4000/api/os/create`, this.createOsObject())
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

    componentDidMount = async () => {
        const id = await AsyncStorage.getItem('user')
        try {
            await axios.post("http://192.168.0.10:4000/api/cliente/usuario", { idUsuario: id })
                .then(response => this.getVeiculos(response.data.id))
        } catch (err) {
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }

    getVeiculos = async (id) => {
        await axios.get(`http://192.168.0.10:4000/api/cliente/${id}/veiculos`)
            .then(response => this.setState({ pickerSection: response.data }))
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
        const name = navigation.getParam('name', 'oficina_name');
        const endereco = navigation.getParam('endereco', "endereço");
        const oficina =  navigation.getParam('id', 0);
        let datePicker = null

        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS mode='time' date={this.state.date} minimumDate={this.state.date}
                onDateChange={date => this.setState({ date })} />
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.showDateTimePicker} style={{ paddingLeft: 60, width: '100%' }}>
                    <Text style={{ fontSize: 20, paddingRight: 20 }}>{this.state.agendamentoLabel}</Text>
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
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: 35, fontFamily: 'roboto', color: defaultStyle.colors.textOnPrimary, }}>AGENDAMENTO</Text>
                    </View>
                </LinearGradient>
                <ScrollView >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width }}>
                        <View style={{ alignItems: 'center', padding: 10, marginTop: 5}}>
                            <TouchableOpacity style={styles.problemComponent} onPress={() => this.props.navigation.navigate("TypeProblem", {
                                oficina: oficina
                            })}>
                                <Text style={{color: '#000', textAlign: 'center'}}>Selecione o problema do veículo</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {this.state.typeProb != 0 ?
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#fff', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <View style={{ justifyContent: 'flex-start', marginTop: 10, borderTopRightRadius: 10, width: width, marginLeft: 20 }}>
                                <Text style={{ fontSize: 28, fontFamily: 'bebas', marginLeft: 10, color: '#0b111f' }}>{name}</Text>
                                <Text style={{ fontSize: 15, marginLeft: 30 }}>{endereco}}</Text>
                                <Text style={{ fontSize: 15, marginLeft: 30 }}>Contato</Text>
                                <Icon
                                    name='md-navigate'
                                    size={15}
                                    color='#1a237e'
                                    style={{ position: 'absolute', marginLeft: 15, marginTop: 35 }}
                                />
                                <Icon
                                    name='md-call'
                                    size={15}
                                    color='#1a237e'
                                    style={{ position: 'absolute', marginLeft: 15, marginTop: 58 }}
                                />
                            </View>

                            <View style={[styles.infoContainer, { marginTop: 20 }]}>
                                <Icon
                                    name='md-alarm'
                                    size={30}
                                    color='#0b111f'
                                    style={{ marginLeft: 16 }}
                                />
                                {datePicker}
                            </View>
                            <View style={styles.infoContainer}>
                                <Icon
                                    name='md-alert'
                                    color='#0b111f'
                                    size={30}
                                    style={{ marginRight: 15 }}
                                />
                                <TextInput
                                    style={[styles.input]}
                                    placeholder="Detalhe o problema do veículo"
                                    autoCorrect={false}
                                    maxLength={150}
                                    multiline={true}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    value={this.state.carProblem}
                                    onChangeText={problem => this.setState({ carProblem: problem })}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width }}>
                                <Icon
                                    name='md-car'
                                    color='#0b111f'
                                    size={30}
                                />
                                <View style={{ width: '70%', marginRight: 20 }}>
                                    <Dropdown
                                        label='Seu carro'
                                        data={this.state.data}
                                    />
                                </View>

                            </View>

                            <View style={{ alignItems: 'center', padding: 10, marginTop: 10}}>
                                <TouchableOpacity style={styles.buttonAgendar} onPress={() => this.schedule()}>
                                    <Text style={styles.textButton}>Agendar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                        }
                </ScrollView>
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

    input: {
        width: "80%",
    },

    infoContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        margin: 15,
        marginHorizontal: 20,
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
    }
})