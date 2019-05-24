/**
 * @format
 */
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import TaskMechanic from './components/activities/TasksManager'


AppRegistry.registerComponent(appName, () => TaskMechanic);
