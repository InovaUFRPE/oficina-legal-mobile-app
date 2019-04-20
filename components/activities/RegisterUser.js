import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ConfirmPassword, validateCPF, validateEmail} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';


export default class RegisterUser extends Component {
    state =  {
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }

    RemoveEmptySpaces(strTexto)
        {
            // Substitui os espaços vazios no inicio e no fim da string por vazio.
            return strTexto.replace(/^s+|s+$/g, '');
        }

    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        else if(this.VerifyErrors()){
            this.state.name = this.RemoveEmptySpaces(this.state.name)
            this.state.cpf = this.RemoveEmptySpaces(this.state.cpf)
            this.state.email = this.RemoveEmptySpaces(this.state.email)
            this.state.password = this.RemoveEmptySpaces(this.state.password)
            this.props.navigation.navigate('RegisterAdress')
        }else{
            alert(this.errors.str2)
            this.errors.str2 = "\nErro(s)\n"
            return
        }
        
        
    }

    VerifyErrors(){
        if(!ConfirmPassword(this.state.password, this.state.confirmPassword)){
            this.errors.str2 += "\n- As senhas não conferem."
        }
        if(!validateCPF(this.state.cpf)){
            this.errors.str2 += "\n- Insira um CPF válido."
        }
        if(!validateEmail(this.state.email)){
            this.errors.str2 += "\n- Insira um email válido."
        }
        if(this.errors.str2 == "\nErro(s)\n")
            return true
    }

    checkBlankCamps(){
        if(this.state.name == ""){
            this.errors.str += "\n- Nome"
        }
        if(this.state.cpf == ""){
            this.errors.str += "\n- CPF"
        }
        if(this.state.email == ""){
            this.errors.str += "\n- Email"
        }
        if(this.state.password == ""){
            this.errors.str += "\n- Senha"
        }
        if(this.state.confirmPassword == ""){
            this.errors.str += "\n- Confirmar senha"
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
                        Insira seus dados
                    </Text>          
                    <TextInput placeholder='Nome' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value={this.state.name}
                        returnKeyType="next"
                        onChangeText={name => this.setState({ name })}
                        onSubmitEditing={() => this.cpfInput.focus()}/>

                    <TextInput placeholder='CPF'  
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.cpf} 
                        returnKeyType="next"
                        keyboardType='numeric'
                        onChangeText={cpf => this.setState({ cpf })}
                        ref={(input) => this.cpfInput = input}
                        onSubmitEditing={() => this.emailInput.focus()}/>

                    <TextInput placeholder='E-mail' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.email} 
                        returnKeyType="next"
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        ref={(input) => this.emailInput = input}/> 

                    <TextInput placeholder='Senha' 
                        placeholderTextColor="#eee1d6" style={styles.input}
                        value= {this.state.password} 
                        returnKeyType="next"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        onSubmitEditing={() => this.confirmPasswordInput.focus()}
                        ref={(input) => this.passwordInput = input}/> 

                    <TextInput placeholder='Confirmar Senha' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.confirmPassword} 
                        returnKeyType="go"
                        placeholderTextColor="#eee1d6" 
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        ref={(input) => this.confirmPasswordInput = input}/>   
                                    
                    <TouchableOpacity onPress={() => this.Verify()} 
                        style={styles.buttonRegister}>
                        <Text style={styles.buttonRegisterText}>Seguir</Text>
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