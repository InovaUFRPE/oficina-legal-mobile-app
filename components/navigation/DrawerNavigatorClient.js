import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator, DrawerItems, SafeAreaView, ScrollView} from 'react-navigation'

import HomeClient from '../activities/HomeClient'
import EditProfileClient from '../activities/EditProfileClient'
import AccountConfigClient from '../activities/AccountConfigClient'
import CustomDrawer from './CustomDrawerMenuClient'
import AccountDesativationClient from '../activities/AccountDesativationClient'


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
    
    AccountConfigClient: {
        screen: AccountConfigClient,
        navigationOptions: {
            title: 'Configurações'
        }
    },

    AccountDesativationClient: {
        screen: AccountDesativationClient,
        navigationOptions: {
            title: 'Desativar Conta'
        }
    }

}, {contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
}})


