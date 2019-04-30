import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator, DrawerItems, SafeAreaView, ScrollView} from 'react-navigation'

import HomeClient from '../activities/HomeClient'
import EditProfileClient from '../activities/EditProfileClient'

import CustomDrawer from './CustomDrawerMenuClient'
import {StackClient} from '../activities/AccountConfigClient'
import SeachWorkshop from '../activities/SearchWorkshop'
import VeicleHistory from '../activities/VeicleHistory'



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

    StackClient: {
        screen: StackClient
    },

    SeachWorkshop: {
        screen: SeachWorkshop
    },

    VeicleHistory: {
        screen: VeicleHistory
    },

}, {contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
}})


