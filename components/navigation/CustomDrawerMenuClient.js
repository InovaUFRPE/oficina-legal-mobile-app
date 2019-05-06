import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'


export default class CustomDrawerMenu extends React.Component {
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
              {text: 'Sim', onPress: () => this.props.navigation.navigate('Login')},
            ],
            {cancelable: false},
          );
    }

    navLink(nav, text){
        return(
            <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
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
                            USER_NAME
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    {this.navLink('HomeClient', 'Home')}
                    {this.navLink('EditProfileClient', 'Perfil')}
                    {this.navLink('VeicleHistory', 'Histórico do veículo')}
                </View>

                <View style={styles.configButtomContainer}>
                    {this.navLink('StackClient', 'Configurações')}
                    <TouchableOpacity style={{height: 50}} onPress={() => this.logOut()}>
                        <Text style={styles.link}>Sair</Text>
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
        paddingLeft: 14,
        marginTop: 15,
        marginLeft: 20,
        textAlign: 'left'
    },

    configButtomContainer: {
        height: 110,
        borderTopWidth: 1,
    }
})