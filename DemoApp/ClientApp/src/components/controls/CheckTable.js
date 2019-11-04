import React, {useState, useEffect, createRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { } from '@material-ui/core'

import { toast } from 'react-toastify'

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Spcall';
import { TableHeader } from 'semantic-ui-react';


function desc(a, b, orderBy) {
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

function createHeaderData(header) {
  return header.map((m, index) => ({
      id: index,
      name: m
    })
  );
}


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, data } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  
  const header = createHeaderData(data);

  
  const MakeHeader = () => {
    const lst = header.map(headCell => {
        
      if (headCell.name === "@@chk" || headCell.name === "@@CHK")
        return <TableCell key={'tc' + headCell.id} padding="checkbox">
          <Checkbox 
            indeterminate={numSelected > 0 && numSelected < rowCount} 
            key={headCell.id} 
            checked={numSelected === rowCount} 
            onChange={onSelectAllClick} 
            ref={props.refControl}
          />
        </TableCell>
      else if (!headCell.name.startsWith("@@")) 
        return <TableCell key={headCell.id} sortDirection={orderBy === headCell.name ? order : false}>
          <TableSortLabel active={orderBy === headCell.name} direction={order} key={'lbl' + headCell.id} onClick={createSortHandler(headCell.name)}>
            {headCell.name}
            {orderBy === headCell.name ? (<span className={classes.visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </span>) : null}
          </TableSortLabel>
        </TableCell>
      })      
      return <TableRow key="headerRow">{lst}</TableRow>
    }
    
    return <TableHeader><MakeHeader /></TableHeader>;
  }


EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  header: PropTypes.object
};


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const notifyWarn = msg => toast.warn(msg, { autoClose: true})
const notifySuccess = msg => toast.success(msg, { autoClose: true})


function CheckTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableParam, setTableParam] = useState(props.tableParam);
  const [selectParams, setSelectParams] = useState(props.selectParams);

  const [header, setHeader] = useState(props.header);
  const [tableData, setTableData] = useState(props.initialData)
  const [dataChanges, setDataChanges] = useState(false);

  
  const setAllClear = createRef();

  useEffect(() => {
    if (tableParam !== props.tableParam && props.tableParam !== {}){
      getAddData(props.tableParam)
      setTableParam(props.tableParam)
    } else if(props.selectParams !== [] && props.searchFlag){  
      getData(props.selectParams);
    } else if(props.delFlag !== 'none')
      removeData(props.delFlag)
    else if (header && orderBy === ''){
      if(header.filter(r => r === "@@key").length > 0) {
        setOrderBy("@@key")
      } else if (header.filter(r => r === "@@KEY").length > 0) {
        setOrderBy("@@KEY")
      } else if (header[0] !== "@@chk" && header[0] !== "@@CHK" && !header[0].startsWith("@@")){
        setOrderBy(header[0])
      } else {
        let lst = header.filter(r => !r.startsWith("@@"));
        setOrder(lst[0])
      }
    } else if (dataChanges) {
      if(props.spCall.status === "SUCCESS"){
        if(!props.spCall.header)
          setHeader(props.spCall.header)

        if(tableParam)
          setTableData(
            tableData === props.initialData ? 
                props.spCall.data : 
                tableData.concat(props.spCall.data)
          )
        else
          setTableData(props.spCall.data);
      } else 
        {notifyWarn(props.spCall.message)}

      setDataChanges(false)
    }
  })

  const getAddData = (tableParam) => {

    const {loadSp, checkSame, checkValue} = props;
    
    if(checkSame && checkValue !== "" && tableData.length > 0){
        if(checkSame && 
            (tableData.filter(r=> r["@@key"] === tableParam[checkValue]).length > 0
            || tableData.filter(r=> r["@@KEY"] === tableParam[checkValue]).length > 0)){
            {notifyWarn('이미 스캔한 데이터입니다.')}
            return;
        }
    }        

    return props.loadSingleRequest(loadSp, tableParam)
            .then(() => setDataChanges(true))
            .catch(e => {notifyWarn(e)}
            )
  }

  const getData = (params) => {
    const {loadSp} = props;
   
    return props.loadSingleRequest(loadSp, params)
    .then(() => setDataChanges(true));
  }

  const removeData = (flag) => {
    if(selected === undefined || selected.length === 0)
        return
                
    if (flag === 'save'){
        let temp = '';
        selected.forEach(element => {                
            temp = temp + "," + element
        });
        props.onSave(temp.substr(1));
    }

    let lst = tableData;
    // 소문자 @@key check 도 필요
    selected.map(item => lst = lst.filter(row => row["@@KEY"] !== item))

    setTableData(lst);
    setAllClear.current.click();
    props.editEndEvent();    
}

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {      
      const newSelecteds = tableData.map((n, index) => n["@@key"] ? n["@@key"] : n["@@KEY"] ? n["@@KEY"] : index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
              data={header}
              refControl={setAllClear}
            />
            <TableBody>
              {stableSort(tableData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelid = `enhanced-table-checkbox-${index}`;
                  const keyValue = row["@@key"] ? row["@@key"] : row["@@KEY"] ? row["@@KEY"] : index
                  const isItemSelected = isSelected(keyValue);
                  
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, keyValue)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={'row' + index}
                      selected={isItemSelected}
                    >
                      {header.map((head, idx) => {
                        
                        const headerTag = head.split(">").length > 1 ? head.split(">")[0] : "";
                        if (head.toLowerCase() === "@@chk")
                          return (
                            <TableCell
                              padding="checkbox"
                              key= {'tc' + index + 'chk'}>
                                  <Checkbox 
                                      checked={isItemSelected} 
                                      key= {'chk' + index + 'head'}
                                  />
                            </TableCell>);
                        else if (head.startsWith("@@")) { }
                        else if (headerTag === "")
                          return (<TableCell key={'tc'+ index + 'n' + idx}>{row[head]}</TableCell>);
                        else {
                          const tags = headerTag.replace('<', '').toUpperCase();
                          
                          switch (tags) {
                            case "CHK":
                                return (
                                  <TableCell padding="checkbox"
                                    key= {'tc' + index + 'chk'}>
                                    <Checkbox 
                                        checked={isItemSelected} 
                                        key= {'chk' + index + 'head'}
                                    />
                                  </TableCell>);
                                break;
                            default  :
                                break;
                          }
                        }
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 40 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


export default connect(
  state => state.spCall,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(CheckTable)