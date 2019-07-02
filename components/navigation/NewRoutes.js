import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { fromBottom } from 'react-navigation-transitions';

//Not Loged
import Login from '../activities/Login'
import LoginMechanic from '../activities/LoginMechanic'
import RegisterUser from '../activities/RegisterUser'
import RegisterAdress from '../activities/RegisterAdress'
import RegisterVehicle from '../activities/RegisterVehicle'
import ForgotPassword from '../activities/ForgotPassword'
import RegisterMechanic from '../activities/RegisterMechanic'
import LinkMechanicToWorkshop from '../activities/LinkMechanicToWorkshop'
import NewRegister from '../activities/NewRegisterUser'

//Auth
import AuthLoading from '../activities/AuthLoading'

//LoggedIn
import ChoseProfile from '../activities/ChoseProfile';

//LoggedInClient
import DrawerNavigatorClient from './DrawerNavigatorClient'

//LoggendInMechanic
import DrawerNavigatorMechanic from './DrawerNavigatorMechanic'


const defaultHeader = {
    headerTintColor: '#eee1d6',
    headerTransparent: 'true'
}

const blueHeader = {
    headerTintColor: '#2250d9',
    headerTransparent: 'true'
}

const AppStack = createStackNavigator({
    Home: { screen: Login, navigationOptions: { header: null } },
    LoginMechanic: { screen: LoginMechanic, navigationOptions: { header: null} },
    RegisterUser: { screen: RegisterUser, navigationOptions:  { defaultHeader, title: 'Registro' } },
    NewRegister: { screen: NewRegister, navigationOptions: defaultHeader },
    RegisterAdress: { screen: RegisterAdress, navigationOptions: defaultHeader },
    RegisterVehicle: { screen: RegisterVehicle, navigationOptions: blueHeader },
    ForgotPassword: { screen: ForgotPassword, navigationOptions: defaultHeader },
    RegisterMechanic: { screen: RegisterMechanic, navigationOptions: defaultHeader },
    LinkMechanicToWorkshop: { screen: LinkMechanicToWorkshop, navigationOptions: defaultHeader },
},
    {
        initialRouteName: 'Home',
        transitionConfig: () => fromBottom(),
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