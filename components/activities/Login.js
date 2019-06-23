import React, { Component } from 'react';
import { validateEmail, checkBlankCamps, validBlankCamps} from '../../busnisses/Validation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../styles/Default'

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        errorMSG: ''
    };

    saveDataStorage = (token, id) => {
        try{
            AsyncStorage.setItem('userToken', token)
            AsyncStorage.setItem('user', JSON.stringify(id))
        }catch(error){
            alert('Não foi possível salvar o usuário no armazenamento interno')
        }
        
    }
    
    active = async() => {
        const id = await AsyncStorage.getItem('user')
        try{
            await axios.put(`http://192.168.0.10:4000/api/usuario/enable/${id}`)
                .then(alert("Usuário reativado"))
        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente." + err)
            return null
        }
    }

    activeAlert = () => {
        Alert.alert(
            'Mensagem',
            'Voce deseja reativar sua conta?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => {
                this.active()
            }},],
            {cancelable: false},
        );
    }

    GetUserByLogin = async () => {
        try{
            await axios.post("http://192.168.0.10:4000/api/usuario/login", 
            { login: this.state.username, email:this.state.username, senha: this.state.password })
            .then(response => { alert(response.status)
                if(response.status == 200){
                    this.saveDataStorage(response.data.token, response.data.user.id)
                    this.props.navigation.navigate('DrawerNavigatorClient')
                }
                if(response.status == 400) {
                    this.activeAlert()
                } 
            })
        }catch(error){
            alert("Usuário inválido")
        }
        
        }
    
    
    blankCamps() {
        let blank = "\nCampo(s) em branco:\n", getToken 
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
        console.log(this.state.password + " ESTAGIO 2 ")
        this.GetUserByLogin()
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
                    placeholder="Digite seu email ou login."
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
                    onPress={() => this.props.navigation.navigate('RegisterUser', {
                        client: true
                    })}>
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
        backgroundColor: defaultStyles.colors.primaryColor,
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
        color: "#0b111f",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
})