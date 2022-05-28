import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import { SignIn } from '../../pages/SignIn'

export const AccessRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<SignIn />} />
    </Routes>
  )
}
