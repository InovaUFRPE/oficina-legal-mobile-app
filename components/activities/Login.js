import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RemoveEmptySpaces, validateEmail, checkBlankCamps, validBlankCamps, getToken} from '../../busnisses/Validation';
import {saveUserToken} from '../../auth'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
    state = {
        password: '',
        username: '',
    };

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

    _signInAsync = async () => {
        saveUserToken();
        this.props.navigation.navigate('AuthLoading');
      };
    
    Verify(){
        this.state.username = RemoveEmptySpaces(this.state.username)
        this.state.password = RemoveEmptySpaces(this.state.password)
        if(this.blankCamps(this.state.username, this.state.password)) { alert(this.blankCamps(this.state.username, this.state.password)); return }
        if(!this.isEmail(this.state.username)){ alert("Email inválido."); return }
        this._signInAsync()
    }

    render() {
        return (
            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>

                <View style={styles.infoContainer} >
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
    }

})