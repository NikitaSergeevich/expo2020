import React, { Component } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import TextBoxInput from '../components/textBoxInput';
import ActivityModal from '../components/activityModal';
import StyledKeyboardAvoidingView from '../components/styledKeyboardAvoidingView';
import Button from '../components/button';
import BackButton from '../components/headerControls/backButton';

import * as strings from '../strings';
import * as colors from '../colors.js';
import * as routeNames from '../navigators/routeNames';

import { createStyle } from '../utils/normalize';
import { showAlert } from '../utils/navigations';

import { connect } from 'react-redux';
import { authenticateUser, passwordConfirm } from '../redux-state/auth/actions';
import { bindActionCreators } from 'redux';

const LOGO = require('../assets/logo.png');

class SmsConfirmContainer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: strings.passwordConfirmation,
            headerLeft: (
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )
        };
    };

    state = {
        password: '',
        phone: this.props.navigation.state ?.params ?.phone,
        timer: 40
    };

    onChangeText = password => {
        this.setState({ password });
    };

    onCancel = () => {
        this.setState({ password: '' });
    };

    setModalRef = modal => {
        this.activityIndicator = modal;
    };

    checkForm = password => {
        if (password === '') {
            showAlert(strings.passwordPlaceholder);
            return false;
        }
        return true;
    };

    onSendAgain = async () => {
        if (!this.timer) {
            this.sendPass();
            this.timer = setInterval(() => {
                if (this.state.timer !== 1) {
                    this.setState({ timer: this.state.timer - 1 });
                } else {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.setState({ timer: 40 });
                }
            }, 1000);
        }
    };

    sendPass = async () => {
        try {
            await this.props.authenticateUser(this.state.phone);
        } catch (error) {
            showAlert(strings.somethingWentWrong, strings.attention, this.activityIndicator.hide);
        }
    };

    onEnterPress = () => {
        this.blur();
        const { password, phone } = this.state;
        if (this.checkForm(password) && phone) {
            this.showModal();
            Promise.resolve(this.props.passwordConfirm(phone, password))
                .then(this.closeModal)
                .catch(this.closeModal);
        }
    };

    showModal = () => {
        if (this.activityIndicator) {
            this.activityIndicator.show();
        }
    };

    closeModal = async response => {
        if (response.error) {
            const error = response.error
            if (error.toString().indexOf('Network request failed') != -1) {
                await this.activityIndicator.hide();
            } else {
                showAlert(strings.incorrectPassword, strings.attention, this.activityIndicator.hide);
            }
        } else if (!response.error) {
            await this.activityIndicator.hide();
            this.props.navigation.navigate(routeNames.PROFILE);
        }
    };

    blur = () => {
        if (this.passwordInputRef) {
            this.passwordInputRef.refs.ref.blur();
        }
    };

    setPasswordRef = passwordRef => {
        this.passwordInputRef = passwordRef;
    };

    render() {
        return (
            <SafeAreaView style={styles.rootContainer}>
                <StyledKeyboardAvoidingView style={styles.screenWrapper}>
                    <TouchableOpacity activeOpacity={1} onPress={this.blur} style={styles.screenWrapper}>
                        <Image source={LOGO} style={styles.logo} />
                        <View style={styles.inputDataContainer}>
                            <Text style={styles.textInputTitle}>{strings.enterPassword}</Text>
                            <TextBoxInput
                                customContainer={styles.textBoxContainer}
                                customStyle={styles.customStyle}
                                cancelable={true}
                                maxLength={6}
                                placeholderTextColor={colors.bottomBarInactiveTint}
                                value={this.state.password}
                                onChangeText={this.onChangeText}
                                onCancel={this.onCancel}
                                autoCapitalize={'none'}
                                ref={this.setPasswordRef}
                                placeholder={strings.passwordConfirm}
                                keyboardType='numeric'
                            />
                            <Button
                                text={strings.enter}
                                buttonTextStyle={styles.enterText}
                                buttonStyle={styles.enterButton}
                                onPress={this.onEnterPress}
                            />
                            <Button
                                disabled={Boolean(this.timer)}
                                text={`${strings.sendAgain} ${this.state.timer !== 40 ? this.state.timer : ''}`}
                                buttonTextStyle={[styles.saveText, { color: colors.blackSandColor }]}
                                buttonStyle={[
                                    styles.button,
                                    {
                                        backgroundColor: this.state.timer !== 40 ? colors.gray : colors.whiteColor,
                                        borderColor: this.state.timer !== 40 ? colors.gray : colors.blackSandColor
                                    }
                                ]}
                                onPress={this.onSendAgain}
                            />
                        </View>
                    </TouchableOpacity>
                </StyledKeyboardAvoidingView>
                <ActivityModal closeModal={this.closeModal} ref={this.setModalRef} />
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, { authenticateUser, passwordConfirm }), dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(SmsConfirmContainer);

const styles = createStyle({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.whiteColor,
        width: '100%',
        height: '100%'
    },
    screenWrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        marginTop: 20,
        tintColor: colors.blackSandColor
    },

    textInputTitle: {
        width: 345,
        lineHeight: 36,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10
    },
    customStyle: {
        height: 58,
        width: 325,
        fontSize: 16,
        lineHeight: 18,
        color: colors.black
    },
    textBoxContainer: {
        height: 44,
        width: 345,
        borderBottomWidth: 1,
        borderColor: colors.semiTransparentBlackColor
    },

    button: {
        height: 50,
        width: 341,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: colors.whiteColor,
        borderWidth: 1,
    },
    enterButton: {
        height: 50,
        width: 341,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: colors.blackSandColor,
    },
    enterText: {
        color: colors.whiteColor,
        fontSize: 18,
        fontWeight: '700'
    },
    saveText: {
        color: colors.whiteColor,
        fontSize: 18,
        fontWeight: '700'
    },
    inputDataContainer: { alignItems: 'center', width: '100%', marginBottom: 100 }
});
