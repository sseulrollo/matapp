import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { notifySuccess, notifyWarn } from './noti'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Spcall';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Selects = (props) => {
    const [value, setValue] = useState("");
    const [labelWidth, setLabelWidth] = useState(0);
    const [selectData, setData] = useState([]);
    const [header, setHeader] = useState([]);
    const [bindFlag, setBindFlag] = useState(false);
    const [stopFlag, setStopFlag] = useState(false);

    const inputLabel = useRef(props.inputLabel);

    useEffect(() => {
        setLabelWidth(inputLabel.current ? inputLabel.current.offsetWidth ? inputLabel.current.offsetWidth : '5em' : '5em');
    }, [])

    const handleChange = event => {
        props.onChange(props.id, value);
        setValue(event.target.value);
    }

    useEffect(() => {

        if (bindFlag) {
            if(props.spCall.status === "SUCCESS") {
                bindingData();
            } else if (props.spCall.status === "FAIL") {
                notifyWarn (props.spCall.message)
            } 
        }else if (selectData.length === 0 && !stopFlag) {
            if(props.where === '')
                getCodeData();
            else
                getDynamicData();
        }
    })

    const bindingData = () => {
        setBindFlag(false);
        let comboData = []
        comboData.push({key:'', text:''})

        const head = props.spCall.header;
        const data = props.spCall.data;

        console.log(comboData, data, head)
        if(data.length > 0)
            data.forEach(row => {
                comboData.push({
                    key: row[head[0]],
                    text: row[head[1]]
                })
            });
                               
        setHeader(head);
        setData(comboData)
    }

    const getCodeData = () => {
        setStopFlag(true)
        props.codeRequest(props.groupid)
            .then(()=> {
                    setBindFlag(true);             
            })
    }

    const getDynamicData = () => {
        setStopFlag(true)
        props.codeDynamicReq(props.groupid, props.where)
        .then(()=> {
                setBindFlag(true);                    
        })
    }
    const classes = useStyles

    return (
        <Select
            labelid={'lblSelect' + props.id}
            value={value}
            onChange={handleChange}
            displayEmpty
            fullWidth = {true}
            key={props.key}
            className={classes.selectEmpty}
            placeholder={props.placeholder}
            inputlabel={inputLabel}//{props.inputlabel}
        >
            {selectData.map(item => 
                <MenuItem value={item.key} key={'item' + props.key + item.key}>
                    {item.text}
                </MenuItem>
            )}
        </Select>
    )
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(Selects);