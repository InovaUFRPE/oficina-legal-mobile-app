import React, { Component } from 'react';
 
import { createSwitchNavigator } from 'react-navigation';

import DrawerNavigatorClient from './DrawerNavigatorClient'
import DrawerNavigatorMechanic from './DrawerNavigatorMechanic'
import ChoseProfile from '../activities/ChoseProfile';
 
export default Project = createSwitchNavigator(
{
 Home: {screen: ChoseProfile},

 DrawerNavigatorClient: { screen: DrawerNavigatorClient },
 
 DrawerNavigatorMechanic: { screen: DrawerNavigatorMechanic }
});
 
