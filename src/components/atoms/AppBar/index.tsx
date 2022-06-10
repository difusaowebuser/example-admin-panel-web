import * as React from 'react'
import { styled, createTheme } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
  Drawer as MuiDrawer,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  Container,
  Grid,
  Paper,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar
} from '@mui/material'
import { Copyright } from '../Copyright'

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Sair']
const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

interface AppBarData {
  open: boolean
  title: string
  toggleDrawer(): void
}
export const AppBar = ({ open, title, toggleDrawer }: AppBarData) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogOut = () => {
    handleCloseUserMenu()
    console.log('Saindo...')
  }

  return (
    <AppAppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogOut}>
              <Typography textAlign="center">Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppAppBar>
  )
}
