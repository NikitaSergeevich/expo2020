import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
import { IS_IOS } from '../utils/normalize';

class Button extends Component {
  renderText = () => <Text style={this.props.buttonTextStyle}>{this.props.text}</Text>;
  render() {
    const { children } = this.props;
    if (IS_IOS) {
      return (
        <TouchableOpacity {...this.props} onPress={this.props.onPress} style={this.props.buttonStyle}>
          {children}
          {this.props.text ? this.renderText() : null}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableNativeFeedback {...this.props} onPress={this.props.onPress}>
          <View style={this.props.buttonStyle}>
            {children}
            {this.props.text ? this.renderText() : null}
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
}

Button.propTypes = {
  onPress: PropTypes.func,
  buttonStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  buttonTextStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  text: PropTypes.string,
  opacity: PropTypes.number
};

Button.defaultProps = {
  onPress: () => {},
  opacity: 1
};

export default Button;
