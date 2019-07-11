import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Platform,
  StyleSheet
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

const translation = {
  0(val) {
    if (/[0-9]/.test(val)) {
      return val;
    }
    return null;
  },
  9(val) {
    if (/[0-9 ]/.test(val)) {
      return val;
    }
    return null;
  },
  Z(val) {
    if (/[A-Za-z]/.test(val)) {
      return val;
    }
    return null;
  },
  A(val) {
    if (/[0-9A-Za-zА-Яа-я]/.test(val)) {
      return val;
    }
    return null;
  },
};

export default class TextBoxInput extends React.Component {
  static propTypes = {
    mask: PropTypes.string,
    placeholder: PropTypes.string,
    withMask: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    isValid: PropTypes.bool,
    isFocused: PropTypes.bool,
    autoFocus: PropTypes.bool,
    keyboardType: PropTypes.oneOf(['default', 'numeric', 'phone-pad', 'email-address']),
    clearTextOnFocus: PropTypes.bool
  };

  static get defaultProps() {
    return {
      onChangeText: () => {
      },
      onSelectionChange: () => {
      },
      onFocus: () => {
      },
      onBlur: () => {
      },
      onSubmitEditing: () => {
      },
      mask: '',
      placeholder: '',
      prefix: '',
      withMask: false,
      value: '',
      name: 'some name',
      description: 'some description',
      isValid: true,
      isFocused: false,
      autoFocus: false,
      keyboardType: 'default',
      maxLength: 38,
      blurOnSubmit: true,
      placeholderTextColor: 'gray',
      numberOfLines: 1,
      multiline: false,
      cancelable: false,
      clearTextOnFocus: false
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.props.onFocus();
  }

  onBlur() {
    this.props.onBlur();
  }

  focus() {
    if (this.props.mask != '') {
      this.textinput.getElement().focus();
    } else {
      this.textinput.focus();
    }
  }

  blur() {
    if (this.props.mask != '') {
      this.textinput.getElement().blur();
    } else {
      this.textinput.blur();
    }
  }

  onChangeText(event) {
    this.props.onChangeText(event);
  }

  render() {
    // let textStyle
    // let lineStyle
    // if (this.props.isFocused) {
    //   textStyle = styles.selected
    //   lineStyle = styles.selectedLine
    // } else {
    //   textStyle = styles.blured
    //   lineStyle = styles.bluredLine
    // }
    // if (!this.props.isValid) {
    //   textStyle = styles.error
    //   lineStyle = styles.errorLine
    // }

    const value = this.props.value;

    const content = this.props.mask != '' ? (
      <TextInputMask
        ref={"ref"}
        style={[
          styles.input,
          {
            color: value == '' ? '#FFFFFFAA' : 'white',
            paddingBottom: value == '' ? 0 : 0
          },
          this.props.customStyle,
          Platform.OS != 'ios' && { height: 36 }
        ]}
        type="custom"
        isFocused={this.props.isFocused}
        onChangeText={this.onChangeText}
        placeholder={this.props.isFocused ? '' : this.props.placeholder}
        multiline={this.props.multiline}
        numberOfLines={this.props.numberOfLines}
        maxLength={this.props.maxLength}
        autoFocus={this.props.autoFocus}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        textAlign="left"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        placeholderTextColor={this.props.placeholderTextColor != null ? this.props.placeholderTextColor : 'gray'}
        keyboardType={this.props.keyboardType}
        blurOnSubmit={this.props.blurOnSubmit}
        onSubmitEditing={this.props.onSubmitEditing}
        value={value}
        options={{
          mask: this.props.mask,
          translation,
        }}
        autoCapitalize={this.props.autoCapitalize}
      />
    ) : (
        <TextInput
          ref={"ref"}
          style={[
            styles.input,
            {
              color: this.props.value == '' ? '#FFFFFFAA' : 'white',
              paddingBottom: value == '' ? 0 : 0
            },
            this.props.customStyle,
            Platform.OS != 'ios' && { height: 36 }
          ]}
          multiline={this.props.multiline}
          isFocused={this.props.isFocused}
          numberOfLines={this.props.numberOfLines}
          maxLength={this.props.maxLength}
          autoFocus={this.props.autoFocus}
          onFocus={this.props.onFocus}
          onBlur={this.onBlur}
          secureTextEntry={this.props.secureTextEntry}
          clearTextOnFocus={false}
          textContentType='none'
          autoCorrect={false}
          textAlign="left"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholderTextColor={this.props.placeholderTextColor != null ? this.props.placeholderTextColor : 'gray'}
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType}
          blurOnSubmit={this.props.blurOnSubmit}
          onSubmitEditing={this.props.onSubmitEditing}
          value={value}
          onChangeText={this.onChangeText}
          autoCapitalize={this.props.autoCapitalize}
        />
      );

    return (
      <View style={[styles.container, this.props.customContainer]}>
        {content}
        {
          this.props.cancelable && value != "" &&
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.props.onCancel}>
            <Image resizeMode="contain" source={require('../assets/ic_cross.png')} style={styles.cross} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: 326,
    height: 36,
    borderBottomWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  textInputTitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  inputBottomBorder: {
    marginTop: 2,
    backgroundColor: '#2196F3',
    width: (360 - 16 * 2) / 2,
    height: 1,
  },
  input: {
    paddingLeft: 0,
    backgroundColor: 'transparent',
    width: 316,
    borderRadius: 4,
    fontSize: 16,
    marginBottom: Platform.OS == 'ios' ? 0 : 9.5
  },
  cross: {
    width: 15,
    height: 15
  },
  padding: {
    paddingRight: 31
  },
  selected: {
    color: '#2196F3',
  },
  blured: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  error: {
    color: '#EF3A51',
  },
  errorLine: {
    backgroundColor: '#EF3A51',
  },
  selectedLine: {
    backgroundColor: '#2196F3',
  },
  bluredLine: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})
