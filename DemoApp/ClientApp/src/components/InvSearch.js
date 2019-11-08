import React, { Component, createRef } from 'react'
import { 
    SearchCombo, 
    CheckTable, 
    BasicButton, 
    CloseButton, 
    DatePicker,
    notifyWarn,
    notifySuccess
} from './controls'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Spcall';

import update from 'immutability-helper';
import { Typography, Grid, InputLabel } from '@material-ui/core';

import Moment from 'moment';

const initialHeader = [
    "품번",
    "품명",
    "LOT 번호",
    "수량",
    "@@KEY"
]


const initialData = [
    {
        "품번": "",
        "품명": "",
        "LOT 번호": "",
        "수량": "",
        "@@KEY": ""
    }
]

class InvSearch extends Component {

    state = {
        header: initialHeader,
        data: initialData,
        work_shop: '',
        workdate: Moment(new Date()).format('YYYY-MM-DD'),
        selectParams: {
            work_shop: '',
            workdate: ''
        },
        table_sp: 'SP_PWA_INV_SEARCH',
        searchFlag: false

    }

    constructor(props) {
        super(props)
        this.handelSearch = this.handelSearch.bind(this)
    }

    handleChange = (e) => {
        e.preventDefault();
        if (e.target.value === '')
            return;

        this.setState({
            selectParams: {
                [e.target.name]: e.target.value
            },
            [e.target.name]: ''
        })
    }

    handleCboChange = (id, value) => {        
        this.setState((prevState) => {
            return update(prevState, {
                selectParams: { [id]: { $set : value }},
                [id]: { $set : value }
            })
        })
    }
    
    handleDteChange = (id, value) => {
        this.setState((prevState) => {
            return update(prevState, {
                selectParams: { [id]: { $set : value }},
                [id]: { $set : value}})
        })
    }

    handleEventEnd = () => this.setState({ searchFlag: false })

    handelSearch = (e) => {
        e.preventDefault();
        
        this.setState({
            searchFlag: true
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.searchFlag)
            this.setState({
                searchFlag: false
            })
        console.log(this.state.header)
        return this.state.header !== [] && (nextProps !== this.props || nextState !== this.state)
    }

    getValue = (id) => this.state[id];

    contextRef = createRef()
    render() {
        const { header, data, selectParams, table_sp, searchFlag } = this.state
        
        return (
            <div style={{ margin: '1em',  }}>
                <Grid container spacing={1} justify="center" 
                    alignItems="center" 
                    style={{backgroundColor:'white'}}>
                    <Grid xs={5} item >
                        <Typography component="p" gutterBottom align="right" 
                            style={{marginRight:'2em'}}>
                            작업장
                        </Typography>
                    </Grid>
                    <Grid xs={7} item>
                        <SearchCombo
                            id="work_shop"
                            key="work_shop"
                            className="form-control"
                            groupid="LOC_TYPE"
                            onChange={this.handleCboChange}
                            value={this.getValue("work_shop")}
                            searchEnd={this.handleEventEnd} />
                    </Grid>
                    <Grid item xs={5} style={{marginTop:'1em'}}>
                        <Typography component="p" gutterBottom align="right" style={{marginRight:'2em'}}>
                            이동일자
                        </Typography>
                    </Grid>
                    <Grid item xs={7} style={{marginTop:'1em'}}>
                        <DatePicker 
                            id='workdate' 
                            value={this.getValue("workdate")}  
                            dateChange={this.handleDteChange}/>                                
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" alignItems="center"
                    style={{backgroundColor:'white',
                    position: this.props.menuFixed ? 'fixed' : 'static',
                    marginTop:'1em'}}>
                    <BasicButton name="btnOk" onclick={this.handelSearch} label="조회" />
                    <CloseButton history={this.props.history} />
                </Grid>
                        
                <div style={{marginTop:'1em'}}>
                    <CheckTable  id="tolots"
                        header={header}
                        initialHeader={initialHeader}
                        initialData={data}
                        loadSp={table_sp}
                        height='360px'
                        rowsPerPage={5}
                        selectParams={selectParams}
                        searchFlag={searchFlag} />
                </div>  
            </div>
        )
    }
}


export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(InvSearch)