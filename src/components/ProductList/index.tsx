import * as React from 'react'
import { alpha } from '@mui/material/styles'
import {
  Replay as ReplayIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  TableRows
} from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'
import { DateTime } from 'luxon'
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
  MenuItem,
  CircularProgress
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { ProductData, getProducts, RootState } from '../../redux'

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
): (a: { [key in Key]: Key }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

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
  id: keyof ProductData
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
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'ProductData'
  }
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ProductData
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
    (property: keyof ProductData) => (event: React.MouseEvent<unknown>) => {
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
  loading: boolean
  numSelected: number
  onGetProducts(): void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { loading, numSelected, onGetProducts } = props

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
          {loading ? (
            <CircularProgress size={24} sx={{ margin: 1 }} />
          ) : (
            <IconButton onClick={onGetProducts}>
              <ReplayIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  )
}

export function ProductList() {
  const { productsList } = useSelector(
    (state: ReturnType<RootState>) => state.products
  )
  const dispatch = useDispatch()

  const [loadingGetProduct, setLoadingGetProduct] = React.useState(false)
  const [rows, setRows] = React.useState<ProductData[] | null>(null)
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof ProductData>('created_at')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)

  const [rowCellAnchorEl, setRowCellAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const rowCellOpen = Boolean(rowCellAnchorEl)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProductData
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map(n => n.name)
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (rows?.length ?? 0)) : 0

  const handleRowCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRowCellAnchorEl(event.currentTarget)
  }
  const handleRowCellClose = () => {
    setRowCellAnchorEl(null)
  }

  const handleRowCellDelete = (id: number) => {
    handleRowCellClose()
    console.log('handleRowCellDelete')
    if (rows) {
      setRows(rows.filter(r => !(r?.id === id)))
    }
  }

  const handleRowCellEdit = () => {
    handleRowCellClose()
    console.log('handleRowCellEdit')
  }

  async function onGetProducts() {
    console.log('onGetProducts')
    setLoadingGetProduct(true)
    // await new Promise(r => setTimeout(r, 60 * 1000))
    await dispatch(getProducts())
    if (productsList) {
      console.log(productsList)
      setRows(productsList)
      console.log(rows)
    }
    setLoadingGetProduct(false)
  }

  React.useEffect(() => {
    onGetProducts()
  }, [])

  return (
    // <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        loading={loadingGetProduct}
        onGetProducts={onGetProducts}
      />
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
            rowCount={rows?.length ?? 0}
          />
          {rows && (
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  const rowDateTimeString = DateTime.fromISO(
                    row.created_at
                  ).toFormat('dd/MM/yyyy HH:mm')

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
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
                      <TableCell align="left">{rowDateTimeString}</TableCell>
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
                              onClick={handleRowCellDelete(row.id)}
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
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100, { value: -1, label: 'Todos' }]}
        component="div"
        count={rows?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    // </Box>
  )
}
