import React, { Component } from 'react';
import { ConfirmPassword, validateCPF, validateEmail } from '../../busnisses/Validation'
import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ClientCarComponent from '../ClientCarComponent'
import Modal from 'react-native-modal'
import { FloatingAction } from "react-native-floating-action"
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Snackbar from 'react-native-snackbar'

import { getApiUrl } from '../../service/api'

const baseURL = getApiUrl();

const { width, height } = Dimensions.get('window')

const actions = [
    {
        text: "Adicionar Veículo",
        icon: require('../../images/carIcon.png'),
        name: 'bt_addcar',
        position: 1
    }
]

export default class EditCarsClient extends Component {
    constructor(props) {
        super(props);
        this.getClient();
    }
    state = {
        //Onde os objetos carro do cliente devem ser armazenados

        cars: [],

        //Atributos do novo veiculo criado
        model: '',
        year: '',
        renavam: '',
        Vplate: '',

        isModalVisible: false
    }

    registerVehicle = async (idCliente) => {
        //Resgatando os dados inseridos pelo usuario

        const vehicle = {
            modelo: this.state.model,
            ano: this.state.year,
            renavam: this.state.renavam,
            placa: this.state.Vplate,
            Cliente: { id: idCliente }
        }

        /*Função para salvar no banco aqui */

        try {
            await axios.post(`${baseURL}/api/veiculo/add`, vehicle)
                .then(response => this.setState({ model: '', year: '', renavam: '', Vplate: '' })
                    .then(this.getVeiculos(idCliente)))

        } catch (err) {
            alert("Não foi possível salvar o veículo")
        }

        console.log(this.state.model, this.state.year, this.state.renavam, this.state.Vplate)

        this.setState({ isModalVisible: !this.state.isModalVisible })

        Snackbar.show({
            title: 'Veículo Cadastrado',
            duration: Snackbar.LENGTH_LONG,
        });
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    createVehicleRequisition = (clientId, jwt) => {
        const vehicle = {
            modelo: this.state.model,
            ano: this.state.year,
            renavam: this.state.renavam,
            placa: this.state.Vplate,
            Cliente: {
                id: clientId
            }
        }
        this.postVehicle(jwt, vehicle)
        return vehicle
    }

    postVehicle = (jwt, vehicle) => {
        axios.defaults.headers.common['x-access-token'] = jwt
        try{
            axios.post(`${baseURL}/api/veiculo/add`, vehicle)
                .then(response => { this.getClient() })
                .then( alert("Cadastro realizado com sucesso.") )
        }catch(err){
            alert("Não foi possível salvar o veículo")
        }
    }

    getUserToken = async () => {
        const client = await AsyncStorage.getItem('client');
        const id = await AsyncStorage.getItem('user');
        try{
            axios.get(`${baseURL}/api/usuario/${id}`)
                .then(response => this.createVehicleRequisition(client, response.data.token))
        }catch(err){
            alert("Não foi possível resgatar o usuário")
        }
    }

    resgister = () => {
        this.setState({ isModalVisible: false })
        this.getUserToken()
    }

    getClient = async () => {
        const id = await AsyncStorage.getItem('client')
        try {
            await axios.get(`${baseURL}/api/cliente/${id}`)
                .then(response => this.getVeiculos(response.data.id))
        } catch (err) {
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }

    getVeiculos = async (id) => {
        await axios.get(`${baseURL}/api/cliente/${id}/veiculos`)
            .then(response => this.setState({ cars: response.data }))
    }

    render() {
        return (
            <View style={styles.container}>
                
                {
                    //Condicionante de render dos carros do cliente
                    this.state.cars.length === 0
                        ?
                        <Text style={{ fontSize: 25, paddingRight: 20, marginLeft: 20, fontWeight: 'bold', marginTop: 15, textAlign: 'center' }}>
                            Você ainda não tem nenhum carro cadastrado
                            </Text>
                        :
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, paddingRight: 20, marginLeft: 20, fontWeight: 'bold', marginTop: 15, textAlign: 'center' }}>
                                Aqui estão seus veículos cadastrados
                                </Text>
                            <FlatList 
                                data={this.state.cars}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) => <ClientCarComponent {...item} />} />
                        </View>
                }

                <Modal
                    onBackButtonPress={this.toggleModal}
                    onBackdropPress={this.toggleModal}
                    animationIn='zoomIn'
                    animationOut='zoomOut'
                    isVisible={this.state.isModalVisible}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' }}>Cadastrar Veículo</Text>
                        <Input
                            inputContainerStyle={styles.inputContainer}
                            label='Modelo'
                            value={this.state.model}
                            onChangeText={model => this.setState({ model })}
                        />
                        <Input
                            inputContainerStyle={styles.inputContainer}
                            keyboardType='number-pad'
                            label='Ano'
                            value={this.state.year}
                            onChangeText={year => this.setState({ year })}
                        />
                        <Input
                            inputContainerStyle={styles.inputContainer}
                            label='Placa'
                            value={this.state.Vplate}
                            onChangeText={Vplate => this.setState({ Vplate })}
                        />
                        <Input
                            inputContainerStyle={styles.inputContainer}
                            label='Renavam'
                            keyboardType='number-pad'
                            value={this.state.renavam}
                            onChangeText={renavam => this.setState({ renavam })}
                        />

                        <Button
                            icon={
                                <Icon
                                    name='md-checkmark'
                                    size={20}
                                    color='#fff'
                                />
                            }
                            title="Registrar  "
                            iconRight
                            onPress={() => this.resgister()}
                            containerStyle={{ width: width / 2, marginTop: 20, marginBottom: 20, backgroundColor: 'blue' }} />

                    </View>

                </Modal>

                <FloatingAction
                    actions={actions}
                    position='right'
                    overlayColor='trasparent'
                    onPressItem={
                        this.toggleModal
                    }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5
    }
})