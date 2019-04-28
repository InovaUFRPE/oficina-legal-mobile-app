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


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'ChoseProfile' : 'Login');
  };

  // Render any loading content that you like here
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