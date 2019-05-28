import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler';
import TasksOnHome from '../TasksOnHome'



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
                <ScrollView
                    scrollEventThrottle={16}
                >
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                            Aqui estao seus serviços pendentes
                        </Text>

                        <View style={{ height: 250, marginTop: 20, }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <TasksOnHome imageUri={require('../../images/cars/gol.jpg')} clientName='Joao Carlos' date='05/02/2019'/>
                                <TasksOnHome imageUri={require('../../images/cars/ecosport.jpg')} clientName='Maria Josi' date='13/07/2019'/>
                                <TasksOnHome imageUri={require('../../images/cars/compss.jpg')} clientName='Gabrielly Silva' date='21/03/2019'/>
                                <TasksOnHome imageUri={require('../../images/cars/onix.jpg')} clientName='Mateus Santos' date='07/04/2019'/>
                                <TasksOnHome imageUri={require('../../images/cars/toro.jpg')} clientName='Danielle Rosa' date='15/03/2019'/>
                            </ScrollView>
                        </View>
                    </View>


                </ScrollView>

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