import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const MenuItems = [
  {
    id: 1,
    name: 'Calça'
  },
  {
    id: 2,
    name: 'Cinto'
  },
  {
    id: 3,
    name: 'Sapato'
  }
]

export const Test = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Instead of tracking a single element, set the element according to
  // the menu item's index.
  const handleClick = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {MenuItems.map((item, index) => (
        <div key={index}>
          <Button color="inherit" onClick={e => handleClick(index, e)}>
            Menu{item.name}
          </Button>
          <Menu
            anchorEl={anchorEl && anchorEl[index]}
            open={Boolean(anchorEl && anchorEl[index])}
            onClose={handleClose}
            // getContentAnchorEl={null}
          >
            <MenuItem onClick={handleClose}>a: {item.name}</MenuItem>
            <MenuItem onClick={handleClose}>b: {item.name}</MenuItem>
            <MenuItem onClick={handleClose}>c: {item.name}</MenuItem>
          </Menu>
        </div>
      ))}
    </>
  )
}
