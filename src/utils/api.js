import { Buffer } from 'buffer';
import { store } from './redux-config';
import fetch from 'react-native-fetch-polyfill';

import { Alert } from 'react-native';
export const API_ROOT = 'http://mothers-server.tabolabs.com';
import * as strings from '../strings';

const AlertCheckInternet = async () =>
    new Promise(resolve => {
        setTimeout(() => {
            Alert.alert(
                strings.attention,
                strings.checkInternet + strings.tryAgain,
                [
                    {
                        text: strings.ok,
                        onPress: resolve
                    }
                ],
                { cancelable: true }
            );
        }, 1000);
    });

export function callApi(endpoint, method, header, body, parameters) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    });

    //   const access_token = store.getState().authorizationReducer.payload.token;

    //   let fullUrl = API_ROOT + endpoint;
    //   if (method == 'GET' && parameters != null) {
    //     let query = '?';
    //     parameters.map(o => {
    //       query = `${query + o[0]}=${o[1]}&`;
    //     });
    //     fullUrl += query;
    //   }
    //   const contentType = endpoint.includes('userpic') && method != 'GET' ? 'image/jpeg' : 'application/json';
    //   const headers = {
    //     'Content-Type': contentType
    //   };
    //   access_token != null && (headers.authorization = 'Bearer ' + access_token);
    //   endpoint.includes('userpic') &&
    //     method != 'GET' &&
    //     (headers['Content-Disposition'] = 'attachment; filename=testPhotoName.jpg');

    //   endpoint.includes('userpic') && method != 'GET'
    //     ? (body = Buffer.from(body.image.base64, 'base64'))
    //     : body != null && (body = JSON.stringify(body));
    //   return fetch(fullUrl, {
    //     timeout: 5000,
    //     method,
    //     headers,
    //     body
    //   })
    //     .then(async response => {
    //       const status = response.status;
    //       if (status == 200) {
    //         return response.json();
    //       } else if (status == 500 || status == 413) {
    //         setTimeout(() => {
    //           Alert.alert(strings.attention, strings.somethingWentWrong, [{ text: strings.ok, onPress: () => {} }], {
    //             cancelable: true
    //           });
    //         }, 1000);
    //         throw 'Ошибка';
    //       } else if (status == 403 || status == 400) {
    //         const error = await response.json();
    //         throw await { ...error, status };
    //       }
    //     })
    //     .catch(async error => {
    //       if (error.toString().indexOf('Network request failed') != -1) {
    //         await AlertCheckInternet();
    //         throw { error: 'Network request failed' };
    //       }
    //       throw error;
    //     });
}