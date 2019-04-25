import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator} from 'react-navigation'

import HomeMechanic from '../activities/HomeMechanic'
import EditProfileMechanic from '../activities/EditProfileMechanic'



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
    }
})