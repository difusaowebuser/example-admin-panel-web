import * as React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Routes } from './routes'
import { theme } from './styles/theme'

import { AccessProvider } from './contexts/access'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccessProvider>
        <Routes />
      </AccessProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
