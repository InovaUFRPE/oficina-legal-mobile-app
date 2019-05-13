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
import { createStackNavigator } from 'react-navigation'
import {name as appName} from './app.json';
import ForgotPassword from './components/activities/ForgotPassword';
import RegisterMechanic from './components/activities/RegisterMechanic';
import EditProfileClient from './components/activities/EditProfileClient'
import AuthLoading from './components/activities/AuthLoading'
import Home from './components/activities/HomeClient';
import SearchWorkshop from './components/activities/SearchWorkshop'
import Routes from './components/navigation/Routes';
import choseProfile from './components/activities/ChoseProfile';





const Stack = createStackNavigator({
    
    Login:{
        screen: Login,
        navigationOptions:  {
            headerTintColor: '#eee1d6',
            headerTransparent: 'true'
        }
    },
    
    AuthLoading:{
        screen: AuthLoading,
        navigationOptions: {
            header: null
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
    SearchWorkshop:{
        screen: SearchWorkshop,
        
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

    Routes: {
        screen: Routes,
        navigationOptions: {
            header: null
        }
    }
})

AppRegistry.registerComponent(appName, () => Stack);
