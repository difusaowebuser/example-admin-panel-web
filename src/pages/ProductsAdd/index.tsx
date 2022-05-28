import * as React from 'react'
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button
} from '@mui/material'
import { Copyright } from '../../components/Copyright'

import { Add as AddIcon } from '@mui/icons-material'

import { ProductList } from '../../components/ProductList'
import { AppBar } from '../../components/AppBar'
import { SideBar } from '../../components/molecules/SideBar'

export const ProductsAdd: React.FC = () => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} title="Produtos" />
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
                Lista de produtos
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Button variant="contained" startIcon={<AddIcon />}>
                Novo Produto
              </Button>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
              <ProductList />
              {/* </Paper> */}
            </Grid>
          </Grid>
          <Copyright
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 0,
              my: 2
            }}
          />
        </Container>
      </Box>
    </Box>
  )
}