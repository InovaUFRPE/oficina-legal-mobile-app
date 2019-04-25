import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RemoveEmptySpaces, validateEmail} from '../../busnisses/Validation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
    state = {
        password: '',
        username: '',
    };
    errors = {
        str: "\nCampo(s) em branco:\n",
    }


    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        if(!validateEmail(this.state.username)){
            alert("Email inválido.")
            return
        }
        this.state.username = RemoveEmptySpaces(this.state.username)
        this.state.password = RemoveEmptySpaces(this.state.password)
        this.props.navigation.navigate('ChoseProfile')
        
    }

    checkBlankCamps(){
        if(this.state.username == ""){
            this.errors.str += "\n- Usuário"
        }
        if(this.state.password == ""){
            this.errors.str += "\n- Senha"
        }
        if(this.errors.str == "\nCampo(s) em branco:\n"){
            return true
        }
    }

    render() {
        return (
            <LinearGradient 
                colors={['#111e29', '#284760', '#4a83b4']}
                style = { styles.container }>

                <View style={styles.infoContainer} >
                    <FontAwesome 
                            name="user-circle"
                            size={30}
                            position="absolute"
                            color="white"
                            style={{right: 175, top: 90}}/>
                    <TextInput style={styles.IptEmail}
                        placeholder="Digite seu email."
                        placeholderTextColor= 'white'
                        keyboardType='email-address'
                        value={this.state.username}
                        onChangeText={ (username) => this.setState({ username }) }>
                    </TextInput>

                    <FontAwesome
                        name="unlock-alt"
                        size={30}
                        position="absolute"
                        color="white"
                        style={{right: 175, top: 60}}/>
                    <TextInput style={styles.IptPassword}
                        secureTextEntry={true} 
                        placeholderTextColor= 'white'
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
                    <TouchableOpacity style={styles.buttonForgot}
                    onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgot}>Esqueci minha senha!</Text> 
                    </TouchableOpacity>
                </View>

                
            </LinearGradient>
            /* <View> 
                
                
            </View> */
            
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
        paddingTop: 35,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
        borderBottomWidth: 1,
        
    },
    IptPassword: {

        height: 70,
        width: 310,
        left: 0,
        fontSize: 15,
        bottom: 10,
        paddingLeft: 10,
        paddingTop: 35,
        borderBottomColor: '#eee1d6',
        borderBottomWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
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
        top: 130, 
        fontSize: 20
    },

    forgot:{
        color: '#eee1d6',
        borderBottomColor: '#eee1d6',
    }

})