import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import defaultStyle from '../styles/Default'
import { getApiUrl } from '../../service/api'

const baseURL = getApiUrl();

export default class CustomDrawerMenu extends React.Component {
    constructor(props){
        super(props);
        this.getUserName()
    }
    state = {
        username: 'Username'
    }
    logOut(){
        Alert.alert(
            'Mensagem',
            'Voce deseja deslogar?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => {
                this.props.navigation.navigate('AppStack')
                this.cleanData()
            }},],
            {cancelable: false},
        );
    }

    desactiveAlert = () => {
        Alert.alert(
            'Mensagem',
            'Voce deseja dasativar sua conta?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => {
                this.desactive()
            }},],
            {cancelable: false},
        );
    }

    desactive = async() => {
        const id = await AsyncStorage.getItem('user')
        try{
            await axios.put(`${baseURL}/api/usuario/disable/${id}`)
                .then(this.props.navigation.navigate('Home'))
                .then(alert("Usuário Desabilitado"))
        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente2." + err)
            return null
        }
    }

    cleanData = () => {
        AsyncStorage.clear()
    }

    getUserName = async () => {
        const id = await AsyncStorage.getItem('user')
        try{
            await axios.get(`${baseURL}/api/cliente/findByIdUsuario/${id}`)
                .then(response =>  this.setState({ username: response.data.nome}) )
        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente2." + err)
            return null
        } 
    }

    navLink(nav, text, iconName){
        return(
            <TouchableOpacity style={{height: 50, flexDirection: 'row', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate(nav)}>
                <View style={{alignItems: 'center', width: 50}}>
                <Icon
                    name={iconName}
                    size={33}
                    style={{marginTop: 11, marginLeft: 10, color: 'black'}}
                />
                </View>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }
   
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <View style={styles.profile}>
                        <Image
                            source={require('../../images/profile.jpg')}
                            style={styles.profileImage}
                        />
                        <Text style={styles.usernameText}>
                            {this.state.username}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    {this.navLink('EditDataClient', 'Perfil', "md-contact")}
                    {/*{this.navLink('VeicleHistory','Histórico do veículo', "md-car")}*/}
                    {this.navLink('ServiceProgress', 'Progresso do serviço', "md-build")}
                    <TouchableOpacity style={{height: 50}} onPress={() => this.desactiveAlert()}>
                        <Text style={[styles.link, {marginLeft: 60}]}>Desativar conta</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.configButtomContainer}>
                    {/*{this.navLink('StackClient', 'Configurações', "md-code-working")}*/}
                    <TouchableOpacity style={{height: 50}} onPress={() => this.logOut()}>
                        <Icon                       
                            name="md-log-out"
                            size={30}
                            style={{position: 'absolute',marginTop: 21, marginLeft: 20, color: 'black'}}
                        />
                        <Text style={[styles.link, {marginLeft: 60}]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>          
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    userContainer: {
        height: 160,
        backgroundColor: defaultStyle.colors.primaryColor
    },

    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    profileImage: {
        width: 75,
        height: 75,
        marginLeft: 20,
    },

    usernameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'white'
    },

    buttonsContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10

    },

    link: {
        flex: 1,
        fontSize: 20,
        marginTop: 15,
        marginLeft: 10,
        textAlign: 'left'
    },

    configButtomContainer: {
        height: 75,
        borderTopWidth: 1,
    }
})