import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TaskManager from '../activities/TasksManager'
import GetTask from '../activities/GetTasksMechanic'
import Icon from 'react-native-vector-icons/Ionicons'


export default createMaterialTopTabNavigator({
    TaskManager: {
        screen: TaskManager,
        navigationOptions: {
            title: 'Seus serviços',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    },
    GetTask: {
        screen: GetTask,
        navigationOptions: {
            title: 'Pegar serviço',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-build" color={tintColor} size={24} />
            )
        }
    }
}, {
        initialRouteName: 'TaskManager',
        tabBarOptions:{
            activeTintColor: 'blue',
            inactiveTintColor: 'lightgray',
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                backgroundColor: 'blue'
            }
        }
    })