import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Platform,

  View,
  Text,
  Image,
  TextInput,

  TouchableOpacity,
  // TouchableNativeFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles, { btnSpace } from "./styles";
import * as colors from '../../colors.js';

const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableOpacity//TouchableNativeFeedback;

class Quantity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVisible: false,
      value: '1',
      inputValue: '1',
    };

    this.onPressDone = this.onPressDone.bind(this);
    this.onPressQuantity = this.onPressQuantity.bind(this);
  }

  onPressDone() {
    this.setState((prevState) => ({ inputVisible: !prevState.inputVisible }), () => this.props.onChange(this.state.value));
  }

  onPressQuantity(value) {
    this.setState(() => ({ value }), () => this.props.onChange(value));
  }

  doneVewRef = ref => this.doneVew = ref;
  addVewRef = ref => this.addVew = ref;

  rotateIn = () => this.addVew.transition({ transform: [{ rotate: '0deg' }] }, { transform: [{ rotate: '-225deg' }] }, 250);
  rotateOut = () => this.addVew.transition({ transform: [{ rotate: '-225deg' }] }, { transform: [{ rotate: '0deg' }] }, 250);
  fadeIn = () => this.doneVew.transition({ opacity: 0, right: 0 }, { opacity: 1, right: 44 + btnSpace }, 250); //this.doneVew.fadeInRight(500);
  fadeOut = () => this.doneVew.transition({ opacity: 1, right: 44 + btnSpace }, { opacity: 0, right: 0 }, 250); //this.doneVew.fadeInRight(500);

  render() {

    const ButtonsQuantity = (props) => {
      return ([
        <TouchableWrapper
          key={"one"}
          onPress={() => props.onPressQuantity('1')}
          activeOpacity={.5}
          style={props.activeBtn === '1' ? styles.btnActive : styles.btn}>
          <Text style={[props.activeBtn === '1' ? styles.activeText : {}, { fontSize: 20 }]}>
            {"1"}
          </Text>
        </TouchableWrapper>,
        <TouchableWrapper
          key={"two"}
          onPress={() => props.onPressQuantity('2')}
          activeOpacity={.5}
          style={props.activeBtn === '2' ? styles.btnActive : styles.btn}>
          <Text style={[props.activeBtn === '2' ? styles.activeText : {}, { fontSize: 20 }]}>
            {"2"}
          </Text>
        </TouchableWrapper>,
        <TouchableWrapper
          key={"three"}
          onPress={() => props.onPressQuantity('3')}
          activeOpacity={.5}
          style={props.activeBtn === '3' ? styles.btnActive : styles.btn}>
          <Text style={[props.activeBtn === '3' ? styles.activeText : {}, { fontSize: 20 }]}>
            {"3"}
          </Text>
        </TouchableWrapper>,
        <TouchableWrapper
          key={"four"}
          onPress={() => props.onPressQuantity('4')}
          activeOpacity={.5}
          style={props.activeBtn === '4' ? styles.btnActive : styles.btn}>
          <Text style={[props.activeBtn === '4' ? styles.activeText : {}, { fontSize: 20 }]}>
            {"4"}
          </Text>
        </TouchableWrapper>,
        <TouchableWrapper
          key={"five"}
          onPress={() => props.onPressQuantity('5')}
          activeOpacity={.5}
          style={props.activeBtn === '5' ? styles.btnActive : styles.btn}>
          <Text style={[props.activeBtn === '5' ? styles.activeText : {}, { fontSize: 20 }]}>
            {"5"}
          </Text>
        </TouchableWrapper>
      ]);
    };

    return (
      <View style={styles.header}>
        {
          this.state.inputVisible ?
            [
              <TextInput
                // autoFocus
                key={"firstel"}
                style={styles.input}
                placeholder={'Quantity'}
                value={this.state.inputValue}
                maxLength={3}
                onChangeText={(inputValue) => {
                  this.setState(() => ({ inputValue: inputValue.replace(/[^0-9]/g, '') }))
                  if (Number(inputValue) <= 5) {
                    this.setState({ value: inputValue.replace(/[^0-9]/g, '').toString() })
                  }
                  this.props.onChange(inputValue.replace(/[^0-9]/g, ''))
                }}
                keyboardType={Platform.OS == 'ios' ? 'number-pad' : 'numeric'}
                underlineColorAndroid={'transparent'} />,
              <View
                key={"secondel"}
                style={styles.hiddenBtn} />
            ]
            :
            <ButtonsQuantity
              activeBtn={this.state.value}
              onPressAdd={this.onPressAdd}
              onPressQuantity={this.onPressQuantity}
            />
        }
        <Animatable.View
          ref={this.doneVewRef}
          style={styles.doneBtn}>
          <TouchableWrapper
            activeOpacity={.5}
            style={styles.addBtn}
            onPress={() => {
              let value = Number(this.state.inputValue) + 1
              this.setState({ inputValue: value.toString() })
              if (value <= 5) {
                this.setState({ value: value.toString() })
              }
              this.props.onChange(value.toString())
              // if (this.state.inputVisible) {
              //   this.fadeOut()
              //   this.rotateOut()
              // } else {
              //   this.fadeIn()
              //   this.rotateIn()
              // }
              // this.onPressDone()
            }}>
            <Image source={require('../../assets/productScreen/add.png')}
              resizeMode={'contain'}
              style={{ width: 44, height: 44, tintColor: colors.blackSandColor}} />
          </TouchableWrapper>
        </Animatable.View>

        <Animatable.View
          ref={this.addVewRef}>
          <TouchableWrapper
            activeOpacity={.5}
            style={styles.addBtn}
            onPress={() => {
              if (this.state.inputVisible) {
                this.fadeOut()
                this.rotateOut()
                this.props.onChange(this.state.value)
              } else {
                this.fadeIn()
                this.rotateIn()
                this.setState({ inputValue: this.state.value })
                this.props.onChange(this.state.value)
              }
              this.setState((prevState) => ({ inputVisible: !prevState.inputVisible }))
            }}>
            <Image style={{ width: 44, height: 44, tintColor: colors.blackSandColor, backgroundColor: 'transparent' }}
              resizeMode={'contain'}
              source={require('../../assets/productScreen/add.png')} />
          </TouchableWrapper>
        </Animatable.View>
      </View>
    );
  }
}

Quantity.propTypes = {};

export default Quantity;
