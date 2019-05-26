import React, { Component } from 'react';
import { validateEmail, checkBlankCamps, validBlankCamps, getToken } from '../../busnisses/Validation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { getUserToken } from '../../auth'

import api from '../../service/api'

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        errorMSG: ''
    };

    

    blankCamps() {
        let blank = "\nCampo(s) em branco:\n"
        blank += checkBlankCamps(this.state.username, "LOGIN")
        blank += checkBlankCamps(this.state.password, "SENHA")
        if (validBlankCamps(blank)) return validBlankCamps(blank)
        return false
    }

    isEmail() {
        if (!validateEmail(this.state.username)) { return false }
        return true
    }

   

    Verify() {
        this.state.username = this.state.username.trim()
        this.state.password = this.state.password.trim()
        console.log(this.state.password + " ESTAGIO 1 ")
        if (this.blankCamps(this.state.username, this.state.password)) { alert(this.blankCamps(this.state.username, this.state.password)); return }
        if (!this.isEmail(this.state.username)) { alert("Email inválido."); return }
        console.log(this.state.password + " ESTAGIO 2 ")
        this._signInAsync()
    }

    render() {
        console.log(this.state.password)
        return (
            <View
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                <Image
                    source={require('../../images/LogoAzulR.png')}
                    style={styles.logo}
                />

                <TextInput style={styles.input}
                    placeholder="Digite seu email."
                    keyboardType='email-address'
                    value={this.state.username}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(username) => this.setState({ username })} />



                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder="Digite sua senha."
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })} />

                <TouchableOpacity style={styles.button}
                    onPress={() => this.Verify()}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpLink}
                    onPress={() => this.props.navigation.navigate('RegisterUser')}>
                    <Text style={styles.signUpLinkText}>Criar conta grátis</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpLink}
                    onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={[styles.signUpLinkText, { fontWeight: 'normal', marginTop: 0 }]}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5F5F5"
    },

    logo: {
        width: 150,
        height: 150,
        marginBottom: 60
    },

    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16
    },

    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#2250d9",
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },

    signUpLink: {
        padding: 10,
    },

    signUpLinkText: {
        color: "#999",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
})