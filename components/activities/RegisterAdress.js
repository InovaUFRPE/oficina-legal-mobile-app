import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';


export default class RegisterAdress extends Component {
    state =  {
        street: '',
        cep: '',
        complement: '',
        neighborhood: ''
    }
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
        }
        if(!this.ValidateCEP(this.state.cep)){
            alert("Erro\n\nO Formato do CEP é inválido.")
            return
        }
        alert("Pode seguir")
    }

    ValidateCEP(cep){
        alert(cep);
           if (cep.length == 0){
            return null;            
        };
        if (cep.length == 8) {
           return cep.charAt(0)+cep.charAt(1)+'.'+
                  cep.charAt(2)+cep.charAt(3)+cep.charAt(4)+'-'+   
                  cep.charAt(5)+cep.charAt(6)+cep.charAt(7);              
        }
        else {                          
           return null;
       };
        
};

    checkBlankCamps(){
        if(this.state.street == ""){
            this.errors.str += "\n- Rua"
        }
        if(this.state.cep == ""){
            this.errors.str += "\n- CEP"
        }
        if(this.state.neighborhood == ""){
            this.errors.str += "\n- Bairro"
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
                <View style={styles.inputContainer}>  
                    <Text style={styles.header}>
                        Insira seu endereço 
                    </Text>          
                    <TextInput placeholder='Rua' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value={this.state.street}
                        returnKeyType="next"
                        onChangeText={street => this.setState({ street })}
                        onSubmitEditing={() => this.cepInput.focus()}/>

                    <TextInput placeholder='CEP'  
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.cep} 
                        returnKeyType="next"
                        keyboardType='numeric'
                        onChangeText={cep => this.setState({ cep })}
                        ref={(input) => this.cepInput = input}
                        onSubmitEditing={() => this.complementInput.focus()}/>

                    <TextInput placeholder='Complemento (Opcional)' 
                        placeholderTextColor="#eee1d6" 
                        style={styles.input}
                        value= {this.state.complement} 
                        returnKeyType="next"
                        onChangeText={complement => this.setState({ complement })}
                        ref={(input) => this.complementInput = input}
                        onSubmitEditing={() => this.neighborhoodInput.focus()}/> 
                        

                    <TextInput placeholder='Bairro' 
                        placeholderTextColor="#eee1d6" style={styles.input}
                        value= {this.state.neighborhood} 
                        returnKeyType="go"
                        onChangeText={neighborhood => this.setState({ neighborhood })}
                        ref={(input) => this.neighborhoodInput = input}/> 
 
                                    
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