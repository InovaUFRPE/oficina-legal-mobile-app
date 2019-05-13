import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  displayDataStorage = async () => {
    try {
        let user = await AsyncStorage.getItem('userId')
        return JSON.parse(user).key
    }catch(error){
        alert(error)
    }
}

  _bootstrapAsync = () => {
    const user = this.displayDataStorage()
    this.props.navigation.navigate(user ? 'Routes' : 'Login');
  };

  render() {
    return (
      <LinearGradient colors={['#2250d9', '#204ac8', '#1d43b7']}
      style = { styles.container }>
        <ActivityIndicator />
        <StatusBar barStyle="default"/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 180,

  },
})