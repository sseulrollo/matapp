import React, { Component } from 'react'
import { SearchCombo, LabelInputField, BasicButton, CloseButton, CheckTable, notifyWarn } from './controls'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Spcall';
import { Form, Button } from 'semantic-ui-react'


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

class InvMove extends Component {

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
            .catch(e => notifyWarn(e))
    }

    handleDel = (e) => {
        e.preventDefault();
        this.setState({
            delFlag: 'del'
        })
    }
    
    componentWillReceiveProps (nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state
    } 

    handleEventEnd = () => this.setState({delFlag: 'none'})

    getValue = (id) => this.state[id];

    render () {
        const {data, delFlag, tableParam, table_sp} = this.state
  
        return (
            <div  style={{ marginTop: '1em' }}>
                <div style={{ backgroundColor: 'white', padding:'1em', border:'none' }}>
                    <Form>
                        <Form.Field key='toWorkshop'>
                            <label key='lbltoWorkshop' >
                                이동 할 작업장
                                    </label>
                            <SearchCombo
                                id="work_shop"
                                key="work_shop"
                                className="form-control"
                                groupid="LOC_TYPE"
                                onChange={this.handleCboChange}
                                value={this.getValue("work_shop")} />
                        </Form.Field>
                        <LabelInputField
                            name='lot_no'
                            value={this.state.lot_no}
                            placeholder='Lot No'
                            onChange={this.handleChange} />
                    </Form>
                    <CheckTable id="tolots"
                        header={initialHeader}
                        initialData={data}
                        loadSp={table_sp}
                        onSave={this.handleSave}
                        tableParam={tableParam}
                        delFlag={delFlag}
                        editEndEvent={this.handleEventEnd}
                        checkSame='true'
                        checkValue="lot_no" />
                    <div style={{ height: '3em', border: 'none' }}></div>
                </div>
                <div
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
                </div>
            </div >
        )
    }
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(InvMove)