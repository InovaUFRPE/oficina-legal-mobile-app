import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class Login extends Component {
    render() {
        return (
            <LinearGradient 
                colors={['#111e29', '#333e48', '#586069']}
                style = { styles.container }>

                <View style={styles.infoContainer} >
                    <TextInput style={styles.IptEmail}
                        placeholder="Digite seu username ou email."
                        placeholderTextColor= 'white'
                        keyboardType='email-address'>
                    </TextInput>
                    <TextInput style={styles.IptPassword}
                        placeholder="Digite sua senha."
                        placeholderTextColor= 'white'
                        keyboardType='visible-password'>
                    </TextInput>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonLogin}>
                            <Text style={styles.login}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRegister}>
                            <Text style={styles.register}>Registar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonForgot}>
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
        top: 5,
        height: 60,
        width: 310,
        bottom: 10,
        borderBottomColor: '#eee1d6',
        paddingLeft: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
        borderBottomWidth: 1,
        
    },
    IptPassword: {
        top: 10,
        height: 60,
        width: 310,
        left: 0,
        bottom: 10,
        paddingLeft: 10,
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
        color: '#eee1d6', 
    }, 
    buttonRegister: {
        position: 'absolute',
        backgroundColor: '#111e29',
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
    },

    forgot:{
        color: '#eee1d6'
    }

})