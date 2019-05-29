import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, FlatList } from 'react-native'
import Task from '../TasksMechanic'
import moment from 'moment'
import 'moment/locale/pt-br'
import imageCar from '../../images/cars/gol.jpg'
import Icon from 'react-native-vector-icons/FontAwesome5'



//done - description - estimateAt

export default class TaskMechanic extends Component {
    state = {
        tasks: [
            { id: Math.random(), description: 'Troca de oleo', estimateAt: new Date(), done: null },
            { id: Math.random(), description: 'Lataria', estimateAt: new Date(), done: null },
            { id: Math.random(), description: 'Piso do carro', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
            { id: Math.random(), description: 'Reparo do parabrisa', estimateAt: new Date(), done: null  },
        ]
    }


    toggleTask = id => {
        const tasks = this.state.tasks.map(task => {
            if (task.id === id) {
                task = {...task}
                task.done = task.done ? null : new Date()
            }
            return task
        })
        this.setState({ tasks });
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={imageCar}
                    style={styles.background}>
                    <TouchableOpacity onPress={() => this.navigation.goBack()} >
                        <Icon
                            name='arrow-left'
                            size={25}
                            color='#2250d9'
                            style={{ position: 'absolute', padding: 14 }}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Car_name</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask}/>} />
                </View>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.buttonText}>Enviar Atualização</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
