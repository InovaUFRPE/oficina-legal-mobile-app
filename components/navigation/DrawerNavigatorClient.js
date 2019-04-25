import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator} from 'react-navigation'

import HomeClient from '../activities/HomeClient'
import EditProfileClient from '../activities/EditProfileClient'



export default createDrawerNavigator({
    HomeClient: {
        screen: HomeClient,
        navigationOptions:{
            title: 'Home'
        }
    },

    EditProfileClient: {
        screen: EditProfileClient,
        navigationOptions: {
            title: 'Perfil'
        }
    }, 
})