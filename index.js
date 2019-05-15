/**
 * @format
 */
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import WorkShopLayout from './components//activities/WorkShopLayout'


AppRegistry.registerComponent(appName, () => Navigator);
