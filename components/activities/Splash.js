import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


export default class Splash extends Component {
  render(){
    return(
      <View>
          <Text style={{fontSize: 40}}>HELLO I'M WORKING</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'space-between'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});