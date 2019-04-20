import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RemoveEmptySpaces} from '../../busnisses/Validation'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'

export default class LinkMechanicToWorkshop extends Component {
    state = {
        pin: '',
    }
    errors = {
        str: "\nCampo(s) em branco:\n",
    }

    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        this.state.pin = RemoveEmptySpaces(this.state.pin)
        this.props.navigation.navigate('RegisterMechanic')
    }

    checkBlankCamps(){
        if(this.state.pin == ""){
            this.errors.str += "\n- Pin"
        }
        if(this.errors.str == "\nCampo(s) em branco:\n"){
            return true
        }
    }

    render() {
        return(
            <LinearGradient colors={['#111e29', '#284760', '#4a83b4']} 
                style={styles.container}>

                <Text style={styles.header}>
                    Conecte-se a sua empresa!
                </Text>

                <View style={styles.infoContainer}>
                    <TextInput
                        placeholder="Insira o código."
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        autoCapitalize="none"
                        value= {this.state.pin} 
                        returnKeyType="go"
                        onChangeText={pin => this.setState({ pin })}
                        ref={(input) => this.pinInput = input}
                    />

                    <Text style={styles.textDescription}>
                        Insira o código passado por sua empresa. para que possamos conectar seu
                        perfil a empresa que você trabalha.
                    </Text>

                    <TouchableOpacity 
                        style={styles.buttom}
                        onPress={() => {this.Verify()}} >
                        <Text style={styles.buttonText}>
                            Analisar
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