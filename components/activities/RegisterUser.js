import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ConfirmPassword, validateCPF, validateEmail, RemoveEmptySpaces} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import api from '../../service/api';
import {saveUserToken, saveUser, getUserToken, saveClient, saveMechanic} from '../../auth'


export default class RegisterUser extends Component {
    state =  {
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: '',
        checkBclient: false,
        checkBmechanic: false,
        errorMSG: '',
        idUser: null
    }
    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }

    CheckBoxCPress(){
        if(this.state.checkBmechanic) this.CheckBoxMPress()
        this.setState({
            checkBclient: !this.state.checkBclient
        })
    }

    CheckBoxMPress(){
        if(this.state.checkBclient) this.CheckBoxCPress()
        this.setState({
            checkBmechanic: !this.state.checkBmechanic
        })
    }

    _signUpAsyncUser = async () => {
        saveUserToken();
        const response = await api.post('/api/usuario', {
            login: toString(this.state.name),
            email: toString(this.state.email),
            senha: toString(this.state.password),
            ativo: toString(true)
        })
        if(!response.ok) {
            alert("Erro ao inserir usuário")
            return
        }
        alert(response.data)
        const user = response.data 

        if (await saveUser(user, getUserToken()) === true){
            return true
        } else{
            this.setState({ errorMSG: "Não foi possível armazenar usuário"})
        }
        
    }

    findUser = async () => {
        const response = await api.get(`/api/usuario/${this.state.email}/${this.state.password}`)
        if(!response.ok) {
            alert("Usuário não encontrado")
            return
        }
        this.setState({ idUser: response.idUsuario })
        
    }

    _signUpAsyncClient = async () => {
        this.findUser()
        const response = await api.post('/api/cliente', {
            nome: toString(this.state.name),
            cpf: toString(this.state.cpf),
            idUsuario: toString(this.state.idUser),
        })
        if(!response.ok) {
            alert("Erro ao inserir cliente")
            return
        }
        alert(response.data)
        const client = response.data 

        if (await saveClient(client, getUserToken()) === true){
            return true
        } else{
            this.setState({ errorMSG: "Não foi possível armazenar mecânico"})
        }
        
    }

    _signUpAsyncMechanic = async () => {
        this.findUser()
        const response = await api.post('/api/mecanico', {
            nome: toString(this.state.name),
            cpf: toString(this.state.cpf),
            idUsuario: toString(this.state.idUser),
        })
        if(!response.ok) {
            alert("Erro ao inserir mecânico")
            return
        }
        alert(response.data)
        const mechanic = response.data 

        if (await saveMechanic(mechanic, getUserToken()) === true){
            return true
        } else{
            this.setState({ errorMSG: "Não foi possível armazenar mecânico"})
        }
        
    }

    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        else if(this.VerifyErrors()){
            this.state.name = RemoveEmptySpaces(this.state.name)
            this.state.cpf = RemoveEmptySpaces(this.state.cpf)
            this.state.email = RemoveEmptySpaces(this.state.email)
            this.state.password = RemoveEmptySpaces(this.state.password)
            if(!this._signUpAsyncUser()){
                alert(this.state.errorMSG)
                return
            } 
            if(this.state.checkBclient) {
                this._signUpAsyncClient()
                this.props.navigation.navigate('RegisterAdress')
            
            }
            else {
                this._signUpAsyncMechanic()
                this.props.navigation.navigate('LinkMechanicToWorkshop')
            }
        }else{
            alert(this.errors.str2)
            this.errors.str2 = "\nErro(s)\n"
            return
        }
        
        
    }

    VerifyErrors(){
        if(!ConfirmPassword(this.state.password, this.state.confirmPassword)){ this.errors.str2 += "\n- As senhas não conferem." }
        if(!validateCPF(this.state.cpf)){ this.errors.str2 += "\n- Insira um CPF válido." }
        if(!validateEmail(this.state.email)){ this.errors.str2 += "\n- Insira um email válido." }
        if(this.errors.str2 == "\nErro(s)\n") return true
    }

    checkBlankCamps(){
        if(this.state.name == ""){ this.errors.str += "\n- Nome" }
        if(this.state.cpf == ""){ this.errors.str += "\n- CPF" }
        if(this.state.email == ""){ this.errors.str += "\n- Email" }
        if(this.state.password == ""){ this.errors.str += "\n- Senha" }
        if(this.state.confirmPassword == ""){ this.errors.str += "\n- Confirmar senha" }
        if(this.state.checkBclient == false && this.state.checkBmechanic == false){ this.errors.str += "\n- Você é cliente ou mecânico?" }
        if(this.errors.str == "\nCampo(s) em branco:\n") return true
    }
    
    render() {
        return (
            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
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
                    
                    <View style={{top:25}}>
                        <CheckBox style={{position: 'absolute', left: 100}}
                                  value = {this.state.checkBclient}
                                  onChange={() => this.CheckBoxCPress()}></CheckBox>
                        <CheckBox style={{right:100}}
                                  value = {this.state.checkBmechanic}
                                  onChange={() => this.CheckBoxMPress()}></CheckBox>
                    </View>

                    <View>
                        <Text style={{position: 'absolute',color: '#eee1d6', right: 45}}>Mecânico</Text>
                        <Text style={{color: '#eee1d6', left: 60}}>Cliente</Text>
                    </View>

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
        top: 20,
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
        top: 30,
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