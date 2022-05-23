import { ReturnErrorInterface, ReturnOnlyErrorInterface } from './common.types'

export interface AccessActionGetCurrentTokenParameters {
  token: string
}

export interface AccessActionIsAuthenticatedParameters {
  isAuthenticated: boolean
}

export interface AccessLogInParameters {
  userLogin: string
  userPass: string
}
export interface GetLogInReturnServiceInterface {
  token: string
  user: {
    id: number
    user_login: string
    display_name: string
    user_email: string
  }
}
export interface GetLogInSuccessReturnActionInterface {
  token: string
}

export interface AccessSignUpParameters {
  userLogin: string
  userPass: string
  userEmail: string
  displayName: string
}
export interface PostSignUpReturnServiceInterface {
  created: boolean
}

export interface DeleteLogOutReturnServiceInterface {
  revoked: boolean
}

export interface AccessResetPasswordParameters {
  userLogin: string
}

export interface AccessResetPasswordVerifyCodeParameters {
  token: string
}

export interface AccessResetPasswordChangePasswordParameters {
  password: string
}
export interface AccessServiceResetPasswordChangePasswordParameters {
  token: string
  password: string
}

export const ACCESS_GET_CURRENT_TOKEN = 'ACCESS_GET_CURRENT_TOKEN'
export const ACCESS_GET_IS_AUTHENTICATED = 'ACCESS_GET_IS_AUTHENTICATED'
export const GET_SIGN_IN = 'GET_SIGN_IN'
export const DELETE_LOG_OUT = 'DELETE_LOG_OUT'
export const ACCESS_RESET_PASSWORD = 'ACCESS_RESET_PASSWORD'
export const ACCESS_RESET_PASSWORD_VERIFY_CODE =
  'ACCESS_RESET_PASSWORD_VERIFY_CODE'
export const ACCESS_RESET_PASSWORD_CHANGE_PASSWORD =
  'ACCESS_RESET_PASSWORD_CHANGE_PASSWORD'
export const ACCESS_RESET_PASSWORD_FINISHED = 'ACCESS_RESET_PASSWORD_FINISHED'
export const ACCESS_SIGN_UP = 'ACCESS_SIGN_UP'
export const ACCESS_SIGN_UP_VERIFY_CODE = 'ACCESS_SIGN_UP_VERIFY_CODE'
export const ACCESS_SIGN_UP_FINISHED = 'ACCESS_SIGN_UP_FINISHED'

interface AccessActionGetCurrentToken {
  type: typeof ACCESS_GET_CURRENT_TOKEN
  payload: AccessActionGetCurrentTokenParameters | null
}

interface AccessActionGetIsAuthenticated {
  type: typeof ACCESS_GET_IS_AUTHENTICATED
  payload: AccessActionIsAuthenticatedParameters | null
}

interface GetLogInAction {
  type: typeof GET_SIGN_IN
  payload: {
    success: GetLogInSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface DeleteLogOutAction {
  type: typeof DELETE_LOG_OUT
  payload: ReturnOnlyErrorInterface
}

interface AccessResetPassword {
  type: typeof ACCESS_RESET_PASSWORD
  payload: boolean | null
}

interface AccessResetPasswordVerifyCode {
  type: typeof ACCESS_RESET_PASSWORD_VERIFY_CODE
  payload: string | null
}

interface AccessResetPasswordChangePassword {
  type: typeof ACCESS_RESET_PASSWORD_CHANGE_PASSWORD
  payload: boolean | null
}

interface AccessResetPasswordFinished {
  type: typeof ACCESS_RESET_PASSWORD_FINISHED
}

interface AccessActionSignUp {
  type: typeof ACCESS_SIGN_UP
}

interface AccessActionSignUpVerifyCode {
  type: typeof ACCESS_SIGN_UP_VERIFY_CODE
}

interface AccessActionSignUpFinished {
  type: typeof ACCESS_SIGN_UP_FINISHED
}

export interface AccessState {
  currentToken: string | null
  isAuthenticated: boolean | null
  getCurrentTokenError: ReturnErrorInterface | null
  getLogInError: ReturnErrorInterface | null
  deleteLogOutError: ReturnErrorInterface | null

  resetPasswordVerifyCodeActived: boolean | null
  resetPasswordChangePasswordActived: boolean | null
  resetPasswordFinishedActived: boolean | null
  resetPasswordToken: string | null

  signUpVerifyCodeActived: boolean | null
  signUpFinishedActived: boolean | null
}

export type AccessActionTypes =
  | AccessActionGetCurrentToken
  | AccessActionGetIsAuthenticated
  | GetLogInAction
  | DeleteLogOutAction
  | DeleteLogOutAction
  | AccessResetPassword
  | AccessResetPasswordVerifyCode
  | AccessResetPasswordChangePassword
  | AccessResetPasswordFinished
  | AccessActionSignUp
  | AccessActionSignUpVerifyCode
  | AccessActionSignUpFinished
