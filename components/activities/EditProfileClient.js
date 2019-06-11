import React, {Component} from 'react';
import {ConfirmPassword, validateCPF, validateEmail} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';



export default class EditProfileClient extends Component {
    constructor(props) {
        super(props);
        this.displayDataStorage()
    }
    
    state =  {
        name: '',
        login: '',
        email: '',
        idCliente: 0,
        password: '' ,
        confirmPassword: '',
        cep: '',
        street: '',
        complement: '',
        neighborhood: '',
        model: '',
        year: '',
        renavam: '',
        Vplate: '',
        cliente: {},
        usuario: {}
    }
    stateDB = {}

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
            this.state.name = this.state.name.trim()
            this.state.login = this.state.login.trim()
            this.state.password = this.state.password.trim()
            this.state.confirmPassword = this.state.confirmPassword.trim()
            this.state.cpf = this.state.cpf.trim()
            this.state.email = this.state.email.trim()
            this.state.cep = this.state.cep.trim()
            this.state.street = this.state.street.trim()
            this.state.complement = this.state.complement.trim()
            this.state.neighborhood = this.state.neighborhood.trim()
            this.state.model = this.state.model.trim()
            this.state.year = this.state.year.trim()
            this.state.renavam = this.state.renavam.trim()
            this.state.Vplate = this.state.Vplate.trim()
        }else{
            alert(this.errors.str2)
            this.errors.str2 = "\nErro(s)\n"
            return
        }   
    }

    componentDidMountGetClientByUser = async (id) => {
        try{
        await axios.post("http://192.168.0.10:6001/api/cliente/usuario", { idUsuario:id })
            .then(response => { this.saveClientDataStorage(response.data) })
        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }

    componentDidMountGetUser = async () => {
         try{
            await axios.post("http://192.168.0.10:6001/api/usuario/login", 
                            { login: this.state.username, email:this.state.username, senha: this.state.password })
                .then(response => { 
                    if(response.status == 200){
                        this.saveDataStorage(JSON.stringify(response.data))};
                        this.componentDidMountGetClientByUser(response.data.user.id)
                })

         }catch(err){
            alert("Email e/ou senha incorreto(s).")
            return null
        }
    }

    saveClient = async () => {
        alert(this.state.idCliente)
        try{
            await axios.put(`http://192.168.0.10:6001/api/cliente/update/${this.state.cliente.id}`, this.state)
                .then(response => alert("Modificações salvas com sucesso. Logue novamente para atualizar seu app"))
        }catch{
            alert("Não foi possível salvar o cliente")
        }
    }

    saveUser = async () => {
        try{
            await axios.put(`http://192.168.0.10:6001/api/usuario/update/${this.state.cliente.idUsuario}`, this.state)
                .then(response => this.saveClient())
        }catch{
            alert("Não foi possível salvar o usuário")
        }
    }

    save = () => {
        if(this.stateDB != this.state){
           this.saveUser()
        }
        else{
            alert("O banco de dados já contém as informações atuais")
        }
    }

    populateBlankCamps = () =>{
        this.setState(
            {
                idCliente: this.state.cliente.id,
                name: this.state.cliente.nome,
                login: this.state.usuario.user.login,
                email: this.state.usuario.user.email,
                cpf: this.state.cliente.cpf,
                street: this.state.cliente.endereco,
                neighborhood: this.state.cliente.bairro,
                cep: this.state.cliente.cep,
                complement: this.state.cliente.complemento
            })
        this.state.usuario.idUsuario = this.state.cliente.idUsuario
    }

    displayDataStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('userToken')
            if(user != null){
                this.state.cliente = JSON.parse(await AsyncStorage.getItem('client'))
                this.state.usuario = JSON.parse(await AsyncStorage.getItem('user'))
                this.populateBlankCamps()
                this.stateDB = this.state;
            }else{
                this.props.navigation.navigate('Home')
            }
        }catch(error){
            alert(error)
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
        this.props.navigation.navigate('HomeClient')
    }
    
    render() {
        return (
            
            <ScrollView 
                style = { styles.container }>
                    <FontAwesome name="bars" size={30} 
                    color="white" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.toggleDrawer()}/>
                    <FontAwesome name='check' size={30}
                    onPress={() => this.save()}
                    style={{marginTop: 15, marginLeft: "87%", color: 'black', fontWeight: 1,  }}
                />
                

                <View style = { styles.container } style={styles.inputContainer}> 
                    
                    <Text style={styles.header}>{this.state.name}</Text>
                    <Image
                    source={require('../../images/profile.jpg')}
                    style={styles.image}/>
                    
                    <TouchableOpacity style={styles.ButtonEdit}
                            onPress = {() => {}}>
                        <Text style={{fontSize: 18, color:'#eee1d6', width: 300, textAlign: 'center'}}>Alterar foto de perfil</Text>    
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
                        <Text style={styles.inputDescription}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_login'
                            placeholderTextColor='#586069'
                            value= {this.state.login} 
                            onChangeText={login => this.setState({ login })}/>
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
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>CPF</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder='user_cpf'
                            placeholderTextColor='#586069'
                            value= {this.state.cpf} 
                            onChangeText={cpf => this.setState({ cpf })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_password'
                            placeholderTextColor='#586069'
                            value= {this.state.password} 
                            onChangeText={password => this.setState({ password })}/>
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
                        <Text style={styles.textCategoria}>Veículo</Text>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Modelo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_vehicle_model'
                            placeholderTextColor='#586069'
                            value= {this.state.model} 
                            onChangeText={model => this.setState({ model })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Ano</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_vehicle_year'
                            placeholderTextColor='#586069'
                            value= {this.state.year} 
                            onChangeText={year => this.setState({ year })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Renavam</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_vehicle_renavam'
                            placeholderTextColor='#586069'
                            value= {this.state.renavam} 
                            onChangeText={renavam => this.setState({ renavam })}/>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_vehicle_plate'
                            placeholderTextColor='#586069'
                            value= {this.state.Vplate} 
                            onChangeText={Vplate => this.setState({ Vplate })}/>
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
        width: '90%',
    },

    image: {
        width: 100,
        height: 100,
        marginTop: 15,
    },

    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },

    inputDescription: {
        fontSize: 18,
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
        backgroundColor: '#2250d9',
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
        color: 'black',
        padding: 19

    }
})