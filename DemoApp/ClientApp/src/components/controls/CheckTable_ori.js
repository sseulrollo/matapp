import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';


import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Spcall';
import { connect } from 'react-redux';

import { toast } from 'react-toastify'

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
    console.log(array)
    const stabilizedThis = array.map((el, index) =>  [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => {console.log(el); return el[0]});
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function SetTableHead (props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow>
                {props.header.map(({headCell, index}) => {
                    if (!headCell.startWith("<") && !headCell.toUpperCase().constain("@@CHK"))
                        return (<TableCell
                                    key={'header'+index}
                                    padding={headCell}
                                    sortDirection={orderBy === headCell ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell}
                                        direction={order}
                                        onClick={createSortHandler(headCell)}
                                    >
                                        {headCell}
                                        {orderBy === headCell ? (
                                            <span>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>)
                    else if (headCell.toUpperCase().constain("@@CHK"))
                        return (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked = {numSelected === rowCount}
                                    onChange={onSelectAllClick}                                    
                                />
                            </TableCell>)
                    // else if(headCell.startWith("<"))
                })}
            </TableRow>
        </TableHead>
    )
}

const CheckTable = (props) => {

    const [header, setData] = useState(props.header);
    const [tableData, setHeader] = useState(props.initialData);
    const [selectedList, setSelected] = useState([]);
    const [selections, setSelections] = useState({});
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.header[0]);
    const [page, setPages] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableParam, setTableParam] = useState(props.tableParam)

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    const handleSelectAllClick = event => {
        if(event.target.checked) {
            const newSelecteds = tableData.map(m => m["@@key"] ? m["@@key"] : m["@@KEY"] ? m["@@KEY"] : m[header[0]])
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const handleClick = (event, name) => {
        const selectedIndex = selectedList.indexOf(name);
    }


    const getAddData = (tableParam) => {
        const {loadSp, checkSame, checkValue, initialData, data} = props;
        
        if(checkSame && checkValue !== "" && data.length > 0){
            
            if(checkSame && (data.filter(r=> r["@@key"] === tableParam[checkValue]).length > 0
                || data.filter(r=> r["@@KEY"] === tableParam[checkValue]).length > 0)){
                this.notifyWarn({msg:'이미 스캔한 데이터입니다.'});
                return;
            }
        }        

        return props.loadSingleRequest(loadSp, tableParam)
                .then(() => {
                    console.log(props)
                    // if(props.spCall.status === "SUCCESS"){
                    //     setHeader(props.spCall.header),
                    //     setData(tableData === initialData ?
                    //         props.spCall.data : tableData.concat(props.spCall.data))
                            
                    // }else 
                    //     {notifyWarn(props.spCall.message)}
                    
                })
                .catch(e => {notifyWarn(e)}
                )
    }

    
    const notifyWarn = msg => this.toastId = toast.warn(msg, { autoClose: true})
    const notifySuccess = msg => this.toastId = toast.success(msg, { autoClose: true})


    const getData = (params) => {
        const {loadSp} = this.state;
       
        return props.loadSingleRequest(loadSp, params)
        .then(() => {
            if(this.props.spCall.status === "SUCCESS"){
                setHeader(props.spCall.header)
                setData(props.spCall.data)
            }
        });
    }

    const removeData = (flag) => {
        
        if(!this._isMounted)
            return;

        if(selectedList === undefined || selectedList.length === 0)
            return
                    
        if (flag === 'save'){

            let temp = '';
            selectedList.forEach(element => {                
                temp = temp + "," + element
            });
            
            props.onSave(temp.substr(1));
        }

        let lst = tableData;
        // 소문자 @@key check 도 필요
        selectedList.map(item =>
            lst = lst.filter(row => row["@@KEY"] !== item)
        )

        setData(lst);
        setSelected([]);
        setSelections({});

        props.editEndEvent();
        
    }

    const isSelected = name => selectedList.indexOf(name) !== -1;

    const handleChkChange = (e) => {
        e.preventDefault();
        props.selectedChange(e)
    }

    useEffect(() => {
        console.log('heelo')
        if(props.selectParams !== [] && props.searchFlag){  
            getData(props.selectParams);
        } else if(props.tableParam !== tableParam 
            && props.tableParam !== []){            
            getAddData(props.tableParam)
        } else if(props.selectedList !== selectedList 
            && props.delFlag !== 'none')
            removeData(props.delFlag)
    });
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    console.log(props)
    return (
        <Fragment>
            {/* <Paper> */}
                <Table>
                    <SetTableHead 
                        props={props}
                    />
                    <TableBody>
                        {stableSort(tableParam, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const isItemSelected = isSelected(row["@@KEY"]);
                            const laeblId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={event => handleClick(event, row["@@KEY"])}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row["@@KEY"]}
                                    selected={isItemSelected}
                                >
                                    {header.map(head => {
                                        const headerTag = head.split(">").length > 1 ? head.split(">")[0] : "";
                                        if (head.toLowerCase() === "@@chk")
                                            return (<TableCell padding="checkbox">
                                                    <Checkbox 
                                                        checked={isItemSelected} 
                                                        // onChange={() => this.handleSelect({keys})}
                                                        // key= {'chk' + index + 'head'}
                                                    />
                                                </TableCell>);
                                        else if (head.startsWith("@@")) { }
                                        else if (headerTag === "")
                                            return (<TableCell >{row[head]}</TableCell>);
                                        else {
                                            const tags = headerTag.replace('<', '').toUpperCase();
                                            
                                            switch (tags) {
                                                case "CHK":
                                                    return (<TableCell padding="checkbox">
                                                        <Checkbox 
                                                            checked={isItemSelected} 
                                                            // onChange={() => this.handleSelect({keys})}
                                                            // key= {'chk' + index + 'head'}
                                                        />
                                                    </TableCell>);
                                                    break;
                                                default  :
                                                    break;
                                            }
                                        }
                                        // idx= idx+1;
                                    })}
                                </TableRow>
                            )
                        })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                    </TableBody>
                </Table>
            {/* </Paper> */}
        </Fragment>
    )
}
export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CheckTable)