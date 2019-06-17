import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    displayDataStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('user')
            if(user != null){
                userObj = JSON.parse(user)
                let login = userObj.login
                let email = userObj.login
                let senha = userObj.senha
                this.componentDidMountGetJwt({login: login, email:email, senha: senha})
            } 
        }catch(error){
            alert(error)
        }
    }

    componentDidMountPostVehicle = async (jwt, vehicle) => {
        axios.defaults.headers.common['x-access-token'] = JSON.stringify(jwt)
        try{
            await axios.post("http://192.168.0.10:4000/api/veiculo/add", vehicle)
                .then(response => this.props.navigation.navigate('Home'))
        }catch(err){
            alert("Não foi possível salvar o veículo")
        }
    }

    componentDidMountGetClientId = async (idUsuario, jwt) => {
        try{
            await axios.post("http://192.168.0.10:4000/api/cliente/usuario", idUsuario)
                .then(response => this.createVehicleRequisition(response.data.id, jwt))
             
        }catch(err){
            alert("Talvez esse usuário não tenha um cliente")
        }
    }

    componentDidMountGetJwt = async (loginEsenha) => {
        try{
            const user = await axios.post("http://192.168.0.10:4000/api/usuario/login", loginEsenha)
            const jwt = user.data.token
            const userId = {idUsuario: user.data.user.id}
            this.componentDidMountGetClientId(userId, jwt)
        }catch(err){
            alert("Algo deu errado, não foi possível resgatar usuário")
        }
    }

    createVehicleRequisition = (clientId, jwt) => {
        const vehicle = {
            modelo: this.state.model,
            ano: this.state.year,
            renavam: this.state.renavam,
            placa: this.state.Vplate,
            Cliente: {
                id: clientId
            }
        }
        this.componentDidMountPostVehicle(jwt, vehicle)
        return vehicle
    }

    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        this.displayDataStorage()
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
            <View 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>
                <View style={styles.inputContainer}>  
                      <ScrollView>  
                            
                      <View style={{alignItems: 'center'}}><Text style={styles.header}>Infomações do veículo</Text></View>
                        <TextInput placeholder='Modelo' 
                            placeholderTextColor="white" 
                            style={styles.input}
                            value={this.state.model}
                            returnKeyType="next"
                            onChangeText={model => this.setState({ model })}/>

                        <TextInput placeholder='ano'  
                            placeholderTextColor="white" 
                            style={styles.input}
                            value= {this.state.year} 
                            returnKeyType="next"
                            keyboardType='numeric'
                            onChangeText={year => this.setState({ year })}/>

                        <TextInput placeholder='Renavam' 
                            placeholderTextColor="white" 
                            style={styles.input}
                            value= {this.state.renavam} 
                            returnKeyType="next"
                            onChangeText={renavam => this.setState({ renavam })}/> 

                        <TextInput placeholder='Placa' 
                            placeholderTextColor="white" style={styles.input}
                            value= {this.state.Vplate} 
                            returnKeyType="next"
                            onChangeText={Vplate => this.setState({ Vplate })}/> 
    
                                        
                        <TouchableOpacity onPress={() => this.Verify()} 
                            style={styles.buttonRegister}>
                            <Text style={styles.buttonRegisterText}>Cadastrar</Text>
                        </TouchableOpacity>  
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },

    header: {
        color: 'white',
        fontSize: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
    },

    inputContainer: {
        height: '60%',
        width: "90%",
        top: "20%",
        padding: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: '#2250d9',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 4,
    },

    input: {
        marginTop: 15,
        width: '90%',
        height: 40,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
    },

    buttonRegister  : {
        backgroundColor: 'white' ,
        height: 75,
        width: '100%',
        top: 30,
        alignItems: 'center',  
        color: '#111e29',
    },

    buttonRegisterText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111e29',
        top: 8,
    },
})