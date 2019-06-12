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
    state = {
        //Onde os objetos carro do cliente devem ser armazenados
        cars: [{
            id: Math.random(),
            model: 'Compass',
            Vplate: 'AKG-5913'
        },
        {
            id: Math.random(),
            model: 'Gol',
            Vplate: 'AKG-5913'
        },
        {
            id: Math.random(),
            model: 'S10',
            Vplate: 'AKG-5913'
        },
        {
            id: Math.random(),
            model: 'Compass',
            Vplate: 'AKG-5913'
        }],

        //Atributos do novo veiculo criado
        model: '',
        year: '',
        renavam: '',
        Vplate: '',

        isModalVisible: false
    }

    registerVeicle = () => {
        //Resgatando os dados inseridos pelo usuario

        model = this.state.model
        year = this.state.year
        renavam = this.state.renavam
        Vplate = this.state.Vplate

        /*Função para salvar no banco aqui
        
        
        */

        //Resetando os atributos
        this.setState({ model: '' })
        this.setState({ year: '' })
        this.setState({ renavam: '' })
        this.setState({ Vplate: '' })

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

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 25, paddingRight: 20, marginLeft: 20, fontWeight: 'bold', marginTop: 15 }}>
                    Aqui estão seus veículos cadastrados
                </Text>
                <View style={{ alignItems: 'center' }}>
                    <FlatList data={this.state.cars}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <ClientCarComponent {...item} />} />
                </View>


                <Modal
                    onBackButtonPress={this.toggleModal}
                    onBackdropPress={this.toggleModal}
                    animationIn='zoomIn'
                    animationOut='zoomOut'
                    isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20 }}>Cadastrar Veículo</Text>
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
                            onPress={this.registerVeicle}
                            containerStyle={{ width: width / 2, marginTop: 40 }} />
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