import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TabNavigatorMechanic from '../navigation/TabNavigatorMechanic'


export default class HomeMechanic extends Component {
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Icon name="bars" size={30}
                        color="#ffffff"
                        style={styles.menuIcon}
                        onPress={() => this.props.navigation.toggleDrawer()} />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ffffff', padding: 15 }}>Mecânico</Text>
                    <Image
                        source={require('../../images/LogoBranca.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={{ flex: 1,width: '100%', height: '100%', backgroundColor: '#F5F5F5'}}>
                    <TabNavigatorMechanic/>
                </View>
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
    },
    item: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginVertical: 10,
        height: 100
    },
    emptyDate: {
        height: 100,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        flex: 1,
        paddingTop: 30
    }

})