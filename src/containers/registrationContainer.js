import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
//import { Notifications, Permissions } from 'expo';
//import { BackButton } from '../components';
import StyledKeyboardAvoidingView from '../components/styledKeyboardAvoidingView';
import TextBoxInput from '../components/textBoxInput';
import ActivityModal from '../components/activityModal';
import BackButton from '../components/headerControls';
import Button from '../components/button';

import * as colors from '../colors';
import * as strings from '../strings';
import * as routeNames from '../navigators/routeNames';
import { createStyle } from '../utils/normalize';
import { showAlert } from '../utils/navigations';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../redux-state/auth/actions';

const LOGO = require('../assets/logo.png');

export class RegistrationContainer extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: strings.registration,
            headerLeft: (
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )
        };
    };

    constructor(props) {
        super(props);
        this.checkForm = this.checkForm.bind(this);
        this.onRegisterPress = this.onRegisterPress.bind(this);
    }

    state = {
        phone: {
            isFocused: false,
            value: ''
        },
        password: {
            isFocused: false,
            value: ''
        },
        repeatPassword: {
            isFocused: false,
            value: ''
        },
        mail: {
            isFocused: false,
            value: ''
        },
        name: {
            isFocused: false,
            value: ''
        },
    };

    // getToken = async () => {
    //     try {
    //         const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    //         let finalStatus = existingStatus;

    //         if (existingStatus !== 'granted') {
    //             const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //             finalStatus = status;
    //         }

    //         if (finalStatus !== 'granted') {
    //             showAlert(strings.notificationsDisabled);
    //             return;
    //         }

    //         const exponentPushToken = await Notifications.getExpoPushTokenAsync();
    //         this.setState({
    //             exponentPushToken
    //         });
    //     } catch (error) {
    //         showAlert(error.message);
    //     }
    // };

    onPhoneFieldChange = value => this.onChangeText('phone', value);
    onPhoneFieldCancel = () => this.onCancel('phone');
    onPasswordFieldChange = value => this.onChangeText('password', value);
    onPasswordFieldCancel = () => this.onCancel('password');
    onRepeatPasswordFieldChange = value => this.onChangeText('repeatPassword', value);
    onRepeatPasswordFieldCancel = () => this.onCancel('repeatPassword');
    onMailFieldChange = value => this.onChangeText('mail', value);
    onMailFieldCancel = () => this.onCancel('mail');
    onNameFieldChange = value => this.onChangeText('name', value);
    onNameFieldCancel = () => this.onCancel('name');

    onChangeText = (field, value) => {
        this.setState(prevState => ({
            [field]: {
                ...prevState[field],
                value: value
            }
        }));
    };

    onCancel = field => {
        this.setState(prevState => ({
            [field]: {
                ...prevState[field],
                value: ''
            }
        }));
    };

    setRef = modal => {
        this.activityIndicator = modal;
    };

    showAlert(text, title = strings.attention) {
        setTimeout(() => {
            Alert.alert(title, text, [{ text: strings.ok }], { cancelable: true });
        }, 500);
    }

    checkForm() {
        const { phone, name, mail } = this.state;
        const showAlert = this.showAlert;
        if (phone.value === '') {
            showAlert(strings.phonePlaceholder);
            return false;
        } else if (mail.value.indexOf('@') == -1) {
            showAlert(strings.incorrectEmailMessage);
            return false;
        } else if (name.value === '') {
            showAlert(strings.enterName);
            return false;
        }
        return true;
    }

    showModal = () => {
        if (this.activityIndicator) {
            this.activityIndicator.show();
        }
    };

    getPhone() {
        return this.state.phone.value.replace(/[^0-9+]/g, '');
    }

    closeModal = async response => {
        if (response.error) {
            const error = response.error;
            if (error.toString().indexOf('Network request failed') != -1) {
                await this.activityIndicator.hide();
            } else {
                if (response.status == 400) {
                    if (error.phone) {
                        showAlert(strings.phoneAlreadyExist, strings.attention, this.activityIndicator.hide);
                    } else if (error.login) {
                        showAlert(strings.loginAlreadyExist, strings.attention, this.activityIndicator.hide);
                    } else if (error.email) {
                        showAlert(strings.mailAlreadyExist, strings.attention, this.activityIndicator.hide);
                    }
                } else {
                    showAlert(strings.somethingWentWrong, strings.attention, this.activityIndicator.hide);
                }
            }
        } else if (!response.error) {
            const phone = this.getPhone();
            await this.activityIndicator.hide();
            this.props.navigation.navigate(routeNames.REGISTRATION_CONFIRM, { phone });
        }
    };

    onRegisterPress() {
        if (this.checkForm()) {
            const { name, mail } = this.state;
            const phone = this.getPhone();
            this.showModal();
            Promise.resolve(this.props.registerUser(phone, name.value, mail.value))
                .then(this.closeModal)
                .catch(this.closeModal);
        }
    }

    blur = () => {
        if (this.phoneInputRef) {
            this.phoneInputRef.refs.ref._inputElement.blur();
        }
        if (this.emailInputRef) {
            this.emailInputRef.refs.ref.blur();
        }
        if (this.nameInputRef) {
            this.nameInputRef.refs.ref.blur();
        }
    };

    setPhoneRef = phoneRef => {
        this.phoneInputRef = phoneRef;
    };

    setEmailRef = emailRef => {
        this.emailInputRef = emailRef;
    };

    setNameRef = nameRef => {
        this.nameInputRef = nameRef;
    };

    render() {
        return (
            <SafeAreaView style={styles.rootContainer}>
                <StyledKeyboardAvoidingView style={styles.screenWrapper}>
                    <TouchableOpacity activeOpacity={1} onPress={this.blur} style={styles.screenWrapper}>
                        <Image source={LOGO} style={styles.logo} />
                        <Text style={[styles.textInputTitle, styles.marginTop]}>{strings.phone}</Text>
                        <TextBoxInput
                            customContainer={styles.textBoxContainer}
                            customStyle={styles.customStyle}
                            cancelable={true}
                            placeholderTextColor={colors.bottomBarInactiveTint}
                            value={this.state.phone.value}
                            onChangeText={this.onPhoneFieldChange}
                            onCancel={this.onPhoneFieldCancel}
                            ref={this.setPhoneRef}
                            placeholder={strings.phonePlaceholder}
                            keyboardType='phone-pad'
                            mask={strings.phoneMask} />
                        <Text style={styles.textInputTitle}>{strings.mail}</Text>
                        <TextBoxInput
                            maxLength={30}
                            customContainer={styles.textBoxContainer}
                            customStyle={styles.customStyle}
                            cancelable={true}
                            placeholder={strings.enerMail}
                            placeholderTextColor={colors.bottomBarInactiveTint}
                            value={this.state.mail.value}
                            isFocused={this.state.mail.isFocused}
                            onChangeText={this.onMailFieldChange}
                            onCancel={this.onMailFieldCancel}
                            keyboardType='email-address'
                            ref={this.setEmailRef} />
                        <Text style={styles.textInputTitle}>{strings.nameAndSurname}</Text>
                        <TextBoxInput
                            customContainer={styles.textBoxContainer}
                            customStyle={styles.customStyle}
                            cancelable={true}
                            placeholder={strings.enterName}
                            placeholderTextColor={colors.bottomBarInactiveTint}
                            value={this.state.name.value}
                            isFocused={this.state.name.isFocused}
                            onChangeText={this.onNameFieldChange}
                            onCancel={this.onNameFieldCancel}
                            ref={this.setNameRef} />
                        <Button
                            text={strings.register}
                            buttonTextStyle={[styles.registerText, { color: colors.whiteColor }]}
                            buttonStyle={styles.button}
                            onPress={this.onRegisterPress} />
                    </TouchableOpacity>
                </StyledKeyboardAvoidingView>
                <ActivityModal closeModal={this.closeModal} ref={this.setRef} />
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, { registerUser }), dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(RegistrationContainer);

const styles = createStyle({
    rootContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.whiteColor
    },
    screenWrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
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
        borderColor: colors.gray
    },

    button: {
        backgroundColor: colors.blackSandColor,
        height: 50,
        width: 341,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    registerText: {
        color: colors.whiteColor,
        fontSize: 18,
        fontWeight: '700'
    },
    marginTop: { marginTop: 30 }
});
