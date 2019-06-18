import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, View, ImageBackground, DatePickerAndroid, DatePickerIOS, Platform, TouchableOpacity, TextInput, ScrollView, Image, Picker } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import imageOficina from '../../images/Oficina.jpg'
import DateTimePicker from 'react-native-modal-datetime-picker'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = { desc: '', date: null, workShopInformation: [{ name: '', adress: '', phoneNumber: '' }], pickerSection: '', agendamentoLabel: 'Escolha o melhor horário para você' }

export default class Agendamento extends Component {
    state = {
        ...initialState,
        isDateTimePickerVisible: false,
        carId: '',
        carProblem: '',
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

    schedule = async () =>{
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
                    <Text style={{ fontSize: 20, paddingRight: 20}}>{this.state.agendamentoLabel}</Text>
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

                <ImageBackground
                    source={imageOficina}
                    style={styles.background}>
                    <Icon
                        name="md-arrow-back"
                        size={30}
                        color='blue'
                        style={{padding: 15}}
                        onPress={() => {this.props.navigation.goBack()}}
                    />
                    <View style={styles.titleBar}>
                        <Image
                            source={require('../../images/profileWorkShop.png')}
                            style={styles.image} />
                    </View>
                </ImageBackground>
                <ScrollView style={{ width: '100%' }}>

                    <View style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>{name}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 30 }}>{endereco}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 30 }}>3339-2210</Text>
                        <Icon
                            name='md-navigate'
                            size={15}
                            style={{ position: 'absolute', marginLeft: 15, marginTop: 35 }}
                        />
                        <Icon
                            name='md-call'
                            size={15}
                            style={{ position: 'absolute', marginLeft: 15, marginTop: 58 }}
                        />
                    </View>

                    <View style={[styles.infoContainer, { height: 70, marginTop: 20 }]}>
                        <Icon
                            name='md-alarm'
                            size={30}
                            style={{ marginLeft: 25 }}
                        />
                        {datePicker}
                    </View>

                    <View style={styles.infoContainer}>
                        <Icon
                            name='md-alert'
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

                    <View style={styles.infoContainer}>
                        <Icon
                            name='md-car'
                            size={30}
                            style={{ paddingRight: 5 }}
                        />

                        <Picker
                            selectedValue={this.state.pickerSection}
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => this.setState({ pickerSection: itemValue })}
                        >

                            <Picker.Item label='SIENA' value='10' onPress={() => this.setState({carId: 10 })}/>
                            <Picker.Item label='FOX' value='11' onPress={() => this.setState({carId: 11 })}/>
                        </Picker>
                    </View>



                </ScrollView>
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
        height: 150,
        borderRadius: 100
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
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
        marginLeft: 10,
        borderWidth: 5,
        borderRadius: 100,
        borderColor: 'white'
    },

})