import { createSwitchNavigator, createAppContainer } from 'react-navigation';

//import { AuthNavigator } from './AuthStackNavigator';
//import DrawerWrapper from './DrawerNavigator';
import Splash from '../containers/splashContainer';
import bottomTabNavigator from './bottomTabNavigator';
import * as routeNames from './routeNames';

export const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            [routeNames.SPLASH]: Splash,
            //[routeNames.AUTH]: AuthNavigator,
            [routeNames.BOTTOMTAB]: bottomTabNavigator
        },
        {
            initialRouteName: routeNames.SPLASH
        }
    )
);
