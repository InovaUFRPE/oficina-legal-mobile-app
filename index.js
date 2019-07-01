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
import NewRegister from './components/activities/NewRegisterUser'

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <Navigator/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
