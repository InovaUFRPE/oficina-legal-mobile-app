import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
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
                this.props.navigation.navigate('LoginMechanic');
                this.cleanData()}
              }
            ],
            {cancelable: false},
          );
    }

    cleanData = () => {
        AsyncStorage.clear()
    }

    getUserName = async () => {
        let id = await AsyncStorage.getItem('user')
        const mec = await Axios.get(`${baseURL}/api/mecanico/find/user/${id}`)
        this.setState({ username: mec.data.nome})
    }

    navLink(nav, text, iconName){
        return(
            <TouchableOpacity style={{height: 50, flexDirection: 'row', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate(nav)}>
                <View style={{alignItems: 'center', width: 50}}>
                    <Icon
                        name={iconName}
                        size={30}
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
                    {this.navLink('EditProfileMechanic', 'Perfil', 'user')}
                </View>

                <View style={styles.configButtomContainer}>
                    {this.navLink('StackMechanic', 'Configurações', 'cog')}
                    <TouchableOpacity style={{height: 50}} onPress={() => this.logOut()}>
                        <Icon                       
                                name="angle-left"
                                size={30}
                                style={{position: 'absolute',marginTop: 11, marginLeft: 20, color: 'black'}}
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
        backgroundColor: '#2250d9'
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
        height: 110,
        borderTopWidth: 1,
    }
})