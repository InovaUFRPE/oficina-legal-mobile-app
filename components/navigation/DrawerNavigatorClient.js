import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator, DrawerItems, SafeAreaView, ScrollView} from 'react-navigation'

import HomeClient from '../activities/HomeClient'
import EditProfileClient from '../activities/EditProfileClient'
import CustomDrawer from './CustomDrawerMenuClient'
import {StackClient} from '../activities/AccountConfigClient'
import {SearchWorkShopNavigation} from '../activities/SearchWorkshop'
import VeicleHistory from '../activities/VeicleHistory'
import Agendamento from '../activities/Agendamento'
import ServiceProgress from '../activities/ServiceProgressClient'
import WorkShopLayout from '../activities/WorkShopLayout'

export default createDrawerNavigator({
    HomeClient: {
        screen: HomeClient,
        navigationOptions:{
            title: 'Home'
        }
    },

    EditProfileClient: {
        screen: EditProfileClient,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: "locked-closed",
          })
    },
    
    //Rotas das configurações
    StackClient: {
        screen: StackClient,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: "locked-closed",
          })
    },

    SearchWorkShopNavigation: {
        screen: SearchWorkShopNavigation
    },

    VeicleHistory: {
        screen: VeicleHistory,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: "locked-closed",
          })
    },

    WorkShopLayout: {
        screen: WorkShopLayout,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: "locked-closed",
          })
    },

    Agendamento: {
        screen: Agendamento,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: "locked-closed",
          })
    },

    ServiceProgress: {
        screen: ServiceProgress,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: "locked-closed",
          })
    }

}, {contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
},  drawerOpenRoute: 'DrawerOpen', 
    drawerCloseRoute: 'DrawerClose', 
    drawerToggleRoute: 'DrawerToggle'})


