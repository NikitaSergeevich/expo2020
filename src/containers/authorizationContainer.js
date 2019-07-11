import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import * as routeNames from '../navigators/routeNames';
import StyledKeyboardAvoidingView from '../components/styledKeyboardAvoidingView';
import Button from '../components/button';
import TextBoxInput from '../components/textBoxInput';
import ActivityModal from '../components/activityModal';

import * as colors from '../colors.js';
import * as strings from '../strings';

import { createStyle, IS_IOS } from '../utils/normalize';
import { showAlert } from '../utils/navigations';
//import { askForPermissions } from '../services/PermissionService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateUser, logoutUser } from '../redux-state/auth/actions';

const LOGO = require('../assets/logo.png');

class AuthorizationContainer extends Component {
    state = {
        phone: ''
    };

    componentDidMount() {
        //this.props.logoutUser();
        //!IS_IOS && askForPermissions()
    }

    setPhoneRef = phoneRef => {
        this.phoneInputRef = phoneRef;
    };

    onChangeText = phone => {
        this.setState({ phone });
    };

    onCancel = () => {
        this.setState({ phone: '' });
    };

    setModalRef = modal => {
        this.activityIndicator = modal;
    };

    getPhone() {
        return this.state.phone.replace(/[^0-9+]/g, '');
    }

    checkForm = phone => {
        if (phone === '') {
            showAlert(strings.phonePlaceholder);
            return false;
        }
        return true;
    };

    onRegistrationPress = () => {
        this.props.navigation.navigate(routeNames.REGISTRATION);
    };

    onEnterPress = () => {
        this.blur();
        const phone = this.getPhone();
        if (this.checkForm(phone)) {
            this.showModal();
            Promise.resolve(this.props.authenticateUser(phone))
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
        try {
            if (response.error) {
                const error = response.error;
                if (error.toString().indexOf('Network request failed') != -1) {
                    await this.activityIndicator.hide();
                } else {
                    if (error.phone) {
                        if (error.phone === 'limit') {
                            showAlert(strings.authAttemptLimit, strings.attention, this.activityIndicator.hide);
                        } else if (error.phone === 'not_found') {
                            showAlert(strings.phoneNotFound, strings.attention, this.activityIndicator.hide);
                        }
                    } else {
                        await this.activityIndicator.hide();
                    }
                }
            } else if (!response.error) {
                const phone = this.getPhone();
                await this.activityIndicator.hide();
                this.props.navigation.navigate(routeNames.PASSWORD_CONFIRM, { phone });
            }
        } catch (error) {
            return;
        }
    };

    blur = () => {
        if (this.phoneInputRef) {
            this.phoneInputRef.refs.ref._inputElement.blur();
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.rootContainer}>
                <StyledKeyboardAvoidingView style={styles.screenWrapper} hasntHeader>
                    <TouchableOpacity activeOpacity={1} onPress={this.blur} style={styles.screenWrapper}>
                        <Image source={LOGO} style={styles.logo} />
                        <View style={styles.inputDataContainer}>
                            <Text style={styles.textInputTitle}>{strings.phone}</Text>
                            <TextBoxInput
                                customContainer={styles.textBoxContainer}
                                customStyle={styles.customStyle}
                                cancelable={true}
                                mask={strings.phoneMask}
                                placeholderTextColor={colors.bottomBarInactiveTint}
                                value={this.state.phone}
                                onChangeText={this.onChangeText}
                                onCancel={this.onCancel}
                                autoCapitalize={'none'}
                                ref={this.setPhoneRef}
                                placeholder={strings.phonePlaceholder}
                                keyboardType='phone-pad' />
                            <Button
                                text={strings.sendPass}
                                buttonTextStyle={styles.enterText}
                                buttonStyle={styles.enterButton}
                                onPress={this.onEnterPress} />
                            <Button
                                text={strings.registration}
                                buttonTextStyle={[styles.registerText, { color: colors.blackSandColor }]}
                                buttonStyle={styles.registerButton}
                                onPress={this.onRegistrationPress} />
                        </View>
                    </TouchableOpacity>
                </StyledKeyboardAvoidingView>
                <ActivityModal closeModal={this.closeModal} ref={this.setModalRef} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(store) {
    return {
        isFetching: store.authorizationReducer.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, { authenticateUser, logoutUser }), dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationContainer);

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
        marginTop: IS_IOS ? 20 : 60,
        tintColor: colors.blackSandColor,
    },
    customStyle: {
        height: 58,
        width: 325,
        fontSize: 16,
        lineHeight: 18,
        color: colors.black,
    },
    textInputTitle: {
        width: '100%',
        height: 44,
        lineHeight: 44,
        paddingTop: 8,
        textAlignVertical: 'center',
        fontSize: 17,
        paddingHorizontal: 18,
        fontWeight: 'bold'
    },
    textBoxContainer: {
        height: 44,
        width: 340,
        borderBottomWidth: 1,
        borderColor: colors.semiTransparentBlackColor,
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

    registerButton: {
        height: 50,
        width: 341,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: colors.whiteColor,
        borderWidth: 1,
        borderColor: colors.blackSandColor
    },
    registerText: {
        color: colors.whiteColor,
        fontSize: 18,
        fontWeight: '700'
    },

    inputDataContainer: { alignItems: 'center', width: '100%', marginBottom: 100 }
});
