import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RemoveEmptySpaces, validateEmail } from '../../busnisses/Validation'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Input} from 'react-native-elements'

export default class ForgotPassword extends Component {
    state = {
        email: '',
    }
    errors = {
        str: "\nCampo em branco:\n",
    }

    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo em branco:\n"
            return
        }
        this.state.email = RemoveEmptySpaces(this.state.email)
        if(!validateEmail(this.state.email)) alert("Email inválido.")
    }

    checkBlankCamps(){
        if(this.state.email == ""){
            this.errors.str += "\n- Email"
        }
        if(this.errors.str == "\nCampo em branco:\n"){
            return true
        }
    }

    render() {
        return(
            <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>

                <Text style={styles.header}>
                    Esqueceu sua senha?
                </Text>

                <View style={styles.infoContainer}>

                    <Input
                        leftIcon={{type: 'font-awesome', name: 'at', color: 'white', marginRight: 10 }}
                        inputStyle={{color: 'white'}}
                        keyboardType='email-address'
                        shake={true}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })}
                        ref={(input) => this.emailInput = input}
                    />

                    <Text style={styles.textDescription}>
                        Insira seu e-mail para que possamos enviar
                        um link para recuperar sua senha
                    </Text>

                    <TouchableOpacity 
                        style={styles.buttom}
                        onPress={() => {this.Verify()}} >
                        <Text style={styles.buttonText}>
                            Enviar
                        </Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    header: {
        fontSize: 20,
        marginTop: 55,
        fontWeight: 'bold',
        color: 'white'
    },

    input: {
        marginTop: 50,
        width: '90%',
        height: 40,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee1d6',
        borderBottomWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
    },

    textDescription: {
        padding: 20,
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },

    buttom: {
        backgroundColor: '#111e29',
        width: '70%',
        alignItems: 'center',
        borderRadius: 20,
        opacity: 1
    },

    buttonText: {
        color: 'white',
        padding: 20,
        fontSize: 15,
        fontWeight:'bold'
    }
})