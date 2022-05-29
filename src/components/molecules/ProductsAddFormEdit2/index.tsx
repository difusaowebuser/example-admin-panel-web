import * as React from 'react'
import {
  Paper,
  Box,
  TextField,
  Switch,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'

export const ProductsAddFormEdit2: React.FC = () => {
  const [inStock, setInStock] = React.useState<boolean>(true)
  const [sku, setSku] = React.useState<string | null>(null)
  const [category, setCategory] = React.useState<number | null>(null)

  return (
    <Paper sx={{ width: '100%', mb: 3, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          control={
            <Switch
              checked={inStock}
              onChange={event => setInStock(event.target.checked)}
            />
          }
          label="Em estoque"
          sx={{ mb: 3 }}
        />
        <TextField
          label="SKU do produto"
          variant="outlined"
          sx={{ mb: 3 }}
          value={sku}
          onChange={event => setSku(event.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="select-label-id-category">Categoria</InputLabel>
          <Select
            labelId="select-label-id-category"
            value={category}
            label="Categoria"
            onChange={event => setCategory(event.target.value)}
          >
            <MenuItem value={1}>Calças</MenuItem>
            <MenuItem value={2}>Calçados</MenuItem>
            <MenuItem value={3}>Roupas</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
}
