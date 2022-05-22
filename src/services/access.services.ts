import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  AccessLogInParameters,
  AccessSignUpParameters,
  AccessResetPasswordParameters,
  AccessResetPasswordVerifyCodeParameters,
  AccessServiceResetPasswordChangePasswordParameters
} from '../types'

export const accessService = {
  getIsAuthenticated,
  accessLogIn,
  accessSignUp,
  deleteLogOut,
  accessResetPassword,
  accessResetPasswordVerifyCode,
  accessResetPasswordChangePassword
}

async function getIsAuthenticated(): Promise<AxiosResponse> {
  return await api.get('access/authenticated')
}

async function accessLogIn({
  userLogin,
  userPass
}: AccessLogInParameters): Promise<AxiosResponse> {
  return await api.get('access', {
    params: {
      user_login: userLogin,
      user_pass: userPass
    }
  })
}

async function accessSignUp({
  userLogin,
  userPass,
  userEmail,
  displayName
}: AccessSignUpParameters): Promise<AxiosResponse> {
  return await api.get('users/create', {
    params: {
      user_login: userLogin,
      user_pass: userPass,
      user_email: userEmail,
      display_name: displayName
    }
  })
}

async function deleteLogOut(): Promise<AxiosResponse> {
  return await api.get('access/delete')
}

async function accessResetPassword({
  userLogin
}: AccessResetPasswordParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password', {
    params: {
      user_login: userLogin
    }
  })
}

async function accessResetPasswordVerifyCode({
  token
}: AccessResetPasswordVerifyCodeParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password/verify-code', {
    params: { token }
  })
}

async function accessResetPasswordChangePassword({
  token,
  password
}: AccessServiceResetPasswordChangePasswordParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password/change-password', {
    params: { token, user_pass: password }
  })
}
