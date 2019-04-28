import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text, Alert, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackButton from '../../busnisses/BackButton'

export default class HomeMechanic extends Component {

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
              
            return true;
          });
    }

    
    onBack = () => {
        Alert.alert(
            'Mensagem',
            'Voce deseja deslogar?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => this.props.navigation.navigate('Login')},
            ],
            {cancelable: false},
          );
    }

    render() {

        return(
            <BackButton onBack={this.onBack}>
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
            </BackButton>
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