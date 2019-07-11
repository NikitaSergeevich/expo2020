import { createBottomTabNavigator } from 'react-navigation';

import * as routeNames from './routeNames';
import BottomTabBar from '../components/bottomTabBar'
import mainStackNavigator from './mainStackNavigator';
import marketStackNavigator from './marketStackNavigator';
import profileStackNavigator from './profileStackNavigator';

const BottomTabNavigator = createBottomTabNavigator(
  {
    [routeNames.MAIN]: {
      screen: mainStackNavigator
    },
    [routeNames.MARKET]: {
      screen: marketStackNavigator
    },
    [routeNames.PROFILE]: {
      screen: profileStackNavigator
    },
  },
  {
    tabBarComponent: BottomTabBar,
    initialRouteName: routeNames.MAIN,
    //initialRouteName: routeNames.PROFILE
  }
);

export default BottomTabNavigator;
