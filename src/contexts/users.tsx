import * as React from 'react'

import { productsService } from '../services'
import { UsersLogInParameters } from '../types'

export interface UserData {
  id: number
  name: string
  seconds: number
}

interface UsersContextData {
  signed: boolean
  user: UserData | null
  loading: boolean
  productsLogIn({ userLogin, userPass }: UsersLogInParameters): Promise<void>
  signOut(): void
}

const UsersContext = React.createContext<UsersContextData>(
  {} as UsersContextData
)

const UsersProvider = ({ children }) => {
  const [user, setUser] = React.useState<UserData | null>(null)
  const [loading, setLoading] = React.useState(true)

  async function productsLogIn({ userLogin, userPass }: UsersLogInParameters) {
    console.log({ userLogin, userPass })
    const { data } = await productsService.productsLogIn({
      userLogin,
      userPass
    })
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
    <UsersContext.Provider
      value={{ signed: !!user, user, loading, productsLogIn, signOut }}
    >
      {children}
    </UsersContext.Provider>
  )
}

function useUsers() {
  const context = React.useContext(UsersContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { UsersProvider, useUsers }
