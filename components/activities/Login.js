import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Login extends Component {
    state = {
        password: '',
        username: '',
    };
    errors = {
        str: "\nCampo(s) em branco:\n",
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
        }else{
            this.state.username = this.RemoveEmptySpaces(this.state.username)
            this.state.password = this.RemoveEmptySpaces(this.state.password)
        }
    }

    checkBlankCamps(){
        if(this.state.username == ""){
            this.errors.str += "\n- Usuário"
        }
        if(this.state.password == ""){
            this.errors.str += "\n- Senha"
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

                <View style={styles.infoContainer} >
                    <TextInput style={styles.IptEmail}
                        placeholder="Digite seu username ou email."
                        placeholderTextColor= 'white'
                        keyboardType='email-address'
                        value={this.state.username}
                        onChangeText={ (username) => this.setState({ username }) }>
                    </TextInput>
                    <TextInput style={styles.IptPassword}
                    secureTextEntry={true} 
                    placeholderTextColor= 'white'
                    placeholder="Digite sua senha."
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({ password }) }/>
                    
                    <View style={styles.buttonContainer}
                    onPress={() => this.Verify()}>
                        <TouchableOpacity style={styles.buttonLogin}>
                            <Text style={styles.login}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRegister}
                        onPress={() => this.props.navigation.navigate('RegisterUser')}>
                            <Text style={styles.register}>Registar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonForgot}>
                        <Text style={styles.forgot}>Esqueci minha senha!</Text> 
                    </TouchableOpacity>
                </View>
                
            </LinearGradient>
            /* <View> 
                
                
            </View> */
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    infoContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 170,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer:{
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: -130,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IptEmail:{
        top: 5,
        height: 70,
        width: 310,
        bottom: 10,
        fontSize: 15,
        borderBottomColor: '#eee1d6',
        paddingLeft: 10,
        paddingTop: 35,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
        borderBottomWidth: 1,
        
    },
    IptPassword: {
        top: 10,
        height: 70,
        width: 310,
        left: 0,
        fontSize: 15,
        bottom: 10,
        paddingLeft: 10,
        paddingTop: 35,
        borderBottomColor: '#eee1d6',
        borderBottomWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'white',
    },
    buttonLogin: {
        backgroundColor: '#111e29' ,
        height: 40,
        width: 100,
        left: 70,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    login:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#eee1d6',
        top: 8,
    },
    register:{
        top: 8,
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#111e29', 
    }, 
    buttonRegister: {
        position: 'absolute',
        backgroundColor: '#eee1d6',
        height: 40,
        width: 100,
        left: 20,
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonForgot: {
        top: 130, 
        fontSize: 20
    },

    forgot:{
        color: '#eee1d6',
        borderBottomColor: '#eee1d6',
    }

})