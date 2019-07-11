import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as colors from '../colors';
import * as constants from '../constants';
import * as routeNames from '../navigators/routeNames';
import BottomBarButton from './bottomBarButton';

const INFORMATION_ICON = require('../assets/information.png');
const HOME_ICON = require('../assets/home.png');
const PROFILE_ICON = require('../assets/ic_profile_icon.png');

let tabbarIcons = [INFORMATION_ICON, HOME_ICON, PROFILE_ICON];

class BottomTabBar extends Component {
  renderButton = (name, index) => <BottomBarButton key={index} {...this.props} name={name} icon={tabbarIcons[index]} />;
  render() {
    return (
      <React.Fragment>
        <View style={styles.tabBar}>{routeNames.tabBarRoutes.map(this.renderButton)}</View>
        <SafeAreaView style={styles.safeArea} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bottomBarBackground,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.bottomBarBorderColor,
    flexDirection: 'row',
    alignItems: 'center',
    height: constants.tabBarHeight
  },
  safeArea: {
    backgroundColor: colors.bottomBarBackground
  }
});

export default BottomTabBar;
