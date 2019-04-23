import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator} from 'react-navigation'

import HomeClient from '../activities/HomeClient'
import EditProfile from '../activities/EditProfile'



export default createDrawerNavigator({
    HomeClient: {
        screen: HomeClient,
        navigationOptions:{
            title: 'Home'
        }
    },

    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            title: 'Perfil'
        }
    },
    
})