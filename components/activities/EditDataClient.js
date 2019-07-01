import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigatorCliente from '../navigation/TabNavigatorCliente';
import defaultStyles from '../styles/Default'

const { height, width } = Dimensions.get('window')

export default class HomeMechanic extends Component {
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flexDirection:'row'}}>
                        <Icon name="md-arrow-back" size={30}
                            color="#ffffff"
                            style={styles.menuIcon}
                            onPress={() => this.props.navigation.goBack()} />
                        <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'Roboto-Regular', padding: 15, letterSpacing: 2 }}>Edição de Dados</Text>
                        </View>
                        <Image
                            source={require('../../images/LogoBranca.png')}
                            style={styles.logo}
                        />
                    </View>

                </View>
                <View style={{ flex: 1, width: '100%', backgroundColor: '#F5F5F5' }}>
                    <TabNavigatorCliente />
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
        alignItems: 'center',
        width: '100%',
        backgroundColor: defaultStyles.colors.primaryColor
    },

    menuIcon: {
        padding: 15,
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
        marginRight: 10
    },

    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
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