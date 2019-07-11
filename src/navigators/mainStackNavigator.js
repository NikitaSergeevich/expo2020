import { createStackNavigator } from 'react-navigation';

import * as routeNames from './routeNames';
import infoContainer from '../containers/infoContainer';

const mainStackNavigator = createStackNavigator({
  [routeNames.INFO]: {
    screen: infoContainer
  },
});

export default mainStackNavigator;
