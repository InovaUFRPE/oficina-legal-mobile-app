import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default class TaskOnHome extends Component {
    render() {
        return (
            <TouchableOpacity>
            <View style={{ height: 250, width: 250, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2, borderRadius: 5 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={styles.informationText}>Cliente: {this.props.clientName}</Text>
                    <Text style={styles.informationText}>Concluido: 50%</Text>
                    <Text style={styles.informationText}>Vencimento: {this.props.date}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    informationText: {
        fontWeight: '700'
    }
})