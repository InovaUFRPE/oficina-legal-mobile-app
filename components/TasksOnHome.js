import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default class TaskOnHome extends Component {
    render() {
        return (

            <View style={{ height: 140, width: 160, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 10 }}>
                <View style={{ flex: 2, borderRadius: 5 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{this.props.name}</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    nameText: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 5
    },

    nameContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: 160,
        height: 40,
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        bottom: 0
    }
})