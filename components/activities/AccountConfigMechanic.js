import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import BackButtom from '../../busnisses/BackButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {createStackNavigator} from 'react-navigation'
import AccountDesativationMechanic from './AccountDesativationMechanic'



export default class AccountConfigMechanic extends Component {


    render() {
        return (

            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>
                <FontAwesome name="arrow-left" size={20} 
                color="white"
                style={styles.backIcon} 
                onPress = {() =>  this.props.navigation.navigate('HomeMechanic')}/>

                <View style={styles.headerContainer} >
                    <Text style={styles.header}>CONFIGURAÇÕES MECANICO</Text>
                </View>

                <View style={styles.infoContainer}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AccountDesativationMechanic')}>
                        <Text style={styles.buttonText}>Desativar Conta</Text>
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
    },
    headerContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoContainer: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white'
    },

    button: {
        padding: 20,
        backgroundColor: '#1d43b7',
        width: '100%',
        borderWidth: 0.5
    },

    buttonText: {
        fontSize: 15,
        color: 'white'
    },

    backIcon: {
        position: 'absolute',
        padding: 14
    }
})

export const StackMechanic = createStackNavigator({
    
    AccountConfigMechanic:{
        screen: AccountConfigMechanic,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },

    AccountDesativationMechanic:{
        screen: AccountDesativationMechanic,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
})