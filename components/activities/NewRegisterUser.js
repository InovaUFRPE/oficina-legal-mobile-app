import React, { Component } from 'react';
import { ConfirmPassword, validateCPF, validateEmail, ValidateCEP } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getApiUrl } from '../../service/api'
import { TextInput } from 'react-native-paper'
import defaultStyle from '../styles/Default'
import { TextInputMask } from 'react-native-masked-text'
import Icon from 'react-native-vector-icons/Ionicons'
import { FloatingAction } from "react-native-floating-action"

const baseURL = getApiUrl();

const { width, height } = Dimensions.get('window')

console.disableYellowBox = true;
export default class RegisterUser extends Component {

    state = {
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
        anyError: false,
        secureText: true
    }

    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }

    errorField = {
        name: false,
        errorNameMessage: '',
        email: false,
        errorEmailMessage: '',
        password: false,
        errorPasswordMessage: '',
        cpf: false,
        errorCpfMessage: '',
    }

    saveDataStorage = (client, mechanic) => {
        console.log(client)
        console.log(mechanic)
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
            console.log('Erro: ' + error)
            alert('Não foi possível salvar o usuário no armazenamento interno')
        }
    }

    createUserRequisition = (tipo) => {
        const user = {
            email: this.state.email,
            senha: this.state.password,
            ativo: 1 // Mudar para a variavel 'tipo'
        }
        return user
    }

    createClientRequisition = () => {
        let user = this.createUserRequisition(true);
        user.nome = this.state.name;
        user.cpf = this.state.cpf

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
                .then(client => (JSON.stringify(client.data))
                .then(this.props.navigation.navigate('Home', {email: this.state.email}))
    
                /* this.saveDataStorage(client.data, false) */)
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
        if (!this.checkBlankCamps(Mechanic, Client)) {
            Alert.alert("Erro", this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        else if (this.VerifyErrors()) {
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
        if (!validateCPF(this.state.cpf)) { this.errors.str2 += "\n- Insira um CPF válido." }
        if (!validateEmail(this.state.email)) { this.errors.str2 += "\n- Insira um email válido." }
        if (this.checkBclient) {
            if (!ValidateCEP(this.state.cep)) {
                this.errors.str2 += "\n- Insira um CEP válido."
            }
        }
        if (this.errors.str2 == "\nErro(s)\n") return true
    }

    verificar(Mechanic, Client) {
        if (this.isAnyFieldEmpty()) {
            this.setState({ anyError: true })
        } else if (this.validateFields()) {
            this.state.cpf = this.apenasNumeros(this.state.cpf)
            console.log('CPF PARA VALIDAÇÃO:-' + this.state.cpf + '-')
            this.GetCpf(Mechanic, Client)
        }
    }

    validateFields() {
        ('Validando')
        console.log(this.state.cpf)
        if (!validateCPF(this.state.cpf)) {
            this.errorField.cpf = true
            alert('CPF Inválido')
            return false
        }
        if (!validateEmail(this.state.email)) {
            this.errorField.email = true
            alert('E-mail inválido')
            return false
        } else {
            return true
        }
    }

    apenasNumeros(string) {
        return parseInt(string.split(/\D+/).join(""), 10)
    }

    isAnyFieldEmpty() {
        const erro = this.errorField
        var localErro = false
        if (this.state.name === '') {
            localErro = true
            erro.name = true
            erro.errorNameMessage = 'Insira seu nome'
        }
        if (this.state.email === '') {
            localErro = true
            erro.email = true
            erro.errorEmailMessage = 'Insira um e-mail válido'
        }
        if (this.state.password === '') {
            localErro = true
            erro.password = true
            erro.errorPasswordMessage = 'Insira uma senha válida'
        }
        if (this.state.cpf === '') {
            localErro = true
            erro.cpf = true
            erro.errorCpfMessage = 'Insira um CPF válido'
        }
        if (localErro === true) {
            return true
        } else {
            this.state.name = this.state.name.trim(),
                this.state.email = this.state.email.trim(),
                this.state.password = this.state.password.trim(),

                console.log(this.state)
            return false
        }
    }

    handleSecureView = () => {
        this.setState({
            secureText: !this.state.secureText
        })
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


    render() {
        const Mechanic = this.props.navigation.getParam('mechanic', false);
        const Client = this.props.navigation.getParam('client', false);
        console.log('Mecanico: ', Mechanic, 'Ciente: ', Client)
        return (
            <View
                style={styles.container}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 0, left: 0, padding: 15 }}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Icon
                        name='ios-arrow-back'
                        size={25}
                        color={defaultStyle.darkColor}
                    />
                </TouchableOpacity>
                <View paddingTop={20}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.headerTitle}>Registro</Text>
                            <Text style={styles.headerTitle}>Oficina Legal</Text>
                        </View>
                        {Client
                            ? <View style={{ marginTop: 20, width: width - 60 }}>
                                <TextInput
                                    autoCapitalize='words'
                                    style={styles.input}
                                    label='Nome'
                                    textContentType='name'
                                    underlineColor={defaultStyle.darkColor}
                                    selectionColor={'black'}
                                    mode='outlined'
                                    placeholder={this.errorField.errorNameMessage}
                                    error={this.errorField.name}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                />

                                <TextInput
                                    style={styles.input}
                                    label='E-mail'
                                    underlineColor={defaultStyle.darkColor}
                                    selectionColor={'black'}
                                    mode='outlined'
                                    autoCapitalize='none'
                                    textContentType='emailAddress'
                                    placeholder={this.errorField.errorEmailMessage}
                                    error={this.errorField.email}
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                />

                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        style={[styles.input, { width: '85%' }]}
                                        label='Senha'
                                        underlineColor={defaultStyle.darkColor}
                                        selectionColor={'black'}
                                        mode='outlined'
                                        secureTextEntry={this.state.secureText}
                                        placeholder={this.errorField.errorPasswordMessage}
                                        error={this.errorField.password}
                                        value={this.state.password}
                                        onChangeText={password => this.setState({ password })}
                                    />
                                    <TouchableOpacity
                                        style={{ position: 'relative', right: 0, marginTop: 40, marginLeft: 5 }}
                                        onPress={() => this.handleSecureView()}
                                    >
                                        <Icon
                                            name={
                                                this.state.secureText
                                                    ? 'md-eye'
                                                    : 'md-eye-off'
                                            }
                                            size={30}
                                            color={defaultStyle.primaryColor}
                                        />
                                    </TouchableOpacity>
                                </View>


                                <TextInput
                                    style={styles.input}
                                    label='CPF'
                                    underlineColor={defaultStyle.darkColor}
                                    selectionColor={defaultStyle.darkColor}
                                    mode='outlined'
                                    placeholder={this.errorField.errorCpfMessage}
                                    error={this.errorField.cpf}
                                    value={this.state.cpf}
                                    onChangeText={cpf => this.setState({ cpf })}
                                    render={props =>
                                        <TextInputMask
                                            {...props}
                                            type={'cpf'}
                                        />
                                    }
                                />
                                <View style={{ alignItems: 'center', marginTop: 50 }}>
                                    {
                                        this.state.anyError
                                            ? <Text style={{ color: 'red', marginBottom: 10 }}>Há campos inválidos</Text>
                                            : null
                                    }

                                    <TouchableOpacity
                                        style={styles.registerButton}
                                        onPress={() => this.verificar(Mechanic, Client)}>
                                        <Text style={styles.buttonText}>REGISTRAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={{ marginTop: 20, width: width - 80 }}>
                                <ScrollView showsVerticalScrollIndicator={false}>

                                    <TextInput label='Nome'
                                        mode='outlined'
                                        style={styles.input}
                                        value={this.state.name}
                                        returnKeyType="next"
                                        ref={(input) => this.nameInput = input}
                                        onChangeText={name => this.setState({ name })}
                                        onSubmitEditing={() => this.emailInput.focus()} />

                                    <TextInput label='E-mail'
                                        mode='outlined'
                                        style={styles.input}
                                        value={this.state.email}
                                        returnKeyType="next"
                                        keyboardType='email-address'
                                        onChangeText={email => this.setState({ email })}
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                        ref={(input) => this.emailInput = input} />

                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={[styles.input, { width: '90%' }]}
                                            label='Senha'
                                            underlineColor={defaultStyle.darkColor}
                                            selectionColor={'black'}
                                            mode='outlined'
                                            secureTextEntry={this.state.secureText}
                                            placeholder={this.errorField.errorPasswordMessage}
                                            error={this.errorField.password}
                                            value={this.state.password}
                                            onChangeText={password => this.setState({ password })}
                                        />
                                        <TouchableOpacity
                                            style={{ position: 'relative', right: 0, marginTop: 40, marginLeft: 5 }}
                                            onPress={() => this.handleSecureView()}
                                        >
                                            <Icon
                                                name={
                                                    this.state.secureText
                                                        ? 'md-eye'
                                                        : 'md-eye-off'
                                                }
                                                size={30}
                                                color={defaultStyle.primaryColor}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput label='CPF'
                                        mode='outlined'
                                        style={styles.input}
                                        value={this.state.cpf}
                                        maxLength={11}
                                        returnKeyType="next"
                                        keyboardType='numeric'
                                        onChangeText={cpf => this.setState({ cpf })}
                                        ref={(input) => this.cpfInput = input}
                                        maxLength={11}
                                        onSubmitEditing={() => this.HyperlinkInput.focus()} />

                                    <TextInput label='Link de seu curriculo'
                                        mode='outlined'
                                        style={styles.input}
                                        value={this.state.link}
                                        returnKeyType="next"
                                        onChangeText={link => this.setState({ link })}
                                        ref={(input) => this.HyperlinkInput = input} />

                                    <TouchableOpacity onPress={() => this.Verify(true, false)}
                                        style={styles.buttonRegister}>
                                        <Text style={styles.buttonRegisterText}>Seguir</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        }


                    </ScrollView>
                </View>
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
    headerTitle: {
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 30,
        letterSpacing: 2,
        color: 'black'
    },

    input: {
        height: 70,
        marginTop: 20
    },

    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: defaultStyle.colors.primaryColor,
        borderRadius: 5,
        width: '100%'
    },

    buttonText: {
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        letterSpacing: 2,
        color: '#fff',
        padding: 15,
    }
})