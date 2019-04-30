import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator} from 'react-navigation'

import HomeMechanic from '../activities/HomeMechanic'
import EditProfileMechanic from '../activities/EditProfileMechanic'
import {StackMechanic} from '../activities/AccountConfigMechanic'
import CustomDrawer from './CustomDrawerMenuMechanic'





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
    }
},

{contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
}})

