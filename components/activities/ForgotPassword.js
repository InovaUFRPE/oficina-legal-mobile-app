import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

export default class ForgotPassword extends Component {
    state = {
        email: '',
    }


    render() {
        return(
            <LinearGradient colors={['#111e29', '#284760', '#4a83b4']} 
                style={styles.container}>

                <Text style={styles.header}>
                    Esqueceu sua senha?
                </Text>

                <View style={styles.infoContainer}>
                    <TextInput
                        placeholder="Insira seu E-mail"
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        autoCapitalize="none"
                        value= {this.state.email} 
                        returnKeyType="go"
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                        ref={(input) => this.emailInput = input}
                    />

                    <Text style={styles.textDescription}>
                        Insira seu e-mail para que possamos enviar
                        um link para recuperar sua senha
                    </Text>

                    <TouchableOpacity 
                        style={styles.buttom}
                        onPress={() => {}} >
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