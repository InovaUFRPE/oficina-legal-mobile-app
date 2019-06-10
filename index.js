/**
 * @format
 */
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import ServiceProgress from './components/activities/ServiceProgressClient'
import Splash from './components/activities/Splash'
import Home from './components/activities/HomeClient'
import Layout from './components/activities/WorkShopLayout'
import Agendamento from './components/activities/Agendamento'


AppRegistry.registerComponent(appName, () => Navigator);
