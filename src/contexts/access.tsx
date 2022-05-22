import * as React from 'react'

import { accessService } from '../services'
import { AccessLogInParameters } from '../types'

export interface UserData {
  id: number
  name: string
  seconds: number
}

interface AccessContextData {
  signed: boolean
  user: UserData | null
  loading: boolean
  accessLogIn({ userLogin, userPass }: AccessLogInParameters): Promise<void>
  signOut(): void
}

const AccessContext = React.createContext<AccessContextData>(
  {} as AccessContextData
)

const AccessProvider = ({ children }) => {
  const [user, setUser] = React.useState<UserData | null>(null)
  const [loading, setLoading] = React.useState(true)

  async function accessLogIn({ userLogin, userPass }: AccessLogInParameters) {
    console.log({ userLogin, userPass })
    const { data } = await accessService.accessLogIn({ userLogin, userPass })
    console.log(data)
    // setUser(newUser)
  }

  async function signOut() {
    await localStorage.clear()
    setUser(null)
  }

  React.useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await localStorage.getItem('@JohnSistema:user')

      if (storagedUser) {
        setUser(JSON.parse(storagedUser))
      }

      setLoading(false)
    }

    loadStorageData()
  })

  return (
    <AccessContext.Provider
      value={{ signed: !!user, user, loading, accessLogIn, signOut }}
    >
      {children}
    </AccessContext.Provider>
  )
}

function useAccess() {
  const context = React.useContext(AccessContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AccessProvider, useAccess }
