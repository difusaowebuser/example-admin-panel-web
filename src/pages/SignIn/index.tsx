import * as React from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper
} from '@mui/material'

import { Copyright } from '../../components/atoms/Copyright'

export function SignIn() {
  const [userLogin, setUserLogin] = React.useState<string | null>(
    'johnsistema@gmail.com'
  )
  const [userPass, setUserPass] = React.useState<string | null>(
    'johnsistemaPass123'
  )

  function handleSignIn() {
    // if (userLogin && userPass) {
    //   accessLogIn({ userLogin, userPass })
    // }
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h3" variant="body1">
              John Sistema
            </Typography>
            <Typography component="h1" variant="h5">
              Fazer login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nome de usuário ou email"
                name="userLogin"
                autoComplete="email"
                autoFocus
                onChange={e => setUserLogin(e.target.value)}
                value={userLogin}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="userPassword"
                label="Senha"
                type="password"
                autoComplete="current-password"
                onChange={e => setUserPass(e.target.value)}
                value={userPass}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignIn}
                disabled={!userLogin || !userPass}
              >
                Acessar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Copyright />
    </>
  )
}
