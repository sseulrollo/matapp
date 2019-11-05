import React, { Component } from 'react'
import { SearchCombo, Selects, LabelInputField, BasicButton, CloseButton, CardList } from './controls'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Spcall';

import {toast} from 'react-toastify';
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
        work_shop:'',
        lot_no: '',
        tableParam: {
            lot_no: ''
        },
        table_sp: 'SP_PWA_LOT_SEARCH_NO',
        save_sp: 'SP_PWA_LOT_INSERT',
        selectedList : [],
        delFlag: 'none'
    }

    constructor (props) {
        super(props)

        this.handleOk = this.handleOk.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCboChange = this.handleCboChange.bind(this);
    }

    notifyWarn = msg => toast.warn(msg, { autoClose: true });
    notifySuccess = msg => toast.success(msg, { autoClose: true })

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
            
        this.setState({
            [id]:value
        })
    }

    handleOk = (e) => {
        e.preventDefault();
        
        this.setState({
            delFlag: 'save'
        })
    }

    handleSave = (params) => {
        const { save_sp, work_shop } = this.state

        let param = {
            "PARAMS": params,
            "WORK_SHOP_ID": work_shop
        }

        this.props.executeRequest(save_sp, param)
            .catch(e => this.notifyWarn(e))
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
        const {data, delFlag, tableParam, table_sp, header} = this.state;
        console.log(tableParam)
        return (
            <div  style={{ marginTop: '1em' }}>
                <div style={{ backgroundColor: 'white', padding:'1em', border:'none' }}>
                    
                    <Grid container spacing={1} justify="center" alignItems="stretch">
                        <Grid xs={4} item >
                            <Typography component="p" gutterBottom>
                                이동 할 작업장
                            </Typography>
                        </Grid>
                        <Grid xs={8} item>
                            <Selects
                                id="work_shop"
                                key="work_shop"
                                // className="form-control"
                                placeholder="작업장"
                                groupid="LOC_TYPE"
                                onChange={this.handleCboChange}
                                inputlabel ={<InputLabel value={this.state.work_shop ? this.state.work_shop : '작업장' }/>}
                                value={this.getValue("work_shop")} />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component="p">
                                Lot No
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <LabelInputField
                                name='lot_no'
                                id='lot_no'
                                value={this.state.lot_no}
                                placeholder='Lot No'
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                        <Grid item xs >
                            <BasicButton name="btnOk" onclick={this.handleOk} label="저장" />
                        </Grid>
                        <Grid item xs>
                            <BasicButton name="btnDel" onclick={this.handleDel} label="삭제" />
                        </Grid>
                        <Grid item xs>
                            <CloseButton history={this.props.history} />
                        </Grid>
                    </Grid>
                    <CardList id="tolots"
                        header={header}
                        key='lot_list'
                        initialData={data}
                        loadSp={table_sp}
                        onSave={this.handleSave}
                        tableParam={tableParam}
                        delFlag={delFlag}
                        editEndEvent={this.handleEventEnd}
                        checkSame='true'
                        checkValue="lot_no" 
                        main="lot_no"/>
                    <div style={{ height: '4em', border: 'none' }}></div>
                </div>
                {/* <div
                    style={{
                        position: 'fixed', margin: '0em', bottom: '4em', left: '0',
                        border: 'none', backgroundColor: 'white', padding: '0.5em', width: '100%'
                    }}>
                    <Button.Group widths='3'
                        basic>
                        <BasicButton name="btnOk" onclick={this.handleOk} label="저장" />
                        <BasicButton name="btnDel" onclick={this.handleDel} label="삭제" />
                        <CloseButton history={this.props.history} />
                    </Button.Group>
                </div> */}
            </div >
        )
    }
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(InvTrans)