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
                <View style={styles.headerContainer}>
                    <FontAwesome
                        name="bars"
                        size={30}
                        style={{padding: 20, color: 'white', position: 'absolute', left: 1}}
                        onPress = {() => this.props.navigation.toggleDrawer()}
                    />
                    <Text style={styles.headerTitle}>Buscar Oficina</Text>
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
        width: '100%', 
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'center'},

    headerTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'white'
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