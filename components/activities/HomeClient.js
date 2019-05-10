import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text, Alert, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackButton from '../../busnisses/BackButton'

export default class HomeClient extends Component {

    onBack = () => {
        Alert.alert(
            'Mensagem',
            'Voce deseja deslogar?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => this.props.navigation.navigate('Login')},
            ],
            {cancelable: false},
          );
    }

    render() {

        return(

            <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bars" size={30} 
                    color="#2250d9" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.toggleDrawer()}/>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#2250d9'}}>Oficina Legal(Cliente)</Text>
                    <Image
                        source={require('../../images/LogoAzulR.png')}
                        style={styles.logo}
                        />
                </View>
                
                <TouchableOpacity 
                style={styles.buttonWorkshop}
                onPress={() => this.props.navigation.navigate('SeachWorkshop')}>
                        <Text style={styles.workshop}>Deseja encontrar uma oficina?</Text>
                        <FontAwesome
                                name="search"
                                size={90}
                                position="absolute"
                                color="#2250d9"
                                style={{alignItems: 'center', top: 90}}/>
                        <Text style={styles.workshop2}>Clique no card para ter acesso</Text>
                        <Text style={styles.workshop3}>a várias oficinas!</Text>
                    </TouchableOpacity>
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
    
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: 'white'
    },

    menuIcon: {
        paddingLeft: 20
    },

    buttonWorkshop: {
        width: 300,
        height: 380, 
        top: 40,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },

    workshop:{
        color: 'black',
        top: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop2: {
        color: 'black',
        top: 150,
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop3:{
        color: 'black',
        top: 155,
        fontSize: 20,
        fontWeight: 'bold'
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 5
    }

})