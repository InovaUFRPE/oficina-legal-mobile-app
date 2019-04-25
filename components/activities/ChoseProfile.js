import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RemoveEmptySpaces, validateEmail} from '../../busnisses/Validation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
    state = {
        password: '',
        username: '',
    };
    errors = {
        str: "\nCampo(s) em branco:\n",
    }


    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        if(!validateEmail(this.state.username)){
            alert("Email inválido.")
            return
        }
        this.state.username = RemoveEmptySpaces(this.state.username)
        this.state.password = RemoveEmptySpaces(this.state.password)
        this.props.navigation.navigate('DrawerNavigator')
        
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

                <View style={{marginTop: 100}}>
                    <Text style={styles.header}>Escolha com qual perfil deseja logar</Text>
                </View>

                <View style={styles.infoContainer} >
                    
                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: 'gray'}]}
                        onPress={() => this.props.navigation.navigate('DrawerNavigatorClient')}>
                        <Text style={[styles.buttonText, {color: 'white'}]}>Cliente</Text>
                        <FontAwesome
                            name="user"
                            color="white"
                            size={20}
                            />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('DrawerNavigatorMechanic')}>
                        <Text style={styles.buttonText}>Mecanico</Text>
                        <FontAwesome
                            name="wrench"
                            color="black"
                            size={20}
                            />
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
        alignItems: 'center',
        justifyContent: 'flex-start',

    },

    header: {
        fontSize: 20,
        color: 'white',
        marginBottom: 100
    },

    infoContainer: {
        marginTop: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        padding: 20,
        backgroundColor: 'white',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
        
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }


})