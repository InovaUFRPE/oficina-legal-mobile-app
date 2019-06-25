import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import Task from '../TaskForMechanic'
import moment from 'moment'
import 'moment/locale/pt-br'
import imageCar from '../../images/cars/gol.jpg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getApiUrl } from '../../service/api'

const baseURL = getApiUrl();

//Visualização das tarefas atribuidas ao mecanico

export default class TaskMechanic extends Component {
    state = {
        listOs: [{}],
        listOfOs: [{}],
        idMechanic: 0,
    }
    componentDidMount = async () => {
        let idUser = await AsyncStorage.getItem("user")
        await this.getMechanic(idUser)
        await this.getOs()
        await this.mountData()
    }

    getMechanic = async (id) => {
        const mec = await Axios.get(`${baseURL}/api/mecanico/find/user/${id}`)
        this.setState({ idMechanic: mec.data.id })
    }

    getOs = async () => {
        const os = await Axios.get(`${baseURL}/api/mecanicoOS/findAll/mecanico/${this.state.idMechanic}`)
        this.setState({listOs: os.data}) 
    }

    mountData = () => {
        const os = this.state.listOs
        const listOfOs = []
        os.map(async (value, index) => {
            const serviceOrder = await Axios.get(`${baseURL}/api/os/${value.idOS}`)
            listOfOs[index] = serviceOrder.data
            this.setState({ listOfOs: listOfOs })
        })
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        const item = this.state.tasks.find(item => item.id === id)
        const totalPrice = (parseFloat(this.state.totalPrice) - parseFloat(item.price)).toFixed(2)  /* Definindo o preço total */
        this.setState({ tasks }, this.filterTasks)
        this.setState({ totalPrice })
    }


    toggleTask = id => {
        const tasks = this.state.tasks.map(task => {
            if (task.id === id) {
                task = { ...task }
                task.done = task.done ? null : new Date()
            }
            return task
        })
        this.setState({ tasks });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tasksContainer}>
                    <ScrollView>
                        <FlatList data={this.state.listOfOs}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>} />
                    </ScrollView>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    background: {
        flex: 3,
        borderBottomWidth: 1,
        borderColor: 'blue',
        borderRadius: 20
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    title: {
        color: '#fff',
        fontSize: 40,
        marginLeft: 10,
        marginBottom: 20
    },

    tasksContainer: {
        flex: 7,
    },

    Button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#2250d9",
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    }
})
