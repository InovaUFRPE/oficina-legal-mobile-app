import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native'
import Task from '../Tasks'
import AddTask from '../AddTask'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class DiagnosticMechanic extends Component {
    state = {
        tasks: [],

        totalPrice: 0,
        showAddTask: false,
    }

    addTask = task => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            serviceName: task.serviceName,
            serviceType: task.serviceType,
            price: task.price,
            date: task.date
        })

        const totalPrice = (parseFloat((task.price).replace(',', '.')) + parseFloat(this.state.totalPrice)).toFixed(2) /* Definindo o preço total */
        this.setState({ totalPrice })
        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        const item = this.state.tasks.find(item => item.id === id)
        const totalPrice = (parseFloat(this.state.totalPrice) - parseFloat(item.price)).toFixed(2)  /* Definindo o preço total */
        this.setState({ tasks }, this.filterTasks)
        this.setState({ totalPrice })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <AddTask isVisible={this.state.showAddTask}
                        onSave={this.addTask}
                        onCancel={() => this.setState({ showAddTask: false })} />
                    <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 10, width: '100%' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            size={30}
                            color='#1d43b7'
                        />
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '900' }}>Placa</Text>
                        </View>
                        <View>
                            <TextInput placeholder="ex: ABC-1234" placeholderTextColor='#1d43b7' style={styles.input} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '900' }}>Observações</Text>
                        </View>
                        <View>
                            <TextInput placeholder="Opcional" placeholderTextColor='#1d43b7' multiline style={styles.input} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '900' }}>Serviços</Text>
                        </View>
                        <ScrollView style={styles.scrollView} scrollEventThrottle={16}>
                            <FlatList data={this.state.tasks}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) => <Task {...item} onDelete={this.deleteTask} />} />
                        </ScrollView>
                    </View>

                    <View style={{ width: "95%", alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: R$ {this.state.totalPrice}</Text>
                        <TouchableOpacity style={styles.addServiceButton} onPress={() => this.setState({ showAddTask: true })}>
                            <Text style={{ fontWeight: 'bold', }}>Adicionar Serviço</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.textButton}>Solicitar Serviço</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        width: "95%",
        marginTop: 15,
    },

    input: {
        borderWidth: 0.5,
        borderRadius: 5
    },

    scrollView: {
        width: '100%',
        height: 250,
        borderWidth: 0.5,
        borderRadius: 5
    },

    addServiceButton: {
        width: "40%",
        height: 35,
        marginTop: 5,
        backgroundColor: 'lightblue',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    Button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#2250d9",
        alignSelf: 'stretch',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10
    },

    textButton: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    }
})
