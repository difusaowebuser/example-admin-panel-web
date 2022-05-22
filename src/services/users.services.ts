import { AxiosResponse } from 'axios'

import { api } from './api'
import { GetUserProfileParametersServiceInterface } from '../redux/types'

export const userService = { getUserProfile }

async function getUserProfile({
  userId
}: GetUserProfileParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('users/profile', { params: { user_id: userId } })
}
