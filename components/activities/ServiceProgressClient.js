import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Task from '../TaskServicesClient'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class ServiceProgressClient extends Component {
    state = {
        tasks: [
            { id: Math.random(), serviceName: "Troca de Pneu", date: "03/26/19", isDone: "concluido" },
            { id: Math.random(), serviceName: "Troca de Óleo", date: "03/26/19", isDone: "concluido" },
            { id: Math.random(), serviceName: "Pintura do capô", date: "03/26/19", isDone: "concluido" },
            { id: Math.random(), serviceName: "Troca da maçaneta", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Suspensão", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Ar-condicionado", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
            { id: Math.random(), serviceName: "Jante Dianteira", date: "03/26/19", isDone: "pendente" },
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Icon name="arrow-left"
                            size={20}
                            color="#fff"
                            style={{ paddingBottom: 50, paddingLeft: 15 }}
                            onPress={() => this.props.navigation.goBack()} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Progresso do Serviço</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.headerInformation}>Oficina_name</Text>
                        <Text style={[styles.headerInformation, {marginRight: 20}]}>JKS-2112</Text>
                    </View>

                </View>
                <ScrollView style={{ marginTop: 10 }}>
                    <FlatList data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </ScrollView>

            </View>
        )
    }
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },

    header: {
        width: width,
        height: height / 4,
        justifyContent: 'flex-end',
        backgroundColor: '#1d43b7'
    },

    headerTitle: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 20,
        fontWeight: '500'
    },

    headerInformation: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 25,
        marginBottom: 10,
    }
})