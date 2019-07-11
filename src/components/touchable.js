import React from 'react'
import _ from 'lodash'

import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'

export default class Touchable extends React.Component {
  constructor(props) {
    super(props)
    this.touchableInactive = false;
    this.method = this.method.bind(this);
  }
  method() {
    if (!this.touchableInactive) {
      this.touchableInactive = true;
      setTimeout(() => this.props.onPress(), 800)
      setTimeout(() => this.touchableInactive = false, 1500)
    }
    // if (isActive) {
    //   this.setState({ isActive: false })
    //   this.props.onPress()
    //   setTimeout(() => this.setState({ isActive: true }), 1000)
    // }
  }

  render() {
    const TouchComponent = Platform.OS === 'ios' || this.props.opacity ? TouchableOpacity : TouchableNativeFeedback;
    return (
      <TouchComponent {...this.props} onPress={this.method}>
        {
          Platform.OS !== 'ios' ?
            <View style={this.props.style}>
              {this.props.children}
            </View>
            :
            this.props.children
        }
      </TouchComponent>
    )
  }
}
