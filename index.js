/**
 * @format
 */

import React from 'react'
import { Provider } from 'react-redux'
import Navigator from './components/navigation/NewRoutes'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './components/navigation/DrawerNavigatorClient'
import storeConfig from './store/storeConfig'
import Agendamentodois from './components/activities/OldAgendamento'

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <Navigator/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
