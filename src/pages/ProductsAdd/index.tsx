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
import { AppBar } from '../../components/AppBar'
import { SideBar } from '../../components/molecules/SideBar'
import { ProductsAddFormEdit } from '../../components/molecules/ProductsAddFormEdit'
import { ProductsAddFormEdit2 } from '../../components/molecules/ProductsAddFormEdit2'
import { ProductsAddFormEdit3 } from '../../components/molecules/ProductsAddFormEdit3'

export const ProductsAdd: React.FC = () => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} title="Adicionar" />
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
                Criar um novo produto
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <ProductsAddFormEdit />
            </Grid>
            <Grid item xs={4}>
              <ProductsAddFormEdit2 />
              <ProductsAddFormEdit3 />
              <Button variant="contained">Criar produto</Button>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}
