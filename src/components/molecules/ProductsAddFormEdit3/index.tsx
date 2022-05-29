import * as React from 'react'
import { Paper, Box, TextField } from '@mui/material'

export const ProductsAddFormEdit3: React.FC = () => {
  const [price, setPrice] = React.useState<string | null>(null)

  return (
    <Paper sx={{ width: '100%', mb: 3, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Preço"
          variant="outlined"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
      </Box>
    </Paper>
  )
}
