import { createStackNavigator } from 'react-navigation';

import * as routeNames from './routeNames';
import marketContainer from '../containers/marketContainer';
import marketItemContainer from '../containers/marketItemContainer';

const marketStackNavigator = createStackNavigator({
  [routeNames.MARKET]: {
    screen: marketContainer
  },
  [routeNames.MARKET_ITEM]: {
    screen: marketItemContainer
  },
});

export default marketStackNavigator;
