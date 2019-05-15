import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


export default class WorkShopLayout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']} style={styles.headerContainer}>
                    <Image
                        source={require('../../images/profileWorkShop.png')}
                        style={styles.image} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Workshop_Name
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            name="thumbs-up"
                            size={15}
                            color="white"
                            style={{ marginRight: 5, marginTop: 2 }}
                        />
                        <Text style={{ color: 'white' }}>
                            304
                        </Text>
                    </View>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                    <View style={styles.allButtonsContainer}>
                        <Button
                            icon={
                                <Icon
                                    name="calendar"
                                    size={30}
                                    color="white"
                                    style={styles.iconButton}
                                />
                            }
                            title="Agendamento"
                            buttonStyle={[styles.button, {backgroundColor: "#2250d9"}]}
                            titleStyle={styles.textButton}
                        />

                        <Button
                            icon={
                                <Icon
                                    name="arrow-left"
                                    size={30}
                                    color="white"
                                    style={styles.iconButton}
                                />
                            }
                            title="Voltar"
                            buttonStyle={[styles.button, {backgroundColor: "#1d43b7"}]}
                            titleStyle={styles.textButton}
                        />


                    </View>


                    <View style={styles.allButtonsContainer}>
                        <Button
                            icon={
                                <Icon
                                    name="user"
                                    size={30}
                                    color="white"
                                    style={styles.iconButton}
                                />
                            }
                            title="Mecanicos"
                            buttonStyle={[styles.button, {backgroundColor: "#2250d9"}]}
                            titleStyle={styles.textButton}
                        />

                        <Button
                            icon={
                                <Icon
                                    name="phone"
                                    size={30}
                                    color="white"
                                    style={styles.iconButton}
                                />
                            }
                            title="Contato"
                            buttonStyle={[styles.button, {backgroundColor: "#1d43b7"}]}
                            titleStyle={styles.textButton}
                        />
                    </View>
                </View>
                <Button
                    icon={
                        <Icon
                            name="comment"
                            size={30}
                            color="white"
                            style={styles.iconButton}
                        />
                    }
                    title="Deixe um comentário"
                    buttonStyle={{width: '98%', height:80, position: 'absolute', bottom: 1, marginLeft: 4}}
                    titleStyle={styles.textButton}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    headerContainer: {
        flex: 2,
        borderBottomWidth: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonContainer: {
        flex: 6,
        flexDirection: 'row',
        backgroundColor: '#E3FEFB'
    },

    allButtonsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '50%',
        height: '85%'
    },

    button: {
        marginTop: 5,
        width: 175,
        height: 200,
        backgroundColor: '#2250d9'
    },

    textButton: {
        fontSize: 20
    },

    iconButton: {
        paddingRight: 10
    },

    image: {
        width: 120,
        height: 120
    }
})