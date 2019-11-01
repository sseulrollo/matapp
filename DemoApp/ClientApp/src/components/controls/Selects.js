import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

    const inputLabel = useRef(null);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, [])

    const handleChange = event => {
        props.onChange(this.props.id, value);
        setValue(event.target.value);
    }

    useEffect(() => {

        if(bindFlag) {
            bindingData();
        } else if (selectData.length === 0) {
            if(props.where === '')
                getCodeData();
            else
                getDynamicData();
        }
    })

    const bindingData = () => {
        let comboData = []
        comboData.push({key:'', text:''})
        setHeader(props.spCall.header);

        const data = props.spCall.data;

        if(data.length > 0)
            data.forEach(row => {
                comboData.push({
                    key: row[header[0]],
                    text: row[header[1]]
                })
            });
                        
        setData(comboData)
    }

    const getCodeData = () => {
        props.codeRequest(props.groupid)
            .then(()=> {
                if (props.spCall.status === "SUCCESS"){
                    setBindFlag(true);                    
                }    
            })
    }

    const getDynamicData = () => {
        props.codeDynamicReq(props.groupid, props.where)
        .then(()=> {
            if (props.spCall.status === "SUCCESS"){
                setBindFlag(true);                    
            }    
        })
    }
    const classes = useStyles

    return (
        <Select
            labelId={'lblSelect' + props.id}
            value={value}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
        >
            {selectData.map(item => 
                <MenuItem value={item.key}>
                    {item.text}
                </MenuItem>
            )}
        </Select>
    )
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(Select);