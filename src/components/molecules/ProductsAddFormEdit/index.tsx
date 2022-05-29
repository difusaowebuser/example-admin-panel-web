import * as React from 'react'
import { Paper, TextField, Box, Input, Button, Typography } from '@mui/material'

interface ProductsAddFormEditProps {
  name: string | null
  setName(name: string): void
  description: string | null
  setDescription(description: string): void
}
export const ProductsAddFormEdit = ({
  name,
  setName,
  description,
  setDescription
}: ProductsAddFormEditProps) => {
  // const [name, setName] = React.useState<string | null>(null)
  // const [description, setDescription] = React.useState<string | null>(null)
  const [image, setImage] = React.useState<string | null>(null)

  return (
    <Paper sx={{ width: '100%', mb: 2, padding: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Nome do Produto"
          variant="outlined"
          value={name}
          onChange={event => setName(event.target.value)}
          sx={{ mb: 3 }}
        />
        <Box>
          <Typography sx={{ mb: 1 }}>Descrição</Typography>
          <TextField
            multiline
            value={description}
            onChange={event => setDescription(event.target.value)}
            rows={8}
            fullWidth
            sx={{ mb: 3 }}
          />
        </Box>
        <Box>
          <Typography sx={{ mb: 1 }}>Imagem</Typography>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              value={image}
              onChange={event => setImage(event.target.value)}
              sx={{ display: 'none' }}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </Box>
      </Box>
    </Paper>
  )
}
