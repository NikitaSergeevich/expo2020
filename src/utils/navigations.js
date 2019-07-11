import React, { Component } from 'react';
import {
  Alert,
  Platform,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView
} from 'react-native'

import { attention } from '../strings';
import { createStyle, scale } from './normalize';

export function getCurrentRouteName(navigationState) {
  if (!navigationState || !navigationState.routes) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export function getCurrentRouteParams(navigationState) {
  if (!navigationState || !navigationState.routes) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteParams(route);
  }
  return route.params;
}

export function title(routeParams) {
  return routeParams && routeParams.title ? routeParams.title : '';
}

export function showAlert(text, title = attention, onPress) {
  setTimeout(() => {
    Alert.alert(
      title,
      text,
      [
        {
          text: 'OK',
          onPress: () => {
            if (onPress) {
              onPress();
            }
          }
        }
      ],
      { cancelable: true }
    );
  }, 500);
}

export function isIphoneX() {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&
    // Accounting for the height in either orientation
    ((height === 812 || width === 812) || (height === 896 || width === 896))
  );
}

export const navBarHeight = Platform.OS == 'ios' ? scale(44, 'height') : scale(56, 'height')
export const statusBarHeight = Platform.OS === 'ios' ? isIphoneX() ? 45 : 20 : 0
export const MIN_HEIGHT = Platform.OS == 'ios' ? isIphoneX() ? 100 : 64 : scale(56, 'height')

export class Header extends Component {
  render() {
    let header = null
    let title = null
    let props = this.props
    if (Platform.OS == 'ios') {
      header = (
        <View key={"headerios"} style={[styles.headerIOS]}>
          {
            props.leftIcons.map((o, i) => {
              return (
                <TouchableOpacity key={"left" + i} style={[styles.iosLeftHeaderIconContainer, o.style]}
                  onPress={() => { o.handler() }}>
                  {o.icon}
                </TouchableOpacity>
              )
            })
          }
          {
            props.rightIcons.map((o, i) => {
              return (
                <TouchableOpacity key={"right" + i} style={[styles.iosRightHeaderIconContainer, o.style]}
                  onPress={() => { o.handler() }}>
                  {o.icon}
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
      title = (
        <View key={"titleios"} style={[styles.titleContainer, props.headerTitleStyle, props.shadow && styles.shadowIOS]}>
          <Text style={[styles.iosTitleStyle, props.headerTitleTextStyle]} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
      )
    } else {
      header = (
        <View key={"headerandroid"} style={styles.headerAndroid}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {
              props.leftIcons.map((o, i) => {
                return (
                  <TouchableOpacity key={"key1" + i} style={[styles.androidLeftHeaderIconContainer, o.style]}
                    onPress={() => { o.handler() }}>
                    {o.icon}
                  </TouchableOpacity>
                )
              })
            }
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={[styles.headerTitle, props.headerTitleStyle, props.headerTitleTextStyle]}>
              {props.title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {
              props.rightIcons.map((o, i) => {
                return (
                  <TouchableOpacity key={"key2" + i} style={[styles.androidRightHeaderIconContainer, o.style]}
                    onPress={() => { o.handler() }}>
                    {o.icon}
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      )
    }
    return (
      <SafeAreaView style={{ position: 'absolute', top: 0, right: 0, left: 0, height: navBarHeight }}>
        <View style={[styles.rootContainer, props.shadow && { height: scale(50, 'height'), borderBottomWidth: 0 }, props.customRootContainer]}>
          {
            [Platform.OS == 'ios' && title, header]
          }
        </View>
      </SafeAreaView>
    )
  }
}

const styles = createStyle({
  rootContainer: {
    width: 375,
    marginTop: Platform.OS == "ios" && 0,
    height: Platform.OS == 'ios' ? 44 : 56,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0'
  },
  headerIOS: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: 360,
    height: 44,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  shadowIOS: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headerAndroid: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: 360,
    flex: -1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    width: '100%',
    borderColor: '#E0E0E0',
    paddingHorizontal: 8,
  },
  iosLeftHeaderIconContainer: {
    height: 44,
    paddingRight: 10,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  androidLeftHeaderIconContainer: {
    paddingLeft: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  iosLeftHeaderIcon: {
    backgroundColor: 'transparent'
  },
  iosLeftHeaderText: {
    color: "#DF2828",
    marginLeft: 5,
  },
  iosRightHeaderIconContainer: {
    paddingLeft: 15,
    alignItems: 'flex-end',
    height: 44,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  androidRightHeaderIconContainer: {
    height: 44,
    width: 44,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosRightHeaderIcon: {
    backgroundColor: 'transparent'
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: "#444",
    marginLeft: 30,
    width: 180
  },
  iosTitleStyle: {
    alignSelf: 'center',
    fontSize: 18
  },
  androidTitleStyle: {
    marginLeft: 12,
    fontSize: 20
  },

  androidIcon: {
    height: 56,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
})
