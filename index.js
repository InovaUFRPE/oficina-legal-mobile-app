/**
 * @format
 */
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import ServiceProgress from './components/activities/ServiceProgressClient'
import Splash from './components/activities/Splash'
import Drawer from './components/navigation/DrawerNavigatorClient'
import Layout from './components/activities/WorkShopLayout'
import Agendamento from './components/activities/Agendamento'
import EditCar from './components/activities/EditCarsClient'
import TabClient from './components/navigation/TabNavigatorCliente'
import Home from './components/navigation/DrawerNavigatorClient'

AppRegistry.registerComponent(appName, () => Home);
