import React, {Component} from 'react';
import {ConfirmPassword, validateCPF, validateEmail, RemoveEmptySpaces} from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackButton from '../../busnisses/BackButton'


export default class EditProfileClient extends Component {
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
        model: '',
        year: '',
        renavam: '',
        Vplate: '',
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
            this.state.model = RemoveEmptySpaces(this.state.model)
            this.state.year = RemoveEmptySpaces(this.state.year)
            this.state.renavam = RemoveEmptySpaces(this.state.renavam)
            this.state.Vplate = RemoveEmptySpaces(this.state.Vplate)
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
        this.props.navigation.navigate('HomeClient')
    }
    
    render() {
        return (
            
            <BackButton onBack = {this.onBack}>
            <ScrollView 
                style = { styles.container }>
                    <FontAwesome name="chevron-left" size={30} 
                    color="white" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.navigate('HomeClient')}/>
                

                <View style = { styles.container } style={styles.inputContainer}> 
                    
                    <Text style={styles.header}>USER_NAME</Text>
                    <Image
                    source={require('../../images/profile.jpg')}
                    style={styles.image}/>
                    
                    <TouchableOpacity style={styles.ButtonEdit}
                            onPress = {() => {}}>
                        <Text style={{fontSize: 18, color:'#eee1d6', width: 300, textAlign: 'center'}}>Alterar perfil</Text>    
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
            </BackButton>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee1d6' ,
    },

    header: {
        fontSize: 30,
        color: '#111e29',
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
        color: '#111e29',
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
        color: 'black',
        padding: 19

    }
})