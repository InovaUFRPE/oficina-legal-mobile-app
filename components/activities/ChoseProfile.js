import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator ,StatusBar, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {createSwitchNavigator} from 'react-navigation'


export default class ChoseProfile extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }
    
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'ChoseProfile' : 'Login');
      };



    render() {
        return (
                <LinearGradient 
                    colors={['#2250d9', '#204ac8', '#1d43b7']}
                    style = { styles.container }>


                    <View style={[styles.infoContainer, {justifyContent: 'center'}]} >
                        <View style={{marginTop: -150}}>
                            <Text style={styles.header}>Escolha com qual perfil deseja logar</Text>
                        </View>
                        
                        <TouchableOpacity 
                            style={[styles.buttonC, {backgroundColor: '#111e29'}]}
                            onPress={() => this.props.navigation.navigate('DrawerNavigatorClient')}>
                            <Text style={[styles.buttonText, {color: '#eee1d6'}]}>Cliente</Text>
                            <FontAwesome
                                name="user"
                                color="#eee1d6"
                                size={20}
                                />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.buttonM}
                            onPress={() => this.props.navigation.navigate('DrawerNavigatorMechanic')}>
                            <Text style={[styles.buttonText, {color:'#111e29'}]}>Mecanico</Text>
                            <FontAwesome
                                name="wrench"
                                color="#111e29"
                                size={20}
                                />
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

    header: {
        fontSize: 20,
        color: 'white',
        marginBottom: 100
    },

    infoContainer: {
        marginTop: 200,
        alignItems: 'center'
    },

    buttonC: {
        position: 'absolute',
        backgroundColor: '#eee1d6',
        height: 50,
        width: 300,
        bottom: 20,
        top: 50,
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    buttonM: {
        position: 'absolute',
        backgroundColor: '#eee1d6',
        height: 50,
        width: 300,
        top: 130,
        alignItems: 'center',
        borderTopLeftRadius:50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }


})



