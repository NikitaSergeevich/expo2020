import React, { Component } from 'react';
//import { AppLoading, Asset, Notifications, Permissions } from 'expo';
import { View, SafeAreaView, Text } from 'react-native';
import Button from '../components/button';
import * as routeNames from '../navigators/routeNames';
import * as strings from '../strings';
import * as colors from '../colors';
import { createStyle } from '../utils/normalize';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getNews } from '../redux-state/news/actions';
// import { getProducts } from '../redux-state/product/actions';
// import { getChats } from '../redux-state/chat/actions';
// import { getWalks } from '../redux-state/walk/actions';
// import { getProfile } from '../redux-state/profile/actions';
// import { getGeoPoints } from '../redux-state/geo/actions';
// import { getChat } from '../redux-state/chat/actions';
// import { showAlert } from '../utils/navigations';

class Splash extends Component {
  state = {
    isFetching: false,
    isFetchingNotStarted: true,
    error: true,
  };

  componentDidMount = async () => {
    this.props.navigation.navigate(routeNames.BOTTOMTAB);
    // const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    // let finalStatus = existingStatus;
    // if (existingStatus !== 'granted') {
    //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //   finalStatus = status;
    // }

    // if (finalStatus !== 'granted') {
    //   return;
    // }
    // this._notificationSubscription = Notifications.addListener(this.handleNotification);
  };

  handleNotification = notification => {
    // if (notification.origin === strings.selected) {
    //   this.goToConversation(notification.data.id);
    // }
  };

  // loadResourcesAsync = async () => {
  //   this.setState({
  //     isFetching: true,
  //     isFetchingNotStarted: false,
  //   });
  //   return Promise.all([
  //     Asset.loadAsync([

  //     ])
  //   ]);
  // };

  // handleFinishLoading = async () => {
  //   const { navigate } = this.props.navigation;
  //   const { token } = this.props;

  //   if (token) {
  //     Promise.all([
  //       // this.props.getNews(),
  //       // this.props.getChats(),
  //       // this.props.getProducts(),
  //       // this.props.getWalks(),
  //       // this.props.getProfile(),
  //       // this.props.getGeoPoints()
  //     ]).then(() => {
  //       this.setState({
  //         isFetching: false,
  //       });
  //       navigate(routeNames.MAIN);
  //     }).catch(() => {
  //       this.setState({ error: true, isFetching: false })
  //     })
  //   }

  //   navigate(routeNames.MAIN);
  // };

  // handleLoadingError = error => { this.setState({ error: true, isFetching: false }) };

  onTryAgainPress = () => {
    this.setState({ isFetching: true })
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.rootContainer}>
          <Text style={styles.checkInternetText}>
            {strings.checkInternet}
          </Text>
          <Button
            text={strings.tryAgain}
            buttonTextStyle={styles.tryAgainText}
            buttonStyle={styles.button}
            onPress={this.onTryAgainPress}
          />
        </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(store) {
  return {
    // token: store.authorizationReducer.payload.token,
    // userId: store.authorizationReducer.payload.userId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      Object.assign({}, { getNews, getChats, getProducts, getWalks, getProfile, getGeoPoints }),
      dispatch
    ),
    getWalks: () => dispatch(getWalks()),
    getChat: id => dispatch(getChat(id))
  };
}

export default (Splash =  connect(
  state => ({}),
  null
)(Splash));

const styles = createStyle({
  rootContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  checkInternetText: {
    color: colors.sandColor,
    fontWeight: '700',
    width: '80%',
    fontSize: 20,
    textAlign: 'center'
  },

  tryAgainText: {
    color: colors.whiteColor,
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    height: 50,
    width: 231,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: colors.sandColor,
  },
})


