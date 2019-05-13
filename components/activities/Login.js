import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {validateEmail, checkBlankCamps, validBlankCamps, getToken} from '../../busnisses/Validation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        errorMSG: '',
    };

    saveDataStorage = (data) => {
        let keyUser = getToken(25)
        let obj = {
            key: keyUser,
            id: data.idUsuario,
            username: data.email,
            password: data.senha,
        }
        try{
            AsyncStorage.setItem('userId', JSON.stringify(obj))
        }catch(error){
            alert('Não salvou')
        }
        
    }

    displayDataStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('userId')
            return JSON.parse(user)
        }catch(error){
            alert(error)
        }
    }

    blankCamps() {
        let blank = "\nCampo(s) em branco:\n"
        blank += checkBlankCamps(this.state.username, "LOGIN")
        blank += checkBlankCamps(this.state.password, "SENHA")
        if(validBlankCamps(blank)) return validBlankCamps(blank)
        return false
    }
    
    isEmail(){
        if(!validateEmail(this.state.username)){ return false }
        return true
    }

    createUserRequisition = () => {
        let user = {
            "login":(this.state.username).toString(), "senha":(this.state.password).toString()
        }
        return user
    }

    componentDidMount() {
        let url = "http://192.168.0.10:3306/api/usuario/login"
        axios.post(url, this.createUserRequisition())
            .then(response => {
                this.saveDataStorage(response.data)
            })
            .catch(err => {
                Alert.alert(
                    'Credenciais inválidas',
                    err.response.data.error
                );
                return null
        });
    
    }
            

    _signInAsync = async () => {
        try{
            this.componentDidMount()
            if(typeof this.displayDataStorage() === 'object'){
                this.props.navigation.navigate('AuthLoading');
            }
            
            
        }catch(error){
            alert("Algo deu errado!")
        }
    };
    
    Verify(){
        this.state.username = (this.state.username).trim()
        this.state.password = (this.state.password).trim()
        this.setState({ primeiroAcesso: false })
        if(this.blankCamps(this.state.username, this.state.password)) { alert(this.blankCamps(this.state.username, this.state.password)); return }
        /* if(!this.isEmail(this.state.username)){ alert("Email inválido."); return } */
        this._signInAsync()
    }

    render() {
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);  // <- insert the warning text here you wish to hide.
        return (
            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>

                <View style={styles.infoContainer} >
                    <Image
                        source={require('../../images/Logo.png')}
                        style={styles.logo}
                    />
                    <FontAwesome 
                            name="user-circle"
                            size={30}
                            position="absolute"
                            color="#eee1d6"
                            style={{left: 125, top: 84}}/>
                    <TextInput style={styles.IptEmail}
                        placeholder="Digite seu email."
                        placeholderTextColor= '#eee1d6'
                        keyboardType='email-address'
                        value={this.state.username}
                        onChangeText={ (username) => this.setState({ username }) }>
                    </TextInput>

                    <FontAwesome
                        name="unlock-alt"
                        size={30}
                        position="absolute"
                        color="#eee1d6"
                        style={{left: 125, top: 55}}/>
                    <TextInput style={styles.IptPassword}
                        secureTextEntry={true} 
                        placeholderTextColor= '#eee1d6'
                        placeholder="Digite sua senha."
                        value={this.state.password}
                        onChangeText={ (password) => this.setState({ password }) }/>
                    
                    <View style={styles.buttonContainer}
                        onPress={() => this.Verify()}>
                        <TouchableOpacity style={styles.buttonLogin}
                            onPress={() => this.Verify()}>
                            <Text style={styles.login}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRegister}
                        onPress={() => this.props.navigation.navigate('RegisterUser')}>
                            <Text style={styles.register}>Registar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        style={styles.buttonForgot}
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgot}>Esqueci minha senha!</Text> 
                    </TouchableOpacity>
                </View>

                
            </LinearGradient>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    infoContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 170,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer:{
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: -130,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IptEmail:{
        top: 20,
        height: 70,
        width: 310,
        fontSize: 15,
        borderBottomColor: '#eee1d6',
        paddingLeft: 10,
        paddingTop: 40,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: '#eee1d6',
        borderBottomWidth: 1,
        
    },
    IptPassword: {

        height: 70,
        width: 310,
        left: 0,
        fontSize: 15,
        bottom: 10,
        paddingLeft: 10,
        paddingTop: 40,
        borderBottomColor: '#eee1d6',
        borderBottomWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: '#eee1d6',
    },
    buttonLogin: {
        backgroundColor: '#111e29' ,
        height: 40,
        width: 100,
        left: 70,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    login:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#eee1d6',
        top: 8,
    },
    register:{
        top: 8,
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#111e29', 
    }, 
    buttonRegister: {
        position: 'absolute',
        backgroundColor: '#eee1d6',
        height: 40,
        width: 100,
        left: 20,
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonForgot: {
        top: 100, 
        fontSize: 20
    },

    forgot:{
        color: '#eee1d6',
        borderBottomColor: '#eee1d6',
    },

    logo:{
        position: 'absolute',
        width: 250,
        height: 250,
        bottom: 150
    }

})