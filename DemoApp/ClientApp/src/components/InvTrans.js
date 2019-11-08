import React, { Component, createRef } from 'react'
import update from 'immutability-helper';
import { Selects, LabelInputField, BasicButton, CloseButton, CardList, } from './controls'

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../store/HandlePage';

import { Typography, Grid, InputLabel } from '@material-ui/core';

const initialHeader = [
    "@@CHK",
    "LOTNO",
    "품번",
    "품명",
    "수량",
    "@@KEY"
]

const initialData = [
    {
        "@@CHK" : "",
        "LOTNO": "",
        "품번": "",
        "품명": "",
        "수량": "",
        "@@KEY": "" 
    }
]

const inputLabel = <InputLabel />

// 현재 어떤 이벤트 후 param에 값이 reset 되지 않음 
// 새 값만 받아서 덮어쓰는 구조로 작성 됨.
class InvTrans extends Component {

    state = {
        header: initialHeader,
        data: initialData,
        work_shop_id:'',
        lot_no: '',
        tableParam: {
            lot_no:''
        },
        table_sp: 'SP_PWA_LOT_SEARCH_NO',
        save_sp: 'SP_PWA_LOT_INSERT',
        saveParamIds: ['work_shop_id'],
        saveParam: {},
        delFlag: 'none',
        menuFixed: false
    }

    contextRef = createRef();

    constructor (props) {
        super(props)

        this.handleOk = this.handleOk.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCboChange = this.handleCboChange.bind(this);
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state
    }

    handleChange = (e) => {
        e.preventDefault();
        if(e.target.value === '')
            return;
        
        this.setState({
            tableParam:{
                [e.target.name]: e.target.value
            },
            [e.target.name]:''
        })
    }


    handleCboChange = (id, value) => {
        if(value === '')
            return;
            
        this.setState((prevState) => {
            
            if(prevState.saveParamIds.filter(m => m === id).length > 0){
                return update(prevState, {
                    saveParam: {[id] : {$set: value}}
            })}
        })

        this.setState({
            [id]: value
        })
    }

    handleOk = (e) => {
        e.preventDefault();
        
        this.setState({
            delFlag: 'save'
        })
    }

    handleDel = (e) => {
        e.preventDefault();
        this.setState({
            delFlag: 'del'
        })
    }
   

    handleEventEnd = () => this.setState({delFlag: 'none'})

    getValue = (id) => this.state[id];

    render () {
        const {
            data, 
            delFlag, 
            tableParam, 
            table_sp, 
            save_sp,
            saveParam,
            saveParamIds,
            header
        } = this.state;
        
        return (
            <div ref={this.contextRef} style={{ margin: '1em',  }}>
                <Grid container spacing={1} justify="center" 
                    alignItems="center" 
                    style={{backgroundColor:'white'}}>
                    <Grid xs={5} item >
                        <Typography component="p" gutterBottom align="right" 
                            style={{marginRight:'2em'}}>
                            이동 할 작업장
                        </Typography>
                    </Grid>
                    <Grid xs={7} item>
                        <Selects
                            id="work_shop_id"
                            key="work_shop_id"
                            placeholder="작업장"
                            groupid="LOC_TYPE"
                            onChange={this.handleCboChange}
                            inputlabel ={<InputLabel value={this.state.work_shop_id ? this.state.work_shop_id : '작업장' }/>}
                            value={this.getValue("work_shop_id")} />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography component="p" gutterBottom align="right" style={{marginRight:'2em'}}>
                            Lot No
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <LabelInputField
                            name='lot_no'
                            id='lot_no'
                            isfull={true}
                            value={this.state.lot_no}
                            placeholder='Lot No'
                            onChange={this.handleChange} />
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" alignItems="center"
                    style={{backgroundColor:'white',
                    position: this.props.menuFixed ? 'fixed' : 'static',
                    top:'5em'}}>
                    <BasicButton name="btnOk" onclick={this.handleOk} label="저장" />
                    <BasicButton name="btnDel" onclick={this.handleDel} label="삭제" />
                    <CloseButton history={this.props.history} />
                </Grid>
                <CardList id="tolots"
                    header={header}
                    title="Lot List"
                    key='lot_lists'
                    initialData={data}
                    loadSp={table_sp}
                    saveSp={save_sp}
                    onSave={this.handleSave}
                    tableParam={tableParam}
                    saveParam={saveParam}
                    saveParamId={saveParamIds}
                    delFlag={delFlag}
                    editEndEvent={this.handleEventEnd}
                    checkSame='true'
                    checkValue="lot_no" 
                    main="lot_no"/>                
            </div> 
        )
    }
}


export default InvTrans
//  connect(
//     state => state.pages,
//     dispatch => bindActionCreators(actionCreators, dispatch)
// )(InvTrans)