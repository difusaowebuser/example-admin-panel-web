import * as React from 'react'
import { alpha } from '@mui/material/styles'
import {
  Replay as ReplayIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Switch,
  Toolbar,
  TableRow,
  TableHead,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { getProducts, RootState } from '../../redux'

interface Data {
  id: number
  image: string
  name: string
  sku: number
  stock: boolean
  price: number
  category: string
  date: string
}

function createData(
  id: number,
  image: string,
  name: string,
  sku: number,
  stock: boolean,
  price: number,
  category: string,
  date: string
): Data {
  return {
    id,
    image,
    name,
    sku,
    stock,
    price,
    category,
    date
  }
}

const rows = [
  createData(
    1,
    'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format',
    'Bolsa preta',
    1,
    true,
    123.75,
    'Bolsa',
    '2022-05-02 12:15:45'
  ),
  createData(
    2,
    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format',
    'Bolsa branca',
    2,
    true,
    145,
    'Bolsa',
    '2022-05-01 13:01:45'
  ),
  createData(
    3,
    'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=164&h=164&fit=crop&auto=format',
    'Cinto',
    3,
    false,
    23,
    'Cinto',
    '2022-05-20 17:01:45'
  )
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
  noShort?: true
}

const headCells: readonly HeadCell[] = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: 'Imagem',
    noShort: true
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nome'
  },
  {
    id: 'sku',
    numeric: true,
    disablePadding: false,
    label: 'SKU'
  },
  {
    id: 'stock',
    numeric: false,
    disablePadding: false,
    label: 'Stock'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Categoria'
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Data'
  }
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.noShort ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableToolbarProps {
  numSelected: number
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Produtos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export function ProductList() {
  const { products } = useSelector(
    (state: ReturnType<RootState>) => state.products
  )
  const dispatch = useDispatch()

  const [loadingGetProduct, setLoadingGetProduct] = React.useState(true)
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)

  const [rowCellAnchorEl, setRowCellAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const rowCellOpen = Boolean(rowCellAnchorEl)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleRowCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRowCellAnchorEl(event.currentTarget)
  }
  const handleRowCellClose = () => {
    setRowCellAnchorEl(null)
  }

  const handleRowCellDelete = () => {
    handleRowCellClose()
    console.log('handleRowCellDelete')
  }

  const handleRowCellEdit = () => {
    handleRowCellClose()
    console.log('handleRowCellEdit')
  }

  React.useEffect(() => {
    async function onGetProducts() {
      await dispatch(getProducts())
      setLoadingGetProduct(false)
    }
    onGetProducts()
  })

  return (
    // <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                        onClick={event => handleClick(event, row.name)}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Avatar
                        alt={row.name}
                        src={row.image}
                        variant="square"
                        sx={{ margin: 2, width: 100, height: 100 }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.sku}</TableCell>
                    <TableCell align="left">
                      {row.stock ? 'Em estoque' : 'Em falta'}
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell>
                      <div>
                        <IconButton
                          id="rowCellBasicButton"
                          aria-controls={
                            rowCellOpen ? 'rowCellBasicMenu' : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={rowCellOpen ? 'true' : undefined}
                          onClick={handleRowCellClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="rowCellBasicMenu"
                          anchorEl={rowCellAnchorEl}
                          open={rowCellOpen}
                          onClose={handleRowCellClose}
                          MenuListProps={{
                            'aria-labelledby': 'rowCellBasicButton'
                          }}
                        >
                          <MenuItem
                            onClick={handleRowCellDelete}
                            sx={{ color: '#f00' }}
                          >
                            <DeleteIcon sx={{ marginRight: 2 }} />
                            Deletar
                          </MenuItem>
                          <MenuItem onClick={handleRowCellEdit}>
                            <EditIcon sx={{ marginRight: 2 }} />
                            Editar
                          </MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100, { value: -1, label: 'Todos' }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    // </Box>
  )
}
