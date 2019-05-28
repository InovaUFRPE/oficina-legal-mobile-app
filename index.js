/**
 * @format
 */
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import RegisterVehicle from './components/activities/RegisterVehicle'

AppRegistry.registerComponent(appName, () => Navigator);
