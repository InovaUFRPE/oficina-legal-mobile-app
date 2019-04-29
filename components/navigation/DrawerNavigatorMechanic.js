import React from 'react'
import {Platform, Dimensions} from 'react-native'
import {createDrawerNavigator} from 'react-navigation'

import HomeMechanic from '../activities/HomeMechanic'
import EditProfileMechanic from '../activities/EditProfileMechanic'
import AccountConfigMechanic from '../activities/AccountConfigMechanic'
import AccountDesativationMechanic from '../activities/AccountDesativationMechanic'
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
    AccountConfigMechanic: {
        screen: AccountConfigMechanic,
        navigationOptions:{
            title: 'Configurações'
        }
    },
    
    AccountDesativationMechanic: {
        screen: AccountDesativationMechanic,
        navigationOptions: {
            title: 'Desativar Conta'
        }
    }


},

{contentComponent: ({ navigation }) => {
    return(<CustomDrawer navigation={navigation}/>)
}})

