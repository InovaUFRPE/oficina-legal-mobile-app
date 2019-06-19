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

const initialState = { desc: '', date: null, workShopInformation: [{ name: '', adress: '', phoneNumber: '' }], pickerSection: '', agendamentoLabel: 'Escolha o melhor horário para você' }
const { width, height } = Dimensions.get('window')

export default class Agendamento extends Component {
    state = {
        ...initialState,
        isDateTimePickerVisible: false,
        carId: '',
        carProblem: '',
        data: [{
            value: 'Carro 1'
        },
        {
            value: 'Carro 2'
        }
        ]
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
        const endereco = navigation.getParam('endereco', "endereço")
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
            <View style={styles.container}>
                <LinearGradient colors={['#3949ab', '#303f9f', '#283593', '#1a237e']} style={styles.background}>
                    <Icon
                        name="md-arrow-back"
                        size={30}
                        color={defaultStyle.colors.textOnPrimary}
                        style={{ padding: 15, position: 'absolute', top: 0, left: 0 }}
                        onPress={() => { this.props.navigation.goBack() }}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: 25, color: defaultStyle.colors.textOnPrimary, fontWeight: 'bold', fontFamily: defaultStyle.roboto }}>Agendamento</Text>
                    </View>
                </LinearGradient>


                <View style={{ justifyContent: 'flex-start', marginTop: 10, borderTopRightRadius: 10, width: width }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10, color: '#0b111f' }}>{name}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 30 }}>{endereco}</Text>
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

                <View style={[styles.infoContainer, { height: 70, marginTop: 20 }]}>
                    <Icon
                        name='md-alarm'
                        size={30}
                        color='#0b111f'
                        style={{ marginLeft: 25 }}
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
                        style={[styles.input, { paddingLeft: 10 }]}
                        placeholder="Problema do veiculo"
                        autoCorrect={false}
                        multiline={true}
                        value={this.state.carProblem}
                        onChangeText={problem => this.setState({ carProblem: problem })}
                    />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width}}>
                    <Icon
                        name='md-car'
                        color='#0b111f'
                        size={30}
                        style={{ marginLeft: 7, }}
                    />
                    <View style={{width: '70%', marginRight: 20}}>
                        <Dropdown
                            label='Seu carro'
                            data={this.state.data}
                        />
                    </View>

                </View>

                <View style={{ alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity style={styles.buttonAgendar} onPress={() => this.schedule()}>
                        <Text style={styles.textButton}>Agendar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    background: {
        width: "100%",
        height: height / 3.5,
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
        borderBottomWidth: 0.5
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
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
    },
    image: {
        width: 120,
        height: 120,
    },

})