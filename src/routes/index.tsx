import * as React from 'react'
import { Box, CircularProgress } from '@mui/material'

import { useAccess } from '../contexts/access'
import { AccessRoutes } from './Access/index.routes'
import { AppRoutes } from './App/index.routes'

export const Routes: React.FC = () => {
  // const { signed, loading } = useAccess()
  const loading = false
  const signed = false

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return true ? <AppRoutes /> : <AccessRoutes />
}
