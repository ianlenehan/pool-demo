import React, { Component } from 'react';
import faker from 'faker'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { FilterList as FilterListIcon, AddCircle } from '@material-ui/icons';
import './Products.css'

const data = [
  {
    id: 1,
    model: 'Absolute',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 2,
    model: 'Acclaim',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 3,
    model: 'Allure',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 4,
    model: 'Elegance',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 5,
    model: 'Absolute',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 6,
    model: 'Acclaim',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 7,
    model: 'Allure',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
  {
    id: 8,
    model: 'Elegance',
    size: 12.00,
    litres: 55000,
    loads: 5.5,
    fob: 20047,
    frgt: 800,
    total: 20847,
    cover: 1618,
  },
]

function desc(a, b, orderBy) {
  // work out how to sort by date here
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'model', numeric: false, disablePadding: false, label: 'Model' },
  { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
  { id: 'litres', numeric: true, disablePadding: false, label: 'Litres' },
  { id: 'loads', numeric: true, disablePadding: false, label: 'Loads' },
  { id: 'fob', numeric: true, disablePadding: false, label: 'FOB + GST' },
  { id: 'frgt', numeric: true, disablePadding: false, label: 'FRGT' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
  { id: 'cover', numeric: true, disablePadding: false, label: 'Cover' },
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

let EnhancedTableToolbar = props => {
  return (
    <Toolbar
      className="toolbar"
    >
      <div className="title">
        <Typography variant="title" id="tableTitle">
          Products
        </Typography>
      </div>
      <div className="spacer" />
      <div className="actions">
        <Tooltip title="Add customer">
          <IconButton aria-label="Add customer">
            <AddCircle className="header-icon" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon className="header-icon" />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class Products extends Component {
  state = {
    order: 'desc',
    orderBy: 'date',
    selected: [],
    data: data,
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className="table-wrapper">
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      className="customer-row"
                    >
                      <TableCell component="th" scope="row">
                        {n.model}
                      </TableCell>
                      <TableCell numeric>{n.size}</TableCell>
                      <TableCell numeric>{n.litres}</TableCell>
                      <TableCell numeric>{n.loads}</TableCell>
                      <TableCell numeric>{n.fob}</TableCell>
                      <TableCell numeric>{n.frgt}</TableCell>
                      <TableCell numeric>{n.total}</TableCell>
                      <TableCell numeric>{n.cover}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(Products);
