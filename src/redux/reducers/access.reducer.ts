import {
  AccessState,
  AccessActionTypes,
  ACCESS_GET_CURRENT_TOKEN,
  ACCESS_GET_IS_AUTHENTICATED,
  GET_SIGN_IN,
  DELETE_LOG_OUT,
  ACCESS_RESET_PASSWORD,
  ACCESS_RESET_PASSWORD_VERIFY_CODE,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
  ACCESS_RESET_PASSWORD_FINISHED,
  ACCESS_SIGN_UP,
  ACCESS_SIGN_UP_VERIFY_CODE,
  ACCESS_SIGN_UP_FINISHED
} from '../types'

const initialState: AccessState = {
  currentToken: null,
  isAuthenticated: null,
  getCurrentTokenError: null,
  getLogInError: null,
  deleteLogOutError: null,

  resetPasswordVerifyCodeActived: null,
  resetPasswordToken: null,
  resetPasswordChangePasswordActived: null,
  resetPasswordFinishedActived: null,

  signUpVerifyCodeActived: null,
  signUpFinishedActived: null
}

export function accessReducer(
  state: AccessState = initialState,
  action: AccessActionTypes
): AccessState {
  switch (action.type) {
    case ACCESS_GET_CURRENT_TOKEN: {
      return {
        ...state,
        currentToken: action.payload?.token ?? null
      }
    }
    case ACCESS_GET_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload?.isAuthenticated ?? null,
        currentToken: action.payload?.isAuthenticated
          ? state.currentToken
          : null
      }
    }
    case GET_SIGN_IN: {
      return {
        ...state,
        currentToken: action.payload.success?.token ?? null,
        getLogInError: action.payload.failure
      }
    }
    case ACCESS_SIGN_UP: {
      return {
        ...state,
        signUpVerifyCodeActived: true
      }
    }
    case ACCESS_SIGN_UP_VERIFY_CODE: {
      return {
        ...state,
        signUpFinishedActived: true
      }
    }
    case ACCESS_SIGN_UP_FINISHED: {
      return {
        ...state,
        signUpVerifyCodeActived: null,
        signUpFinishedActived: null
      }
    }
    case DELETE_LOG_OUT: {
      return {
        ...state,
        currentToken: null,
        isAuthenticated: null,
        deleteLogOutError: action.payload.failure
      }
    }
    case ACCESS_RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordVerifyCodeActived: true
      }
    }
    case ACCESS_RESET_PASSWORD_VERIFY_CODE: {
      return {
        ...state,
        resetPasswordChangePasswordActived: true,
        resetPasswordToken: action.payload
      }
    }
    case ACCESS_RESET_PASSWORD_CHANGE_PASSWORD: {
      return {
        ...state,
        resetPasswordFinishedActived: true
      }
    }
    case ACCESS_RESET_PASSWORD_FINISHED: {
      return {
        ...state,
        resetPasswordVerifyCodeActived: null,
        resetPasswordToken: null,
        resetPasswordChangePasswordActived: null,
        resetPasswordFinishedActived: null
      }
    }
    default:
      return state
  }
}
