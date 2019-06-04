import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import moment from 'moment'


//As datas a serem vizualisadas no calendario
const _format = 'YYYY-MM-DD'
const _today = moment().subtract(7, 'days').format(_format)
const _maxDate = moment().add(7, 'days').format(_format)


//Traduçaõ do calendario
LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: 'Hoje\'hoje'
};
LocaleConfig.defaultLocale = 'br';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        '2019-06-02': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-03': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-04': [],
        '2019-06-05': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-06': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-07': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-08': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-09': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
        '2019-06-10': [{ name: 'Reparar o cabeçote', placa: 'ABC-1234', modelo: 'Gol', height: 100 }, { name: 'Trocar o oleo', placa: 'AAC-1244', modelo: 'Compass', height: 100 }],
      },
    };
  }

  render() {

    return (

      <Agenda
        items={this.state.items}
        minDate={_today}
        maxDate={_maxDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={(day)=> day}
        // callback that gets called when day changes while scrolling agenda list
        onDayChange={(day)=> day}
        markedDates={{
          '2019-06-04': { marked: true, dotColor: 'red' },
        }}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#666'},
      //    '2017-05-09': {textColor: '#666'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }


renderItem(item) {
  return (
    <View style={[styles.item, { height: item.height }]}>
      <Text>Tarefa: {item.name} </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Placa: {item.placa} </Text>
        <Text>Modelo: {item.modelo}</Text>
      </View>
    </View>
  );
}

renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
    </View>
  );
}

rowHasChanged(r1, r2) {
  return r1.name !== r2.name;
}

timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}
}

const styles = StyleSheet.create({
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