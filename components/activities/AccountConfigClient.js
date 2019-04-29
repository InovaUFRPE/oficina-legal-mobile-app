import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import BackButtom from '../../busnisses/BackButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'




export default class AccountConfigClient extends Component {


    onBack = () => {
        this.props.navigation.navigate('HomeClient')
    }

    render() {
        return (
            <BackButtom onBack = {this.onBack}>
            <LinearGradient 
                colors={['#2250d9', '#204ac8', '#1d43b7']}
                style = { styles.container }>
                <FontAwesome name="chevron-left" size={30} 
                color="white"
                style={styles.backIcon} 
                onPress = {() =>  this.props.navigation.navigate('HomeClient')}/>

                <View style={styles.headerContainer} >
                    <Text style={styles.header}>CONFIGURAÇÕES CLIENTE</Text>
                </View>

                <View style={styles.infoContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('AccountDesativationClient')}>
                        <Text style={styles.buttonText}>Desativar Conta</Text>
                    </TouchableOpacity>
                </View> 

            </LinearGradient>
            </BackButtom>
        
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