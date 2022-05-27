import * as React from 'react'
import { Box, CircularProgress } from '@mui/material'

import { AccessRoutes } from './Access/index.routes'
import { AppRoutes } from './App/index.routes'
import { Test } from '../pages/Test'

export const Routes: React.FC = () => {
  const loading = false
  const signed = true

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return signed ? <AppRoutes /> : <AccessRoutes />
}
