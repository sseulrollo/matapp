import React, {useState, useEffect, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardHeader, Checkbox } from '@material-ui/core';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Spcall';
import { notifyWarn } from "./noti";

const useStyles = makeStyles({
    card: {
        minWidth: 120,
        border: 'solid',
        borderWidth: '1',
        borderColor:'#f2f2f2'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}); 

const CardList = (props) => {
    const [data, setData] = useState([]);
    const [header, setHeader] = useState(props.header)
    const [title, setTitle] = useState(props.title ? props.title : "");
    const [main, setMain] = useState(props.main)
    const [tableParam, setTableParam] = useState({});
    const [selected, setSelected] = useState([])
    const [stopFlag, setStop] = useState(false)

    const setAllClear = createRef();

    useEffect(() => {
        if (tableParam !== props.tableParam && props.tableParam !== {}){
            getAddData(props.tableParam)
        } else if(props.selectParams !== [] && props.searchFlag){  
            getData(props.selectParams);
        } else if(!stopFlag && props.delFlag !== 'none' && selected && selected.length > 0) {
            setStop(true)

            if(props.delFlag === 'save')
                saveData();
            else
                removeData();//props.delFlag)
        }
    })

    const getAddData = (tableParam) => {
        const {loadSp, checkSame, checkValue} = props;
        setTableParam(props.tableParam)
        
        if(checkSame && tableParam[checkValue] === "")
            return;

        if(checkSame && checkValue !== "" && data.length > 0){
            if(checkSame && 
                data.filter(r=> r.main === tableParam[checkValue]).length > 0) {
                {notifyWarn('이미 스캔한 데이터입니다.')}
                return;
            } 
        }         

        return props.loadSingleRequest(loadSp, tableParam)
                .then(res => {
                    if(res.response.err)
                        notifyWarn(res.response.err)
                    else
                        changeData(res.response.data, 'add')
                })
                .catch(e => {notifyWarn(e)})
      }
    
      const getData = (params) => {
        const {loadSp} = props;
        return props.loadSingleRequest(loadSp, params)
        .then(res => {
            if(res.response.err)
                notifyWarn(res.response.err)
            else
                changeData(res.response.data, 'all')
        })
        .catch(e => {notifyWarn(e)});
      }

      const saveData = () => {
        
        let temp = '';
        selected.forEach(element => {                
            temp = temp + "," + element
        });

        const saveParamData = {
            ...props.saveParam, 
            "PARAMS": temp.substr(1)
        }

        props.executeRequest(props.saveSp, saveParamData)
        .then(m => {
            removeData();
        })
        .catch(e => notifyWarn(e))

      }
    
      const removeData = () => {
        let lst = data;
        
        selected.map(item => lst = lst.filter(row => row.id !== item))
    
        changeData(lst);
        props.editEndEvent();    
        setStop(false);
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {     
          const newSelecteds = data.map((n, index) => n.id);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };
    
    const handleClick = (e, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
    
    const isSelected = id => selected.indexOf(id) !== -1;

    const changeData = (paramData, type) => {
        let returnData = [];

        if(type === 'add')
            returnData = data;

        paramData.map((item, index) => {

            let contentList = [];
            let isCheck = false;
            let setId = 'card' + index;

            {header.map((head, idx) => {
                if(head.toUpperCase() !== main.replace('_', '').toUpperCase() && head.toUpperCase() !== "@@KEY" && head.toUpperCase() !== "@@CHK") {
                    contentList.push({
                        id: head,  
                        value: item[head]
                    })}
                else if (head.toUpperCase() === "@@CHK"){
                    isCheck = true;}
                else if (head.toUpperCase() === "@@KEY") {
                    setId = item["@@KEY"] ? item["@@KEY"] : item["@@key"]
                }
            })}

            const arg = {
                main : item[main] ? item[main] : item[main.toUpperCase()] ? item[main.toUpperCase()] : item[main.toLowerCase()],
                id: setId,
                content : contentList,
                check: isCheck
            }
                        
            if (data.length > 0) {
                returnData = returnData.concat(arg)
            } else {
                returnData.push(arg)
            }
        })
        setData(returnData);
    }

    const classes = useStyles();
    
    return (
        <div >
            <div style={{marginTop:'1em', }}>
                <Typography component="h6" >
                    <Checkbox 
                        key={"cboall_" + props.key} 
                        onChange={handleSelectAllClick}
                        checked={selected.length > 0  && selected.length === data.length}
                        ref={setAllClear}
                        />
                    전체 선택
                </Typography>
            </div>
            <div style={{maxHeight: '310px', overflowY:'auto'}}>
                {data && data.length > 0 ? data.map(item => 
                    <Card 
                        className={classes.card}
                        key={'card' + item.id}>
                        <CardHeader 
                            title={item.main} 
                            action={
                                <Checkbox 
                                    key={item.id}
                                    checked={isSelected(item.id)}
                                    onClick={e => handleClick(e, item.id)} />
                            }
                        />
                        <CardContent>                
                            {item.content.map((li, index) => {
                                return (
                                <Typography variant="body2" component="p" key={item.id + 'content' + index}>
                                    {li.id + ' : ' + li.value}
                                </Typography>)})}
                        </CardContent>
                    </Card>
                ) : <div></div>}
            </div>
        </div>
    )
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(CardList)