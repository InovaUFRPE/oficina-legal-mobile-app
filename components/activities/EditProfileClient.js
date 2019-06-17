import React, { Component } from 'react';
import { ConfirmarSenha, validateCPF, validateEmail } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, BackHandler } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';



export default class EditProfileClient extends Component {
    constructor(props) {
        super(props);
        this.displayDataStorage()
    }

    state = {
        nome: '',
        idCliente: 0,
        senha: '',
        confirmarSenha: '',
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
            senha: ''
        },
        login: '',
        email: '',
        
    }
    stateDB = {}

    errors = {
        str: "\nCampo(s) em branco:\n",
        str2: "\nErro(s)\n"
    }

    Verify() {
        if (!this.checkBlankCamps()) {
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        else if (this.VerifyErrors()) {
            this.state.nome = this.state.nome.trim()
            this.state.login = this.state.login.trim()
            this.state.senha = this.state.senha.trim()
            this.state.confirmarSenha = this.state.confirmarSenha.trim()
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
        } else {
            alert(this.errors.str2)
            this.errors.str2 = "\nErro(s)\n"
            return
        }
    }

    saveClient = async () => {
        try {
            await axios.put(`http://192.168.0.10:4000/api/cliente/update/${this.state.cliente.id}`, this.state)
                .then(response => alert(JSON.stringify(response.data)))
        } catch{
            alert("Não foi possível salvar o cliente")
        }
    }

    save = () => {
        if (this.stateDB != this.state) {
            this.saveClient()
        }
        else {
            alert("O banco de dados já contém as informações atuais")
        }
    }

    populateBlankCamps = () => {
        this.state.usuario.login = this.state.login,
        this.state.usuario.email = this.state.email
        this.setState(
            {
                nome: this.state.cliente.nome,
                cpf: this.state.cliente.cpf,
                endereco: this.state.cliente.endereco,
                bairro: this.state.cliente.bairro,
                cep: this.state.cliente.cep,
                complemento: this.state.cliente.complemento,
                cliente: {}
            })
    }

    getUser= async () => {
        const id = await AsyncStorage.getItem('user')
        this.state.usuario.idUsuario = id;
        try{
            await axios.post("http://192.168.0.10:4000/api/usuario/usuario", { idUsuario:id })
                .then(response => this.setState({login: response.data.user.login, email: response.data.user.email}))
            this.getClient()
        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }

    getClient = async () => {
        const id = await AsyncStorage.getItem('user')
        try{
            await axios.post("http://192.168.0.10:4000/api/cliente/usuario", { idUsuario:id })
                .then(response => this.setState({ cliente: response.data}))
            this.populateBlankCamps()
        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }

    displayDataStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('userToken');
            if (user != null) {
                this.getUser();
                this.stateDB = this.state;
            } else {
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            alert(error)
        }
    }

    VerifyErrors() {
        if (!ConfirmarSenha(this.state.senha, this.state.confirmarSenha)) {
            this.errors.str2 += "\n- As senhas não conferem."
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
        if (this.state.cpf == "") {
            this.errors.str += "\n- CPF"
        }
        if (this.state.email == "") {
            this.errors.str += "\n- Email"
        }
        if (this.state.senha == "") {
            this.errors.str += "\n- Senha"
        }
        if (this.state.confirmarSenha == "") {
            this.errors.str += "\n- ConfirmarSr senha"
        }
        if (this.errors.str == "\nCampo(s) em branco:\n") {
            return true
        }
    }

    onBack = () => {
        this.props.navigation.navigate('HomeClient')
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

                        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>{this.state.name}</Text>

                    </View>
                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='user_login'
                            placeholderTextColor='#586069'
                            value={this.state.usuario.login}
                            onChangeText={login => this.state.usuario.login} />
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.inputDescription}>E-mail</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder='user_email'
                            placeholderTextColor='#586069'
                            value={this.state.usuario.email}
                            onChangeText={email => this.state.usuario.email} />
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
                        <TextInput
                            style={styles.input}
                            placeholder='user_senha'
                            placeholderTextColor='#586069'
                            value={this.state.usuario.senha}
                            onChangeText={senha => this.state.usuario.senha} />
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