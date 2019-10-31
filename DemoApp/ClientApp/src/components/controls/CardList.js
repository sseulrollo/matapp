import React, {useState, Fragment, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, CardHeader, Checkbox } from '@material-ui/core';

import { toast } from 'react-toastify'

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Spcall';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}); 

const notifyWarn = msg => toast.warn(msg, { autoClose: true})
const notifySuccess = msg => toast.success(msg, { autoClose: true})

const CardControl = ({data, handleCheck}) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.card}>
            <CardHeader 
                title={data.main} 
                action={
                    <Checkbox 
                        key={data.key} 
                        onClick={handleCheck} />
                }
            />
            <CardContent>                
                {data.content.map((item, index) => {
                    return (
                    <Typography variant="body2" component="p" key={data.id + 'content' + index}>
                        {item.id + ' : ' + item.value}
                    </Typography>)})}
            </CardContent>
        </Card>
    )
}

const CardList = (props) => {
    const [data, setData] = useState([]);
    const [header, setHeader] = useState(props.header)
    const [title, setTitle] = useState(props.title ? props.title : "");
    const [main, setMain] = useState(props.main)
    const [listUp, setListUp] = useState(false);
    const [tableParam, setTableParam] = useState(props.tableParam);
    const [selected, setSelected] = useState([])

    useEffect(() => {
        if(listUp)
            changeData(props.spCall.data);
        else if (tableParam !== props.tableParam && props.tableParam !== {}){
            getAddData(props.tableParam)
            setTableParam(props.tableParam)
        } else if(props.selectParams !== [] && props.searchFlag){  
            getData(props.selectParams);
        } else if(props.delFlag !== 'none')
            removeData(props.delFlag)
    })

    const getAddData = (tableParam) => {

        const {loadSp, checkSame, checkValue} = props;
        
        if(checkSame && checkValue !== "" && data.length > 0){
            if(checkSame && 
                (data.filter(r=> r["@@key"] === data[checkValue]).length > 0
                || data.filter(r=> r["@@KEY"] === data[checkValue]).length > 0)){
                {notifyWarn('이미 스캔한 데이터입니다.')}
                return;
            }
        }        
    
        return props.loadSingleRequest(loadSp, tableParam)
                .then(() => setListUp(true))
                .catch(e => {notifyWarn(e)}
                )
      }
    
      const getData = (params) => {
        const {loadSp} = props;
       
        return props.loadSingleRequest(loadSp, params)
        .then(() => setListUp(true));
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

        let lst = data;
        // 소문자 @@key check 도 필요
        selected.map(item => lst = lst.filter(row => row["@@KEY"] !== item))
    
        changeData(lst);
        // setAllClear.current.click();
        props.editEndEvent();    
    }
    

    const changeData = (data) => {
        let returnData = [];

        data.map((item, index) => {

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
            
            returnData.push({
                main : item[main] ? item[main] : item[main.toUpperCase()] ? item[main.toUpperCase()] : item[main.toLowerCase()],
                id: setId,
                content : contentList,
                check: isCheck
            })
        })
        setData(returnData);
        setListUp(false);
    }
    
    return (
        data.map(item => <CardControl data={item}  key={'row'+ data.id}/>)
    )
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(CardList)