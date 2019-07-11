import { createStackNavigator } from 'react-navigation';

import * as routeNames from './routeNames';
import ProfileContainer from '../containers/profileContainer';
import AuthorizationContainer from '../containers/authorizationContainer';
import RegistrationContainer from '../containers/registrationContainer';
import SmsConfirmContainer from '../containers/smsConfirmContainer';

const profileStackNavigator = createStackNavigator(
  {
    // [routeNames.PROFILE]: {
    //   screen: profileContainer
    // },
    [routeNames.AUTHORIZATION]: {
      screen: AuthorizationContainer
    },
    [routeNames.REGISTRATION]: {
      screen: RegistrationContainer
    },
    [routeNames.REGISTRATION_CONFIRM]: {
      screen: SmsConfirmContainer
    },
    [routeNames.PROFILE]: {
      screen: ProfileContainer
    }
  },
  {
    initialRouteName: routeNames.AUTHORIZATION,
    //initialRouteName: routeNames.PROFILE
  }
);

export default profileStackNavigator;
