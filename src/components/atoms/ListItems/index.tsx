import * as React from 'react'
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse
} from '@mui/material'
import {
  Apps as AppsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'

export const MainListItems = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)} selected={true}>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={true}
            component="a"
            href="/produtos"
          >
            <ListItemText primary="Lista" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component="a"
            href="/produtos/adicionar"
          >
            <ListItemText primary="Adicionar" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}
