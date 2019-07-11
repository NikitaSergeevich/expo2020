import * as types from './actionTypes';
import { callApi } from '../../utils/api';

export function authenticateUser(phone) {
    return {
        type: types.AUTH,
        payload: callApi('/users/auth_sms', 'POST', null, { phone })
    };
}

export function passwordConfirm(phone, code) {
    return {
        type: types.AUTH,
        payload: callApi('/users/auth_confirm', 'POST', null, { phone, code })
    };
}

export function registerUser(phone, name, email, ExponentPushToken) {
    return {
        type: types.REGISTER,
        payload: callApi('/users/reg_sms/', 'POST', null, { phone, name, email })
    };
}