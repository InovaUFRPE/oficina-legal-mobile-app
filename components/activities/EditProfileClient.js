import React, { Component } from 'react';
import { ConfirmarPassword, validateCPF, validateEmail } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, Image, ScrollView} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import { getApiUrl } from '../../service/api'
import Icon from 'react-native-vector-icons/Ionicons'
import defaultStyles from '../styles/Default'

const baseURL = getApiUrl();


export default class EditProfileClient extends Component {
    constructor(props) {
        super(props);
        this.displayDataStorage()
    }

    state = {
        nome: '',
        idCliente: 0,
        Password: '',
        confirmarPassword: '',
        cep: '',
        endereco: '',
        complemento: '',
        bairro: '',
        modelo: '',
        ano: '',
        renavam: '',
        Vplate: '',
        cliente: {},
        usuario:{
            login: '',
            email: '',
            Password: ''
        },
        login: '',
        email: '',
        
    }
    stateDB = {}

    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }

    applyTrim() {
        this.state.nome = this.state.nome.trim()
        this.state.login = this.state.login.trim()
        this.state.Password = this.state.Password.trim()
        this.state.confirmarPassword = this.state.confirmarPassword.trim()
        this.state.cpf = this.state.cpf.trim()
        this.state.email = this.state.email.trim()
        this.state.cep = this.state.cep.trim()
        this.state.endereco = this.state.endereco.trim()
        this.state.complemento = this.state.complemento.trim()
        this.state.bairro = this.state.bairro.trim()
        this.state.modelo = this.state.modelo.trim()
        this.state.ano = this.state.ano.trim()
        this.state.renavam = this.state.renavam.trim()
        this.state.Vplate = this.state.Vplate.trim()  
    }


    saveClient = async () => {
        const id = this.state.idCliente;
        try {
            await axios.put(`http://192.168.0.10:4000/api/cliente/update/${id}`, this.state) 
            alert("Modificações realizadas com sucesso.")
            this.displayDataStorage()
        } catch{
            alert("Não foi possível salvar o cliente")
        }
    }

    save = () => {
        if (this.stateDB != this.state) {
            if(this.state.Password != ''){
                this.state.senha = this.state.Password;
            }
            
            this.Verify()
        }
        else {
            alert("O banco de dados já contém as informações atuais")
        }
    }

    populateBlankCamps = () => {
        this.state.usuario.login = this.state.login,
        this.state.usuario.email = this.state.email
        const cpf = this.state.cliente.cpf
        const cep = this.state.cliente.cep
        this.setState(
            {
                idCliente: this.state.cliente.id,
                nome: this.state.cliente.nome,
                cpf: cpf.substring(0,3) + "." + cpf.substring(3,6)+"."+cpf.substring(6,9)+"-"+cpf.substring(9,11),
                endereco: this.state.cliente.endereco,
                bairro: this.state.cliente.bairro,
                cep: cep.substring(0,5)+"-"+cep.substring(5,8),
                complemento: this.state.cliente.complemento,
                cliente: {}
            })
        this.stateDB = this.state
    }

    getUser= async () => {
        let id = await AsyncStorage.getItem('user')
        id = parseInt(id)
        this.state.usuario.idUsuario = id
        try{
            axios.get(`http://192.168.0.10:4000/api/usuario/${id}`) 
                .then(response => this.setState({login: response.data.user.login, email: response.data.user.email}) )
            await this.getClient()
            this.populateBlankCamps()
        }catch(err){
            alert("Não foi possível resgatar o usuário.")
            return null
        }
    }

    getClient = async () => {
        const idUser = await AsyncStorage.getItem('user')
        try{
            const client = await axios.get(`http://192.168.0.10:4000/api/cliente/findByIdUsuario/${parseInt(idUser)}`)
            this.setState({cliente: client.data})
        }catch(err){
            alert("Não foi possível resgatar o cliente")
        }
    }

    displayDataStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            let userToken = await AsyncStorage.getItem('userToken')
            user = parseInt(user)
            if (userToken != null) {
                this.getUser();
                this.stateDB = this.state;
            } else {
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            alert(error)
        }
    }

    GetCpf = async () => {
        try {
            await axios.post(`http://192.168.0.10:4000/api/usuario/cpf`, { cpf: this.state.cpf })
                .then(response => {
                    if (response.status == 201) {
                        alert("Já existe um cliente cadastrado com esse cpf.")
                        return null
                    }
                })

        } catch (err) {
            this.saveClient()
        }
    }


    Verify(Mechanic, Client) {
        if (!this.checkBlankCamps(Mechanic, Client)) {
            Alert.alert("Erro", this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        else if (this.VerifyErrors()) {
            this.applyTrim()
            this.GetCpf()
        } else {
            alert(this.errors.str2)
            this.errors.str2 = "\nErro(s)\n"
            return
        }

    }

    VerifyErrors() {
        if(this.state.Password != '' && this.state.confirmarPassword != ''){
            if (!ConfirmarPassword(this.state.Password, this.state.confirmarPassword)) {
                this.errors.str2 += "\n- As Senhas não conferem."
            }
            /* if(ConfirmPassword(this.state.password, this.state.confirmPassword)){ 
                if(this.state.password.length < 6){
                    this.errors.str2 += "\n- Sua senha deve ter pelo menos 6 caracteres"
                }
            } */
        }
        if (!validateCPF(this.state.cpf)) {
            this.errors.str2 += "\n- Insira um CPF válido."
        }
        if (!validateEmail(this.state.email)) {
            this.errors.str2 += "\n- Insira um email válido."
        }
        if (this.errors.str2 == "\nErro(s)\n")
            return true
    }

    checkBlankCamps() {
        if (this.state.login == "") {
            this.errors.str += "\n- Login"
        }
        if (this.state.email == "") {
            this.errors.str += "\n- Email"
        }
        if (this.state.cpf == "") {
            this.errors.str += "\n- CPF"
        }
        if (this.state.cep == "") {
            this.errors.str += "\n- CEP"
        }
        if (this.state.endereco == "") {
            this.errors.str += "\n- Rua"
        }
        if (this.state.bairro == "") {
            this.errors.str += "\n- Bairro"
        }
        if (this.state.complemento == "") {
            this.errors.str += "\n- Complemento"
        }
        if (this.errors.str == "\nCampo(s) em branco:\n") {
            return true
        }
    }

    render() {
        return (

            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.inputContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 100, marginVertical: 20}}>
                        <Image
                            source={{ uri: 'https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png' }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />

                        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>{this.state.nome}</Text>
                        <Icon 
                            name="md-sync"
                            size={30}
                            style={{ marginTop: 3, paddingBottom: 10 }}
                            color={defaultStyles.colors.primaryColor}
                            onPress={() => this.save()} />

                    </View>
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_login'
                            placeholderTextColor='#586069'
                            value={this.state.login}
                            onChangeText={login => this.setState({ login })} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>E-mail</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder='user_email'
                            placeholderTextColor='#586069'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })} />
                    </View>
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>CPF</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder='user_cpf'
                            placeholderTextColor='#586069'
                            value={this.state.cpf}
                            onChangeText={cpf => this.setState({ cpf })} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Senha</Text>
                        <TextInput style={[styles.input]}
                            secureTextEntry={true}
                            placeholder="user_password"
                            placeholderTextColor='#586069'
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Confirmar Senha</Text>
                        <TextInput style={[styles.input]}
                            secureTextEntry={true}
                            placeholder="user_password"
                            placeholderTextColor='#586069'
                            value={this.state.confirmarPassword}
                            onChangeText={(password) => this.setState({ confirmarPassword })} />
                    </View>

                    <View style={[styles.editContainerCat, { paddingTop: 10 }]}>
                        <Text style={styles.textCategoria}>Endereço</Text>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>CEP</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_cep'
                            placeholderTextColor='#586069'
                            value={this.state.cep}
                            onChangeText={cep => this.setState({ cep })} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Rua</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_street'
                            placeholderTextColor='#586069'
                            value={this.state.endereco}
                            onChangeText={endereco => this.setState({ endereco })} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Bairro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_neighborhood'
                            placeholderTextColor='#586069'
                            value={this.state.bairro}
                            onChangeText={bairro => this.setState({ bairro })} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Complemento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_complemento'
                            placeholderTextColor='#586069'
                            value={this.state.complemento}
                            onChangeText={complemento => this.setState({ complemento })} />
                    </View>
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10
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
    },

    inputContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
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

    button: {
        marginBottom: 1
    },

    menuIcon: {
        position: 'absolute',
        color: 'black',
        padding: 19

    }
})