import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {createStackNavigator} from 'react-navigation'
import AccountDesativationClient from './AccountDesativationClient'


export default class AccountConfigClient extends Component {


    render() {
        return (

            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>
                <View style={styles.headerContainer}>
                    <FontAwesome
                        name="bars"
                        size={30}
                        style={{padding: 20, color: '#2250d9', left: 1}}
                        onPress = {() => this.props.navigation.toggleDrawer()}
                    />
                    <Text style={styles.headerTitle}>Configurações</Text>
                    <Image
                        source={require('../../images/LogoAzulR.png')}
                        style={styles.logo}
                        />
                </View>

                <View style={styles.infoContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('AccountDesativationClient')}>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: 'white'},

    headerTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#2250d9'
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
        padding: 14
    },

    
    logo: {
        width: 50,
        height: 50,
        marginRight: 5
    }
})


export const StackClient = createStackNavigator({
    
    AccountConfigClient:{
        screen: AccountConfigClient,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },

    AccountDesativationClient:{
        screen: AccountDesativationClient,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
})