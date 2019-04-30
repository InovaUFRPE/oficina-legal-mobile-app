import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text, Alert, BackHandler, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackButton from '../../busnisses/BackButton'

export default class HomeClient extends Component {

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
              
            return true;
          });
    }

    
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
            <BackButton onBack={this.onBack}>
            <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']}
                style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bars" size={30} 
                    color="white" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.toggleDrawer()}/>                  
                </View>
                <Text style={{fontSize: 25, fontWeight: 'bold', position: 'absolute', color: 'white', paddingTop: 18, paddingRight: 80}}>HOME CLIENTE</Text>
                <TouchableOpacity style={styles.buttonWorkshop}>
                        <Text style={styles.workshop}>Deseja encontrar uma oficina?</Text>
                        <FontAwesome
                                name="search"
                                size={90}
                                position="absolute"
                                color="#111e29"
                                style={{alignItems: 'center', top: 90}}/>
                        <Text style={styles.workshop2}>Clique no card para ter acesso</Text>
                        <Text style={styles.workshop3}>a várias oficinas!</Text>
                    </TouchableOpacity>
            </LinearGradient>
            </BackButton>
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
        width: '100%',
        height: 70
    },

    menuIcon: {
        position: 'absolute',
        padding: 19,
    },

    buttonWorkshop: {
        width: 300,
        height: 380, 
        top: 40,
        backgroundColor: '#eee1d6',
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
        top: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop2: {
        top: 150,
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop3:{
        top: 155,
        fontSize: 20,
        fontWeight: 'bold'
    }

})