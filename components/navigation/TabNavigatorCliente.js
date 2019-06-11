import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import EditCars from '../activities/EditCarsClient'
import EditProfile from '../activities/EditProfileClient'


export default createMaterialTopTabNavigator({
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            title: 'Dados Pessoais',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    },
    EditCars: {
        screen: EditCars,
        navigationOptions: {
            title: 'Dados do Veículo',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-build" color={tintColor} size={24} />
            )
        }
    }
}, {
        initialRouteName: 'EditProfile',
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