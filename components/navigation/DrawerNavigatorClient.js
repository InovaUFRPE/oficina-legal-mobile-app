import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator, DrawerItems, SafeAreaView, ScrollView} from 'react-navigation'

import HomeClient from '../map/Map'
import EditProfileClient from '../activities/EditProfileClient'
import CustomDrawer from './CustomDrawerMenuClient'
import {StackClient} from '../activities/AccountConfigClient'
import {SearchWorkShopNavigation} from '../activities/SearchWorkshop'
import VeicleHistory from '../activities/VeicleHistory'
import Agendamento from '../activities/Agendamento'



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
    
    //Rotas das configurações
    StackClient: {
        screen: StackClient
    },

    SearchWorkShopNavigation: {
        screen: SearchWorkShopNavigation
    },

    VeicleHistory: {
        screen: VeicleHistory
    },

    Agendamento: {
        screen: Agendamento
    }

}, {contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
},  drawerOpenRoute: 'DrawerOpen', 
    drawerCloseRoute: 'DrawerClose', 
    drawerToggleRoute: 'DrawerToggle'})


