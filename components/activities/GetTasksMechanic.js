import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import TakeTask from '../TakeTaskMechanic'


export default class GetTasksMechanic extends Component {
  state = {
    tasks: [
      { id: Math.random(), initialHour: '06:00', finishHour: '09:25', serviceName: 'Troca de óleo', serviceDescription: 'Aplica dentro do capô do carro', carModel: 'Uno', carPlate: 'KFA-3219', finishDate: '09/08/2019' },
      { id: Math.random(), initialHour: '06:00', finishHour: '09:25', serviceName: 'Troca de Pneu', serviceDescription: 'Trocar pneu dianteiro esquerdo', carModel: 'Uno', carPlate: 'KFA-3219', finishDate: '09/08/2019' }
    ]
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.tasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <TakeTask {...item} toggleTask={this.toggleTask} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});