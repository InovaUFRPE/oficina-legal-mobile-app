import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



export default class HomeMechanic extends Component {


    render() {

        return(

            <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']} 
                style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bars" size={30} 
                    color="#2250d9" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.toggleDrawer()}/>  
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#2250d9', padding: 15}}>Mecânico</Text>
                    <Image
                        source={require('../../images/LogoAzulR.png')}
                        style={styles.logo}
                        />                
                </View>
                <TouchableOpacity 
                style={styles.buttonWorkshop}
                onPress={() => {}}>
                        <Text style={styles.workshop}>Vai realizar um serviço?</Text>
                        <FontAwesome
                                name="wrench"
                                size={90}
                                position="absolute"
                                color="#111e29"
                                style={{alignItems: 'center', top: 110}}/>
                        <Text style={styles.workshop2}>Clique no card para ter acesso</Text>
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
        top: 190,
        fontSize: 20,
        fontWeight: 'bold'
    },
    workshop3:{
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