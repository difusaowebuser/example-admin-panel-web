import * as React from 'react'
import { Typography, Link } from '@mui/material'

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      component="small"
    >
      &copy; {new Date().getFullYear()} Jonh Sistema &bull; Desenvolvido
      por&nbsp;
      <Link
        color="inherit"
        href="https://difusaoweb.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Difusão Web
      </Link>
    </Typography>
  )
}
