import React, { Component } from 'react';
import { ConfirmPassword, validateCPF, validateEmail, ValidateCEP } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-paper'
import defaultStyle from '../styles/Default'
import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-community/async-storage';
import { getApiUrl } from '../../service/api'
import Icon from 'react-native-vector-icons/Ionicons'



const baseURL = getApiUrl();

const { width, height } = Dimensions.get('window')

export default class RegisterUser extends Component {

    state = {
        adress: {
            adress: '',
            city: '',
            district: '',
            state: '',
        },
        login: '',
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: '',
        street: '',
        cep: '',
        complement: '',
        neighborhood: '',
        link: '',
        errorMSG: '',

    }

    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }


    //http://apps.widenet.com.br/busca-cep/api/cep/06233-030.json


    saveDataStorage = (client, mechanic) => {
        try {
            if (client) {
                AsyncStorage.setItem('user', JSON.stringify(client.idUsuario))
                AsyncStorage.setItem('client', JSON.stringify(client))
                this.props.navigation.navigate('Home')
            }
            else {
                AsyncStorage.setItem('user', JSON.stringify(mechanic.idUsuario))
                AsyncStorage.setItem('mechanic', JSON.stringify(mechanic))
                alert("Mecânico cadastrado com sucesso")
                this.props.navigation.navigate('LoginMechanic')
            }
        } catch (error) {
            alert('Não foi possível salvar o usuário no armazenamento interno')
        }
    }

    createUserRequisition = (tipo) => {
        const user = {
            login: this.state.login.trim(),
            email: this.state.email.trim(),
            senha: this.state.password.trim(),
            ativo: 1 // Mudar para a variavel 'tipo'
        }
        return user
    }

    createClientRequisition = () => {
        let user = this.createUserRequisition(true);
        user.nome = this.state.name.trim();
        user.cpf = this.state.cpf.trim();
        user.bairro = this.state.neighborhood.trim();
        user.cep = this.state.cep.trim();
        user.endereco = this.state.street.trim();
        user.complemento = this.state.complement.trim();

        return user
    }

    createMechanicRequisition = () => {
        let user = this.createUserRequisition(false);
        user.nome = this.state.name.trim();
        user.curriculo = this.state.link.trim()
        user.cpf = this.state.cpf.trim()
        return user
    }

    GetCpf = async (mechanic, client) => {
        try {
            await axios.post(`${baseURL}/api/usuario/cpf`, { cpf: this.state.cpf })
                .then(response => {
                    if (response.status == 201) {
                        alert("Já existe um cliente cadastrado com esse cpf.")
                        return null
                    }
                })

        } catch (err) {
            if (client) {
                this.PostClient()
            } else if (mechanic) {
                this.PostMechanic()
            }
        }
    }

    getUserIdAndToken = async (client) => {
        const user = {
            email: this.state.email.trim(),
            senha: this.state.password.trim(),
            login: this.state.login.trim(),
        }
        try {
            await axios.post(`${baseURL}/api/usuario/login`, user)
                .then(response => this.saveDataStorage(response.data.token, response.data.user.id, client))
        } catch (err) {
            alert("Não foi possível retornar o usuário")
        }
    }

    PostClient = () => {
        try {
            axios.post(`${baseURL}/api/cliente/register`, this.createClientRequisition())
                .then(client => this.saveDataStorage(client.data, false))
        } catch (err) {
            alert("Não foi possível salvar o usuário")
        }
    }

    PostMechanic = () => {
        try {
            axios.post(`${baseURL}/api/mecanico/create`, this.createMechanicRequisition())
                .then(mechanic => this.saveDataStorage(false, mechanic.data))
        } catch (err) {
            alert("Não foi possível salvar o usuário")
        }
    }

    Verify(Mechanic, Client) {
        this.state.cpf = this.state.cpf.replace(/[^\d]+/g, '')
        if (!this.checkBlankCamps(Mechanic, Client)) {
            Alert.alert("Erro", this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        else if (this.VerifyErrors()) {
            this.state.login = (this.state.login).trim()
            this.state.email = (this.state.email).trim()
            this.state.password = (this.state.password).trim()
            this.GetCpf(Mechanic, Client)
        } else {
            alert(this.errors.str2)
            this.errors.str2 = "\nErro(s)\n"
            return
        }

    }

    VerifyErrors() {
        if (!ConfirmPassword(this.state.password, this.state.confirmPassword)) { this.errors.str2 += "\n- As senhas não conferem." }
        /* if(ConfirmPassword(this.state.password, this.state.confirmPassword)){ 
            if(this.state.password.length < 6){
                this.errors.str2 += "\n- Sua senha deve ter pelo menos 6 caracteres"
            }
        } */
        if (!validateCPF(this.state.cpf.trim())) { this.errors.str2 += "\n- Insira um CPF válido." }
        if (!validateEmail(this.state.email.trim())) { this.errors.str2 += "\n- Insira um email válido." }
        if (this.checkBclient) {
            if (!ValidateCEP(this.state.cep.trim())) {
                this.errors.str2 += "\n- Insira um CEP válido."
            }
        }
        if (this.errors.str2 == "\nErro(s)\n") return true
    }

    checkBlankCamps() {
        if (this.state.login == "") { this.errors.str += "\n- Login" }
        if (this.state.name == "") { this.errors.str += "\n- Nome" }
        if (this.state.cpf == "") { this.errors.str += "\n- CPF" }
        if (this.state.email == "") { this.errors.str += "\n- Email" }
        if (this.state.password == "") { this.errors.str += "\n- Senha" }
        if (this.state.confirmPassword == "") { this.errors.str += "\n- Confirmar senha" }
        if (this.state.checkBclient) {
            if (this.state.cep == "") { this.errors.str += "\n- CEP" }
            if (this.state.street == "") { this.errors.str += "\n- Logradouro" }
            if (this.state.neighborhood == "") { this.errors.str += "\n- Bairro" }
        }
        if (this.state.checkBMechanic) {
            if (this.state.link == "") { this.errors.str += "\n- Link do curriculo" }
        }
        if (this.errors.str == "\nCampo(s) em branco:\n") return true
    }

    getAdress(CEP) {
        let url = 'http://apps.widenet.com.br/busca-cep/api/cep/' + CEP + '.json';
        fetch(url)
            .then(res => res.json())
            .then((out) => {
                this.setState({
                    street: out.address,
                    neighborhood: out.district,
                })
            })
            .catch(err => { throw err });
    }



    render() {
        const Mechanic = this.props.navigation.getParam('mechanic', false);
        const Client = this.props.navigation.getParam('client', false);
        let cepLeght = this.state.cep.length
        if (cepLeght === 9) {
            this.getAdress(this.state.cep)
        }
        return (
            <View
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                {Client ?
                    <View paddingTop={20}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-person'
                                        size={30}
                                        color={defaultStyle.colors.primaryColor}
                                    />
                                </View>
                                <TextInput placeholder='Login'
                                    tintColor={"black"}
                                    label='Usuario'
                                    autoCapitalize='none'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.login}
                                    returnKeyType="next"
                                    onChangeText={login => this.setState({ login })}
                                    onSubmitEditing={() => this.nameInput.focus()} />
                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-person'
                                        size={30}
                                        color={'transparent'}
                                    />
                                </View>
                                <TextInput placeholder='Nome'
                                    label='Nome'
                                    style={[styles.input, { marginLeft: 20 }]}
                                    returnKeyType="next"
                                    autoCapitalize='words'
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    ref={(input) => this.nameInput = input}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })} />
                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-person'
                                        size={30}
                                        color={'transparent'}
                                    />
                                </View>
                                <TextInput
                                    placeholder='CPF'
                                    label='CPF'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.cpf}
                                    returnKeyType="next"
                                    keyboardType='numeric'
                                    onChangeText={cpf => this.setState({ cpf })}
                                    ref={(input) => this.cpfInput = input}
                                    render={props =>
                                        <TextInputMask
                                            {...props}
                                            type={'cpf'}
                                        />
                                    }
                                    onSubmitEditing={() => this.emailInput.focus()} />

                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-mail'
                                        size={25}
                                        color={defaultStyle.colors.primaryColor}
                                    />
                                </View>
                                <TextInput placeholder='E-mail'
                                    label='E-mail'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.email}
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                    keyboardType='email-address'
                                    onChangeText={email => this.setState({ email })}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    ref={(input) => this.emailInput = input} />
                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-unlock'
                                        size={30}
                                        color={defaultStyle.colors.primaryColor}
                                    />
                                </View>
                                <TextInput placeholder='Senha'
                                    label='Senha'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.password}
                                    returnKeyType="next"
                                    secureTextEntry={true}
                                    onChangeText={password => this.setState({ password })}
                                    onSubmitEditing={() => this.confirmPasswordInput.focus()}
                                    ref={(input) => this.passwordInput = input} />
                            </View>


                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-unlock'
                                        size={25}
                                        color={'transparent'}
                                    />
                                </View>
                                <TextInput placeholder='Confirmar Senha'
                                    label='Confirmar Senha'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.confirmPassword}
                                    returnKeyType="go"
                                    secureTextEntry={true}
                                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                    ref={(input) => this.confirmPasswordInput = input} />
                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-compass'
                                        size={25}
                                        color={defaultStyle.colors.primaryColor}
                                    />
                                </View>
                                <TextInput placeholder='CEP'
                                    label='CEP'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.cep}
                                    returnKeyType="next"
                                    keyboardType='numeric'
                                    onChangeText={cep => this.setState({ cep })}
                                    ref={(input) => this.cepInput = input}
                                    render={props =>
                                        <TextInputMask
                                            {...props}
                                            type={'zip-code'}
                                        />
                                    }
                                    onSubmitEditing={() => this.streetInput.focus()} />
                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-compass'
                                        size={25}
                                        color={'transparent'}
                                    />
                                </View>
                                <TextInput placeholder='Endereço'
                                    label='Endereço'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.street}
                                    returnKeyType="next"
                                    ref={(input) => this.streetInput = input}
                                    onChangeText={street => this.setState({ street })}
                                    onSubmitEditing={() => this.neighborhoodInput.focus()} />

                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-compass'
                                        size={25}
                                        color={'transparent'}
                                    />
                                </View>
                                <TextInput placeholder='Bairro'
                                    label='Bairro' style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.neighborhood}
                                    returnKeyType="go"
                                    onChangeText={neighborhood => this.setState({ neighborhood })}
                                    ref={(input) => this.neighborhoodInput = input}
                                    onSubmitEditing={() => this.complementInput.focus()} />

                            </View>

                            <View style={{ marginVertical: 10, width: width - 80, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name='md-compass'
                                        size={25}
                                        color={'transparent'}
                                    />
                                </View>
                                <TextInput placeholder='Complemento (Opcional)'
                                    label='Complemento (Opcional)'
                                    style={styles.input}
                                    underlineColor={defaultStyle.colors.primaryColor}
                                    value={this.state.complement}
                                    returnKeyType="next"
                                    onChangeText={complement => this.setState({ complement })}
                                    ref={(input) => this.complementInput = input} />

                            </View>


                            <TouchableOpacity onPress={() => this.Verify(false, true)}
                                style={styles.buttonRegister}>
                                <Text style={styles.buttonRegisterText}>Seguir</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    :
                    null
                }

                {Mechanic ?
                    <View paddingTop={20}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TextInput placeholder='Login'
                                tintColor={"black"}
                                label='Usuario'
                                style={styles.input}
                                value={this.state.login}
                                returnKeyType="next"
                                onChangeText={login => this.setState({ login })}
                                onSubmitEditing={() => this.nameInput.focus()} />

                            <TextInput placeholder='Nome'
                                label='Usuario'
                                style={styles.input}
                                value={this.state.name}
                                returnKeyType="next"
                                ref={(input) => this.nameInput = input}
                                onChangeText={name => this.setState({ name })}
                                onSubmitEditing={() => this.cpfInput.focus()} />

                            <TextInput placeholder='CPF'
                                label='Usuario'
                                style={styles.input}
                                value={this.state.cpf}
                                maxLength={11}
                                returnKeyType="next"
                                keyboardType='numeric'
                                onChangeText={cpf => this.setState({ cpf })}
                                ref={(input) => this.cpfInput = input}
                                maxLength={11}
                                onSubmitEditing={() => this.emailInput.focus()} />

                            <TextInput placeholder='E-mail'
                                label='Usuario'
                                style={styles.input}
                                value={this.state.email}
                                returnKeyType="next"
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                ref={(input) => this.emailInput = input} />

                            <TextInput placeholder='Senha'
                                label='Usuario' style={styles.input}
                                value={this.state.password}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                                ref={(input) => this.passwordInput = input} />

                            <TextInput placeholder='Confirmar Senha'
                                label='Usuario'
                                style={styles.input}
                                value={this.state.confirmPassword}
                                returnKeyType="go"
                                label='Usuario'
                                secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                onSubmitEditing={() => this.HyperlinkInput.focus()}
                                ref={(input) => this.confirmPasswordInput = input} />

                            <TextInput placeholder='Link de seu curriculo'
                                label='Usuario'
                                style={styles.input}
                                value={this.state.link}
                                returnKeyType="next"
                                onChangeText={link => this.setState({ link })}
                                ref={(input) => this.HyperlinkInput = input} />
                            <TouchableOpacity onPress={() => this.Verify(true, false)}
                                style={styles.buttonRegister}>
                                <Text style={styles.buttonRegisterText}>Registrar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    :
                    null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5F5F5",
    },

    header: {
        color: 'white',
        fontSize: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
    },

    input: {
        marginLeft: 20,
        borderRadius: 5,
        height: 70,
        width: '85%',
        backgroundColor: '#FFF',
        fontSize: 16
    },

    buttonRegister: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#2250d9",
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },

    buttonRegisterText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    }
})