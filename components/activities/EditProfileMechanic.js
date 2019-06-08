import React, {Component} from 'react';
import {ConfirmPassword, validateCPF, validateEmail, RemoveEmptySpaces} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import BackButton from '../../busnisses/BackButton'


export default class EditProfileMechanic extends Component {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
            return true;
            });
    }
    
    
    state =  {
        name: '',
        email: '',
        cep: '',
        street: '',
        complement: '',
        neighborhood: '',
        Hyperlink: '',
        description: '',
    }
    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
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
            this.state.cep = RemoveEmptySpaces(this.state.cep)
            this.state.street = RemoveEmptySpaces(this.state.street)
            this.state.complement = RemoveEmptySpaces(this.state.complement)
            this.state.neighborhood = RemoveEmptySpaces(this.state.neighborhood)
            this.state.Hyperlink = RemoveEmptySpaces(this.state.Hyperlink)
            this.state.description = RemoveEmptySpaces(this.state.description)
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

    onBack = () => {
        this.props.navigation.navigate('HomeMechanic')
    }
    
    render() {
        return (
            
            <ScrollView 
                style = { styles.container }>
                    <FontAwesome name="arrow-left" size={20} 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.goBack()}/>
                

                <View style = { styles.container } style={styles.inputContainer}> 
                    
                    <Text style={styles.header}>USER_MECHANIC_NAME</Text>
                    <Image
                    source={require('../../images/profile.jpg')}
                    style={styles.image}/>
                    
                    <TouchableOpacity style={styles.ButtonEdit}
                            onPress = {() => {}}>
                        <Text style={{fontSize: 18, color:'#fff', width: 300, textAlign: 'center'}}>Alterar perfil</Text>    
                    </TouchableOpacity>

                    <View style={[styles.editContainerCat, {paddingTop: 10}]}>
                        <Text style={styles.textCategoria}>Pessoal</Text>
                    </View> 
                    
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_name'
                            placeholderTextColor='#586069'
                            value= {this.state.name} 
                            onChangeText={name => this.setState({ name })}/>
                    </View> 
                    
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>E-mail</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder='user_email'
                            placeholderTextColor='#586069'
                            value= {this.state.email} 
                            onChangeText={email => this.setState({ email })}/>
                    </View>
                    
                    <View style={[styles.editContainerCat, {paddingTop: 10}]}>
                        <Text style={styles.textCategoria}>Endereço</Text>
                    </View>  

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>CEP</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_cep'
                            placeholderTextColor='#586069'
                            value= {this.state.cep} 
                            onChangeText={cep => this.setState({ cep })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Rua</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_street'
                            placeholderTextColor='#586069'
                            value= {this.state.street} 
                            onChangeText={street => this.setState({ street })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Bairro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_neighborhood'
                            placeholderTextColor='#586069'
                            value= {this.state.neighborhood} 
                            onChangeText={neighborhood => this.setState({ neighborhood })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Complemento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_complement'
                            placeholderTextColor='#586069'
                            value= {this.state.complement} 
                            onChangeText={complement => this.setState({ complement })}/>
                    </View>

                    <View style={[styles.editContainerCat, {paddingTop: 10}]}>
                        <Text style={styles.textCategoria}>Currículo</Text>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Link do Currículo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_link'
                            placeholderTextColor='#586069'
                            value= {this.state.Hyperlink} 
                            onChangeText={Hyperlink => this.setState({ Hyperlink })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Descrição</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_description'
                            placeholderTextColor='#586069'
                            value= {this.state.description} 
                            onChangeText={description => this.setState({ description })}/>
                    </View>

                    <View style={[styles.editContainerCat, {paddingTop: 10}]}>
                        <Text style={[styles.textCategoria, {fontSize: 20}]}>PIN: 000-0000</Text>
                    </View>


                </View>
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white' ,
    },

    header: {
        fontSize: 30,
        color: '#2250d9',
        marginTop: 20

    },  
    editContainer: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',   
        width: '85%',
    },
    editContainerCat: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',   
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
        paddingTop: 15,
    },

    inputDescription: {
        fontSize: 18,
        marginLeft: 10,
        color: '#111e29'
    },

    textCategoria: {   
        fontSize: 28, 
        color: '#2250d9',
        fontWeight: 'bold',
        alignContent: 'center'
    },

    input: {
        fontSize: 18,
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#111e29',
        borderBottomWidth: 1,
        color: '#111e29',
    },

    ButtonEdit: {
        top: 15,
        marginBottom: 30,
        padding: 5,
        backgroundColor: '#111e29',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    button:{
        marginBottom: 1
    },

    menuIcon: {
        position: 'absolute',
        color: '#2250d9',
        padding: 19

    }
})