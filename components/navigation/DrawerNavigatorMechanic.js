import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator} from 'react-navigation'

import HomeMechanic from '../activities/HomeMechanic'
import EditProfileMechanic from '../activities/EditProfileMechanic'
import {StackMechanic} from '../activities/AccountConfigMechanic'
import CustomDrawer from './CustomDrawerMenuMechanic'
import Diagnostic from '../activities/DiagnosticMechanic'
import ManagerTaks from '../activities/TasksManager'





export default createDrawerNavigator({
    HomeMechanic: {
        screen: HomeMechanic,
        navigationOptions:{
            title: 'Home'
        }
    },  
    
    EditProfileMechanic: {
        screen: EditProfileMechanic,
        navigationOptions:{
            title: 'Perfil'
        }
    },

    StackMechanic: {
        screen: StackMechanic
    },

    Diagnostic: {
        screen: Diagnostic,
        navigationOptions: {
            title: 'Diagnostico do Veículo'
        }
    },

    ManagerTaks: {
        screen: ManagerTaks
    }


},

{contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
}})

