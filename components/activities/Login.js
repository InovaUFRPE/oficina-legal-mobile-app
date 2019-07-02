import React, { Component } from 'react';
import { validateEmail, checkBlankCamps, validBlankCamps } from '../../busnisses/Validation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { login } from '../../store/actions/user'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyles from '../styles/Default'
import { getApiUrl } from '../../service/api'

const baseURL = getApiUrl();

class Login extends Component {
    state = {
        name: 'Temporario',
        token: null,
        username: '',
        password: '',
        errorMSG: '',
        loading: false
    };



    saveDataStorage = (token, id) => {
        try {
            AsyncStorage.setItem('userToken', token)
            AsyncStorage.setItem('user', JSON.stringify(id))
        } catch (error) {
            alert('Não foi possível salvar o usuário no armazenamento interno')
        }
    }

    active = async () => {
        const id = await AsyncStorage.getItem('user')
        try {
            await axios.put(`${baseURL}/api/usuario/enable/${id}`)
                .then(alert("Usuário reativado"))
        } catch (err) {
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
                {
                    text: 'Sim', onPress: () => {
                        this.active()
                    }
                },],
            { cancelable: false },
        );
    }

    GetUserByLogin = async (obj) => {
        try {
            await axios.post(`${baseURL}/api/usuario/login`,
                obj)
                .then(response => {
                    if (response.status == 200) {
                        this.saveDataStorage(response.data.token, response.data.user.id)
                        this.props.onLogin({
                            token: response.data.token,
                            id: response.data.user.id,
                            username: this.state.username
                        })
                        this.setState({ loading: false })
                        this.props.navigation.navigate('DrawerNavigatorClient')
                    }
                    if (response.status == 400) {
                        this.setState({ loading: false })
                        this.activeAlert()
                    }
                })
        } catch (error) {
            console.log(error)
            this.setState({loading: !this.state.loading})
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
        this.setState({ loading: true })
        this.state.username = this.state.username.trim()
        this.state.password = this.state.password.trim()
        if (this.blankCamps(this.state.username, this.state.password)) { alert(this.blankCamps(this.state.username, this.state.password)); return }
        if(this.isEmail()){
            const req = {
                login: false, 
                email: this.state.username,
                senha: this.state.password
            }
            this.GetUserByLogin(req)
        }else{
            const req = { 
                login: this.state.username, 
                email: false,
                senha: this.state.password
            }
            this.GetUserByLogin(req)
        }
        
    }

    render() {
        return (
            <View
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                <Image
                    source={require('../../images/LogoAzulR.png')}
                    style={styles.logo}
                />
                {
                    this.state.loading === true
                        ?
                        <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={defaultStyles.colors.primaryColor} />
                        </View>
                        :
                        <View style={{width: '100%'}}>
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
                                onPress={() => this.props.navigation.navigate('NewRegister', {
                                    client: true
                                })}>
                                <Text style={styles.signUpLinkText}>Criar conta grátis</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.signUpLink}
                                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                <Text style={[styles.signUpLinkText, { fontWeight: 'normal', marginTop: 0 }]}>Esqueceu a senha?</Text>
                            </TouchableOpacity>
                        </View>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

//export default Login

export default connect(null, mapDispatchToProps)(Login)