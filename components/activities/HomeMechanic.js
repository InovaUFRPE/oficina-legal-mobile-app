import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text, Alert, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



export default class HomeMechanic extends Component {


    render() {

        return(

            <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']} 
                style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bars" size={30} 
                    color="white" 
                    style={styles.menuIcon}
                    onPress = {() => this.props.navigation.toggleDrawer()}/>                  
                </View>
                <Text style={{fontSize: 25, fontWeight: 'bold', position: 'absolute', color: 'white', padding: 15}}>HOME MECHANIC</Text>
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
        width: '100%',
        height: 70
    },

    menuIcon: {
        position: 'absolute',
        padding: 19,
    }
})