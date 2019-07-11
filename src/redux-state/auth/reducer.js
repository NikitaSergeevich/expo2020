import * as types from './actionTypes'
//import * as NavigationService from '../../services/NavigationService'
//import * as routeNames from '../../navigators/routeNames';

const initialAuthorizationState = {
  isFetching: false,
  isRejected: false,
  rejectedMessage: null,
  phone: null,
  payload: {
    success: false,
  },
}

export function authorizationReducer(state = initialAuthorizationState, action = {}) {
  switch (action.type) {
    case `${types.AUTH}_PENDING`:
    case `${types.REGISTER}_PENDING`:
      return {
        ...state,
        isFetching: true,
        isRejected: false
      }
    case `${types.AUTH}_FULFILLED`:
    case `${types.REGISTER}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        isRejected: false,
        payload: action.payload
      }
    case `${types.AUTH}_REJECTED`:
    case `${types.REGISTER}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        isRejected: true,
        rejectedMessage: action.payload,
      }
    case `${types.LOG_OUT}`:
      return initialAuthorizationState;
    default:
      return state;
  }
}
