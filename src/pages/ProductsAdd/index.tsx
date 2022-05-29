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

  const [name, setName] = React.useState<string | null>(null)
  const [description, setDescription] = React.useState<string | null>(null)
  const [inStock, setInStock] = React.useState<boolean>(true)
  const [sku, setSku] = React.useState<string | null>(null)
  const [categoryId, setCategoryId] = React.useState<number | null>(null)
  const [price, setPrice] = React.useState<number | null>(null)

  function addNewProduct() {
    console.log({ name, description, inStock, sku, categoryId, price })
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
        <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
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
              <ProductsAddFormEdit
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
            </Grid>
            <Grid item xs={4}>
              <ProductsAddFormEdit2
                inStock={inStock}
                setInStock={setInStock}
                sku={sku}
                setSku={setSku}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
              />
              <ProductsAddFormEdit3 price={price} setPrice={setPrice} />
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={addNewProduct}
              >
                Criar produto
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </Box>
    </Box>
  )
}
