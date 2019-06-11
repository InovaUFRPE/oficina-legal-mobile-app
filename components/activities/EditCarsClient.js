import React, { Component } from 'react';
import { ConfirmPassword, validateCPF, validateEmail } from '../../busnisses/Validation'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import ClientCarComponent from '../ClientCarComponent'

const {width, height} = Dimensions.get('window')

export default class EditCarsClient extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{ fontSize: 25, paddingRight: 20, marginLeft: 20, fontWeight: 'bold', marginTop: 25 }}>
                        Aqui estão seus veículos cadastrados
                </Text>
                    <View style={{ alignItems: 'center' }}>
                        <ClientCarComponent />

                        <ClientCarComponent />

                        <ClientCarComponent />
                    </View>

                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        height: height
    },
    headerContainer: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})