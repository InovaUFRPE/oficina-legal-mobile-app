import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {YellowBox} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export default class ChoseProfile extends Component {
    constructor(props) {
        super(props);
        this.displayDataStorage()
    }

    componentDidMountGetClientByUser = async (id) => {
        try{
        await axios.post("http://192.168.0.10:3306/api/cliente/idUsuario", { idUsuario:id })
            .then(response => { alert(JSON.stringify(response))
                    if(response.status == 201){
                        this.props.navigation.navigate('DrawerNavigatorClient')
                }
            })

        }catch(err){
            alert("Usuário cadastrado não possui conta como cliente.")
            return null
        }
    }
    
    
    displayDataStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('userToken')
            if(user != null){
                let id = await AsyncStorage.getItem('userId')
                this.componentDidMountGetClientByUser(JSON.parse(id))
            }
        }catch(error){
            alert(error)
        }
    }

    render() {
        YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);  // <- insert the warning text here you wish to hide.
        return (
                <View 
                    colors={['#2250d9', '#204ac8', '#1d43b7']}
                    style = { styles.container }>


                    <View style={[styles.infoContainer, {justifyContent: 'center'}]} >
                        <View style={{marginTop: -150}}>
                            <Text style={styles.header}>Escolha com qual perfil deseja logar</Text>
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.displayDataStorage()}>
                            <Text style={[styles.buttonText, {color: 'white'}]}>Cliente</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('DrawerNavigatorMechanic')}>
                            <Text style={[styles.buttonText, {color:'white'}]}>Mecanico</Text>
                        </TouchableOpacity>
                    
                    </View>
                </View>         
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5'
    },

    header: {
        fontSize: 20,
        color: '#2250d9',
        marginBottom: 100
    },

    infoContainer: {
        marginTop: 200,
        alignItems: 'center'
    },

    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#2250d9",
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },


})



