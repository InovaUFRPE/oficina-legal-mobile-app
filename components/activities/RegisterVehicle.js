import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RemoveEmptySpaces} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';


export default class RegisterVehicle extends Component {
    state =  {
        model: '',
        year: '',
        renavam: '',
        Vplate: ''
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
        alert("Pode seguir")
    }

    checkBlankCamps(){
        if(this.state.model == ""){
            this.errors.str += "\n- Modelo"
        }
        if(this.state.year == ""){
            this.errors.str += "\n- Ano"
        }
        if(this.state.renavam == ""){
            this.errors.str += "\n- Renavam"
        }
        if(this.state.Vplate == ""){
            this.errors.str += "\n- Placa"
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
                <View style={styles.inputContainer}>  
                    <Text style={styles.header}>
                        Informações do seu veículo
                    </Text>          
                    <TextInput placeholder='Modelo' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value={this.state.model}
                        returnKeyType="next"
                        onChangeText={model => this.setState({ model })}/>

                    <TextInput placeholder='ano'  
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.year} 
                        returnKeyType="next"
                        keyboardType='numeric'
                        onChangeText={year => this.setState({ year })}/>

                    <TextInput placeholder='Renavam' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.renavam} 
                        returnKeyType="next"
                        onChangeText={renavam => this.setState({ renavam })}/> 

                    <TextInput placeholder='Placa' 
                        placeholderTextColor="#eee1d6" style={styles.input}
                        value= {this.state.Vplate} 
                        returnKeyType="next"
                        onChangeText={Vplate => this.setState({ Vplate })}/> 
 
                                    
                    <TouchableOpacity onPress={() => this.Verify()} 
                        style={styles.buttonRegister}>
                        <Text style={styles.buttonRegisterText}>Cadastrar</Text>
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

    header: {
        color: '#eee1d6',
        fontSize: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        bottom: 20
    },

    inputContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        marginTop: 15,
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

    buttonRegister  : {
        backgroundColor: '#eee1d6' ,
        height: 40,
        width: 250,
        top: 50,
        alignItems: 'center',  
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius: 20,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonRegisterText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111e29',
        top: 8,
    },
})