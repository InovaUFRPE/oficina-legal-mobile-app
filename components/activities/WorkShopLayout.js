import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
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

                <ScrollView style={styles.buttonContainer}>
                    <Button
                        icon={
                            <Icon
                                name="calendar"
                                size={30}
                                color="white"
                                style={[styles.iconButton]}
                            />
                        }
                        onPress={() => this.props.navigation.navigate('Agendamento')}
                        title="Agendamento"
                        titleStyle={styles.textButton}
                        buttonStyle={styles.button}
                    />

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
                        titleStyle={styles.textButton}
                        buttonStyle={styles.button}
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
                        titleStyle={styles.textButton}
                        buttonStyle={styles.button}
                    />

                    <Button
                        icon={
                            <Icon
                                name="star"
                                size={30}
                                color="white"
                                style={styles.iconButton}
                            />
                        }
                        title="Especialidades"
                        titleStyle={styles.textButton}
                        buttonStyle={styles.button}
                    />

                    <Button
                        icon={
                            <Icon
                                name="comments"
                                size={30}
                                color="white"
                                style={styles.iconButton}
                            />
                        }
                        title="Comentarios"
                        titleStyle={styles.textButton}
                        buttonStyle={styles.button}
                    />
                </ScrollView>

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
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonContainer: {
        backgroundColor: 'blue'
    },

    allButtonsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '50%',
        height: '85%'
    },

    button: {
        borderBottomWidth: 1,
        height: 100,
        backgroundColor: '#2250d9'
    },

    textButton: {
        paddingTop: 25,
        fontSize: 25
    },

    iconButton: {
        position: 'absolute',
        paddingBottom: 40
    },

    image: {
        width: 120,
        height: 120
    }
})