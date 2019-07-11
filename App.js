/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './src/navigators';
import { store } from './src/utils/redux-config';
import * as NavigationService from './src/sevices/NavigationService';
import { Provider } from 'react-redux';

export default class App extends Component {
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  setRef = (nav) => {
    this.navigator = nav
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator ref={this.setRef} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
