import * as React from 'react'
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button
} from '@mui/material'
import { Copyright } from '../../components/atoms/Copyright'

import { Add as AddIcon } from '@mui/icons-material'

import { UserList } from '../../components/ecosystems/UserList'
import { AppBar } from '../../components/atoms/AppBar'
import { SideBar } from '../../components/molecules/SideBar'

export const UsersList: React.FC = () => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} title="Usuários" />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItens: 'center', marginBottom: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >
                Lista de usuários
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                href="/usuarios/adicionar/"
              >
                Novo Usuário
              </Button>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <UserList />
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}
