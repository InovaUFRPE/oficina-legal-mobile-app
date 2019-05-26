/**
 * @format
 */
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Switch from './components/navigation/NewRoutes'
import Map from './components/map/Map'


AppRegistry.registerComponent(appName, () => Navigator);
