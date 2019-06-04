import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { ScrollView } from 'react-native-gesture-handler';
import TasksOnHome from '../TasksOnHome'
import { Agenda, LocaleConfig } from 'react-native-calendars';



LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: 'Hoje\'hoje'
};
LocaleConfig.defaultLocale = 'br';


export default class HomeMechanic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            services: ['Troca de Óleo', 'Balanceamento', 'Troca de Pneu', 'Troca de parabrisa', 'Reparo da porta', 'Reparo do vidro do motorista', 'Pintura do paralama', 'Lavagem a seco do motor',
                'Reparo do pneu', 'Troca da suspensao dianteira', 'Remoção da porta', 'Finalização Da Instalação do DVD', 'Troca do Volante', 'Reparo do Retrovisor', 'Retirada de Ferrugem'
            ],
            placas: ['KGU-2026', 'KGX-7592', 'KKT-6133', 'KJL-2843', 'KJO-5119', 'KGK-4193', 'KIH-1786', 'KJA-5355', 'KLT-8640',
                'KKW-4679', 'KIG-4131', 'KKG-1829'],
            modelos: ['Compass', 'Renegade', 'Onix', 'Uno', 'HB-20', 'Elantra', 'Polo', 'Gol', 'Jetta', 'Civic', 'Fusca', 'Kombi', 'Palio', 'Punto', 'HR-V', 'Camaro', 'Hilux', 'S-10']
        };
    }

    render() {

        return (

            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bars" size={30}
                        color="#ffffff"
                        style={styles.menuIcon}
                        onPress={() => this.props.navigation.toggleDrawer()} />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ffffff', padding: 15 }}>Mecânico</Text>
                    <Image
                        source={require('../../images/LogoAzulR.png')}
                        style={styles.logo}
                    />
                </View>
                <Agenda
                    items={this.state.items}
                    selected={new Date()}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
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
                    style={{ width: '100%' }}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.touchableOpacityStyle}
                    onPress={() => this.props.navigation.navigate('Diagnostic')}
                >
                    <FontAwesome
                        name="plus"
                        size={25}
                        style={{ color: '#ffffff', }}
                    />
                </TouchableOpacity>

            </View>

        )
    }
    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: this.state.services[Math.floor(Math.random() * this.state.services.length)],
                            placa: this.state.placas[Math.floor(Math.random()* this.state.placas.length)],
                            modelo: this.state.modelos[Math.floor(Math.random() * this.state.modelos.length)],
                        });
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={styles.item}>
                <Text>Tarefa: {item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Placa: {item.placa}</Text>
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
    container: {
        flex: 1,
        alignItems: 'center'
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#2250d9'
    },

    menuIcon: {
        padding: 19,
    },

    touchableOpacityStyle: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: "#2250d9",
        borderRadius: 32.5,
    },

    logo: {
        width: 50,
        height: 50,
        marginRight: 5
    },
    item: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginVertical: 10,
        height: 100
    },
    emptyDate: {
        height: 100,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        flex: 1,
        paddingTop: 30
    }

})