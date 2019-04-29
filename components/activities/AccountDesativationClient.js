import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RemoveEmptySpaces, validateEmail } from '../../busnisses/Validation'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import BackButtom from '../../busnisses/BackButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class AccountDesativationClient extends Component {
    state = {
        password: '',
    }

    onBack = () => {
        this.props.navigation.navigate('AccountConfigClient')
    }

    render() {
        return(
            <BackButtom onBack = {this.onBack}>
            <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                <FontAwesome name="chevron-left" size={30} 
                color="white"
                style={styles.backIcon} 
                onPress = {() =>  this.props.navigation.navigate('AccountConfigClient')}/>

                <Text style={styles.header}>
                    Desativar conta
                </Text>

                <View style={styles.infoContainer}>
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        autoCapitalize="none"
                        value= {this.state.password} 
                        returnKeyType="go"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        ref={(input) => this.passwordInput = input}
                    />

                    <Text style={styles.textDescription}>
                        Confirme sua senha se realmente deseja 
                        desativar sua conta
                    </Text>

                    <TouchableOpacity 
                        style={styles.buttom}
                        onPress={() => {}} >
                        <Text style={styles.buttonText}>
                            Desativar
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            </BackButtom>
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
    },

    backIcon: {
        position: 'absolute',
        padding: 14,
        left: 0.1
    }
})