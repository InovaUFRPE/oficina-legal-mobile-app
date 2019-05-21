import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



export default class HomeMechanic extends Component {


    render() {

        return (

            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bars" size={30}
                        color="#ffffff"
                        style={styles.menuIcon}
                        onPress={() => this.props.navigation.toggleDrawer()} />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ffffff', padding: 15 }}>Mecânico</Text>
                    <Image
                        source={require('../../images/LogoAzulR.png')}
                        style={styles.logo}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.touchableOpacityStyle}
                    onPress={() => this.props.navigation.navigate('Diagnostic')}
                >
                    <FontAwesome
                        name="plus"
                        size={25}
                        style={{ color: '#ffffff', }}
                    />
                </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#2250d9'
    },

    menuIcon: {
        padding: 19,
    },

    touchableOpacityStyle: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: "#2250d9",
        borderRadius: 32.5,
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 5
    }

})