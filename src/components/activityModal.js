import React, { Component } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import * as Colors from '../colors.js';
import { createStyle } from '../utils/normalize';

export default class ActivityModal extends Component {
  state = {
    visible: false
  };

  show = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <Modal
        animationType='fade'
        transparent
        style={styles.modalCotainer}
        visible={this.state.visible}
        onRequestClose={this.props.closeModal}>
        <View style={[styles.modalCotainer, styles.viewBackgroundColor]}>
          <ActivityIndicator size='large' color={Colors.whiteColor} />
        </View>
      </Modal>
    );
  }
}

const styles = createStyle({
  modalCotainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewBackgroundColor: { backgroundColor: '#00000080' }
});
