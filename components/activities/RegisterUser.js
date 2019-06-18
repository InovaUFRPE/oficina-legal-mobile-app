import React, { Component } from 'react';
import { ConfirmPassword, validateCPF, validateEmail, ValidateCEP } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


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
    }

    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }

    saveDataStorage = (user) => {
        try {
            AsyncStorage.setItem('user', JSON.stringify(user))
                .then(this.props.navigation.navigate('RegisterVehicle'))
        } catch (error) {
            alert('Não foi possível salvar o usuário no armazenamento interno')
        }
    }

    createUserRequisition = (tipo) => {
        const user = {
            login: this.state.login.trim(),
            email: this.state.email.trim(),
            senha: this.state.password.trim(),
            ativo: tipo
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
            await axios.post("http://192.168.0.10:4000/api/usuario/cpf", { cpf: this.state.cpf })
                .then(response => {
                    if (response.status == 201) {
                        alert("Já existe um cliente cadastrado com esse cpf.")
                        return null
                    }
                })

        } catch (err) {
            if(client){
                this.PostClient()
                this.saveDataStorage(this.createClientRequisition())
            }else if(mechanic){
                this.PostMechanic()
                this.saveDataStorage(this.createClientRequisition())
            }
        }
    }

    PostClient = async () => {
        try {
            await axios.post("http://192.168.0.10:4000/api/cliente/register", this.createClientRequisition())
        } catch (err) {
            alert("Não foi possível salvar o usuário")
        }
    }

    PostMechanic = async () => {
        try {
            await axios.post("http://192.168.0.10:4000/api/mecanico/create", this.createMechanicRequisition())
        } catch (err) {
            alert("Não foi possível salvar o usuário")
        }
    }

    Verify() {
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
    render() {
        const Mechanic = this.props.navigation.getParam('mechanic', false);
        const Client = this.props.navigation.getParam('client', false);
        return (
            <View
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                {Client ?
                    <View paddingTop={50}>
                        <ScrollView>
                            <TextInput placeholder='Login'
                                tintColor={"black"}
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.login}
                                returnKeyType="next"
                                onChangeText={login => this.setState({ login })}
                                onSubmitEditing={() => this.nameInput.focus()} />

                            <TextInput placeholder='Nome'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.name}
                                returnKeyType="next"
                                ref={(input) => this.nameInput = input}
                                onChangeText={name => this.setState({ name })}
                                onSubmitEditing={() => this.cpfInput.focus()} />

                            <TextInput placeholder='CPF'
                                placeholderTextColor="grey"
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
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.email}
                                returnKeyType="next"
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                ref={(input) => this.emailInput = input} />

                            <TextInput placeholder='Senha'
                                placeholderTextColor="grey" style={styles.input}
                                value={this.state.password}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                                ref={(input) => this.passwordInput = input} />

                            <TextInput placeholder='Confirmar Senha'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.confirmPassword}
                                returnKeyType="go"
                                placeholderTextColor="grey"
                                secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                onSubmitEditing={() => this.cepInput.focus()}
                                ref={(input) => this.confirmPasswordInput = input} />
                            <TextInput placeholder='CEP'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.cep}
                                maxLength={8}
                                returnKeyType="next"
                                keyboardType='numeric'
                                onChangeText={cep => this.setState({ cep })}
                                ref={(input) => this.cepInput = input}
                                onSubmitEditing={() => this.streetInput.focus()} />
                            <TextInput placeholder='Logradouro'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.street}
                                returnKeyType="next"
                                ref={(input) => this.streetInput = input}
                                onChangeText={street => this.setState({ street })}
                                onSubmitEditing={() => this.neighborhoodInput.focus()} />
                            <TextInput placeholder='Bairro'
                                placeholderTextColor="grey" style={styles.input}
                                value={this.state.neighborhood}
                                returnKeyType="go"
                                onChangeText={neighborhood => this.setState({ neighborhood })}
                                ref={(input) => this.neighborhoodInput = input}
                                onSubmitEditing={() => this.complementInput.focus()} />
                            <TextInput placeholder='Complemento (Opcional)'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.complement}
                                returnKeyType="next"
                                onChangeText={complement => this.setState({ complement })}
                                ref={(input) => this.complementInput = input} />
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
                    <View paddingTop={50}>
                        <ScrollView>
                            <TextInput placeholder='Login'
                                tintColor={"black"}
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.login}
                                returnKeyType="next"
                                onChangeText={login => this.setState({ login })}
                                onSubmitEditing={() => this.nameInput.focus()} />

                            <TextInput placeholder='Nome'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.name}
                                returnKeyType="next"
                                ref={(input) => this.nameInput = input}
                                onChangeText={name => this.setState({ name })}
                                onSubmitEditing={() => this.cpfInput.focus()} />

                            <TextInput placeholder='CPF'
                                placeholderTextColor="grey"
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
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.email}
                                returnKeyType="next"
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                ref={(input) => this.emailInput = input} />

                            <TextInput placeholder='Senha'
                                placeholderTextColor="grey" style={styles.input}
                                value={this.state.password}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                                ref={(input) => this.passwordInput = input} />

                            <TextInput placeholder='Confirmar Senha'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.confirmPassword}
                                returnKeyType="go"
                                placeholderTextColor="grey"
                                secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                onSubmitEditing={() => this.cepInput.focus()}
                                ref={(input) => this.confirmPasswordInput = input} />
                            <TextInput placeholder='Link de seu curriculo'
                                placeholderTextColor="grey"
                                style={styles.input}
                                value={this.state.link}
                                returnKeyType="next"
                                onChangeText={link => this.setState({ link })}
                                ref={(input) => this.HyperlinkInput = input}
                                onSubmitEditing={() => this.descriptionInput.focus()} />
                            <TouchableOpacity onPress={() => this.Verify(true, false)}
                                style={styles.buttonRegister}>
                                <Text style={styles.buttonRegisterText}>Seguir</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        width: 300,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
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