import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { validURL, RemoveEmptySpaces } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';


export default class RegisterMechanic extends Component {
    state =  {
        Hyperlink: '',
        description: '',
    }
    errors = {
        str: "\nCampo(s) em branco:\n",
    }

    Verify(){
        if (!this.checkBlankCamps()){
            alert(this.errors.str)
            this.errors.str = "\nCampo(s) em branco:\n"
            return
        }
        if (!validURL(this.state.Hyperlink)){
            alert("link inválido.")
            return
        }
        this.state.Hyperlink = RemoveEmptySpaces(this.state.Hyperlink)
        this.state.description = RemoveEmptySpaces(this.state.description)
    }


    checkBlankCamps(){
        if(this.state.Hyperlink == ""){
            this.errors.str += "\n- Link"
        }
        if(this.state.description == ""){
            this.errors.str += "\n- Descrição"
        }
        if(this.errors.str == "\nCampo(s) em branco:\n"){
            return true
        }
    }
    
    render() {
        return (
            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>
                <View style={styles.inputContainer}>  
                    <Text style={styles.header}>
                        Insira seu endereço 
                    </Text>          

                    <TextInput placeholder='Link de seu curriculo' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.Hyperlink} 
                        returnKeyType="next"
                        onChangeText={Hyperlink => this.setState({ Hyperlink })}
                        ref={(input) => this.HyperlinkInput = input}
                        onSubmitEditing={() => this.descriptionInput.focus()}/> 
                        

                    <TextInput placeholder='Descrição' 
                        placeholderTextColor="#eee1d6" style={styles.input}
                        value= {this.state.description} 
                        returnKeyType="go"
                        onChangeText={description => this.setState({ description })}
                        ref={(input) => this.descriptionInput = input}/> 
 
                                    
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