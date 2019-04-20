import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ConfirmPassword, validateCPF, validateEmail} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';


export default class EditProfile extends Component {
    state =  {
        name: '',
        email: '',
        cep: '',
        street: '',
        complement: '',
        neighborhood: ''
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
            
            <ScrollView 
                style = { styles.container }>
                

                <LinearGradient colors={['#111e29', '#284760', '#4a83b4']} style={styles.inputContainer}> 
                    
                    <Text style={styles.header}>USER_NAME</Text>
                    <Image
                    source={require('../../images/profile.jpg')}
                    style={styles.image}/>
        
                    <View style={[styles.editContainer, {paddingTop: 10}]}>
                        <Text style={styles.textCategoria}>Pessoais</Text>
                    </View> 
                    
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_name'
                            placeholderTextColor='#eee1d6'
                            value= {this.state.name} 
                            onChangeText={name => this.setState({ name })}/>
                    </View> 
                    
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_email'
                            placeholderTextColor='#eee1d6'
                            value= {this.state.email} 
                            onChangeText={email => this.setState({ email })}/>
                    </View>
                    
                    <View style={[styles.editContainer, {paddingTop: 10}]}>
                        <Text style={styles.textCategoria}>Endereço</Text>
                    </View>  

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>CEP</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_cep'
                            placeholderTextColor='#eee1d6'
                            value= {this.state.cep} 
                            onChangeText={cep => this.setState({ cep })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Rua</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_street'
                            placeholderTextColor='#eee1d6'
                            value= {this.state.street} 
                            onChangeText={street => this.setState({ street })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Bairro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_neighborhood'
                            placeholderTextColor='#eee1d6'
                            value= {this.state.neighborhood} 
                            onChangeText={neighborhood => this.setState({ neighborhood })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Complemento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_complement'
                            placeholderTextColor='#eee1d6'
                            value= {this.state.complement} 
                            onChangeText={complement => this.setState({ complement })}/>
                    </View>

                    <View style={[styles.editContainer, {paddingTop: 10}]}>
                        <Text style={styles.textCategoria}>Configurações</Text>
                    </View>

                    <View style={styles.editContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress = {() => {}}>
                            <Text style={[styles.inputDescription, {fontSize: 15}]}>Mudar senha</Text>    
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.button}
                            onPress = {() => {}}>
                            <Text style={[styles.inputDescription, {fontSize: 15}]}>Sair</Text>    
                        </TouchableOpacity>      
                    </View>
                </LinearGradient>
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },

    header: {
        fontSize: 30,
        color: 'white',
        marginTop: 20

    },  
    editContainer: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',   
        width: '85%',
    },

    image: {
        width: 100,
        height: 100,
        marginTop: 15
    },

    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputDescription: {
        marginLeft: 10,
        color: 'white'
    },

    textCategoria: {   
        fontSize: 20, 
        color: 'white',
        fontWeight: 'bold'
    },

    input: {
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee1d6',
        borderBottomWidth: 1,
        color: 'white',
    },

    

    button:{
        marginBottom: 10
    },
})