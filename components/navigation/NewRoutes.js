import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

//Nao Logado
import Login from '../activities/Login'
import RegisterUser from '../activities/RegisterUser'
import RegisterAdress from '../activities/RegisterAdress'
import RegisterVehicle from '../activities/RegisterVehicle'
import ForgotPassword from '../activities/ForgotPassword'
import RegisterMechanic from '../activities/RegisterMechanic'
import LinkMechanicToWorkshop from '../activities/LinkMechanicToWorkshop'

//Auth
import AuthLoading from '../activities/AuthLoading'

//LoggedIn
import ChoseProfile from '../activities/ChoseProfile';
import DrawerNavigatorClient from './DrawerNavigatorClient'
import DrawerNavigatorMechanic from './DrawerNavigatorMechanic'


const defaultHeader = {
    headerTintColor: '#eee1d6',
    headerTransparent: 'true'
}

const AppStack = createStackNavigator({
    Home:             { screen: Login, navigationOptions: { header: null }},
    RegisterUser:     { screen: RegisterUser, navigationOptions: defaultHeader },
    RegisterAdress:   { screen: RegisterAdress, navigationOptions: defaultHeader },
    RegisterVehicle:  { screen: RegisterVehicle, navigationOptions: defaultHeader },
    ForgotPassword:   { screen: ForgotPassword, navigationOptions: defaultHeader },
    RegisterMechanic: { screen: RegisterMechanic, navigationOptions: defaultHeader },
    LinkMechanicToWorkshop: { screen: LinkMechanicToWorkshop, navigationOptions: defaultHeader },
})

const AuthStack = createSwitchNavigator({
    ChoseProfile: ChoseProfile,
    DrawerNavigatorClient: DrawerNavigatorClient,
    DrawerNavigatorMechanic: DrawerNavigatorMechanic
})

export default Switch = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        AppStack: AppStack,
        AuthStack: AuthStack
    },
    {
        initialRouteName: 'AuthStack'
    }
)