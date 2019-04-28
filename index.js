/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Login from './components/activities/Login'
import RegisterUser from './components/activities/RegisterUser'
import RegisterAdress from './components/activities/RegisterAdress'
import RegisterVehicle from './components/activities/RegisterVehicle'
import LinkMechanicToWorkshop from './components/activities/LinkMechanicToWorkshop'
import { StackNavigator } from 'react-navigation'
import {name as appName} from './app.json';
import ForgotPassword from './components/activities/ForgotPassword';
import RegisterMechanic from './components/activities/RegisterMechanic';
import EditProfileClient from './components/activities/EditProfileClient'
import DrawerNavigatorClient from './components/navigation/DrawerNavigatorClient'
import DrawerNavigatorMechanic from './components/navigation/DrawerNavigatorMechanic'
import ChoseProfile from './components/activities/ChoseProfile'
import AuthLoading from './components/activities/AuthLoading'
import Home from './components/activities/HomeClient';




const Stack = StackNavigator({
    Login:{
        screen: Login,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
    RegisterUser:{
        screen: RegisterUser,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
    Home:{
        screen: Home,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
    RegisterAdress:{
        screen:RegisterAdress,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
    RegisterVehicle:{
        screen:RegisterVehicle,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },


    ForgotPassword:{
        screen: ForgotPassword,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },

    EditProfileClient:{
        screen: EditProfileClient,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true',
            headerTitle: 'Editar perfil',
        }
    },
    AuthLoading:{
        screen: AuthLoading,
        navigationOptions: {
            header: null
        }
    },

    LinkMechanicToWorkshop:{
        screen: LinkMechanicToWorkshop,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true',
        }
    },
    RegisterMechanic:{
        screen: RegisterMechanic,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true',
        }
    },

    DrawerNavigatorClient: {
        screen: DrawerNavigatorClient,
        navigationOptions: {
            header: null
        }
    },

    DrawerNavigatorMechanic: {
        screen: DrawerNavigatorMechanic,
        navigationOptions: {
            header: null
        }
    },
    ChoseProfile: {
        screen: ChoseProfile,  
        navigationOptions: {
            header: null
        }    
    }

})

AppRegistry.registerComponent(appName, () => Stack);
