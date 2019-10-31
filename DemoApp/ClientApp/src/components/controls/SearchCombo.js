import React, {Component} from 'react'
import PropTypes, { array } from 'prop-types'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Spcall'
import { bindActionCreators } from 'redux';
import Loader from './Loader'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SearchCombo extends Component {
    
    state = {}
    _isMounted = false;

    constructor (props) {
        super(props);
        this.state = {
            value: props.value,
            groupid : props.groupid,
            where : props.where ? props.where : '',
            data : [],
            header: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }


    handleChange = (e, { value }) => {
        e.preventDefault();

        console.log(value);

        this.setState({
             value
        })
        this.props.onChange(this.props.id, value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.name !== this.props.name 
            || nextState.data !== this.state.data
            || nextProps.value !== this.props.value
    }

    componentDidMount(){
        this._isMounted = true;
        const { groupid,where } = this.state

        if(this._isMounted){
            
            let comboData = []
            let header, data = []

            if (where === ''){
                this.props.codeRequest(groupid)
                    .then(()=> {
                        if (this.props.spCall.status === "SUCCESS"){
                            header = this.props.spCall.header
                            data = this.props.spCall.data;

                            if(data.length > 0)
                                data.forEach(row => {
                                    comboData.push({
                                        key: row[header[0]],
                                        value: row[header[0]],
                                        text: row[header[1]]
                                    })
                                });
                            this.setState({
                                data: comboData
                            })
                        }    
                    })
            } else{
                
                this.props.codeDynamicReq(groupid, where)
                    .then(()=> {
                        if(this.props.spCall.status === "SUCCESS"){                        
                            header = this.props.spCall.header
                            data = this.props.spCall.data;                            
                        
                        if(data.length > 0)
                            data.forEach(row => {
                                comboData.push({
                                    key: row[header[0]],
                                    value: row[header[0]],
                                    text: row[header[1]]
                                })
                            });
                            
                        this.setState({
                            data: comboData
                        })
                    }
                })
            }
        }
    }

    handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery: searchQuery} )


    handleChange2 = event => {
        this.setState({ value: event.target.value });
        this.props.onChange(this.props.id, event.target.value)
      }; 

    render() {
        
        const { data } = this.state

        if (data !== undefined || data !== [])
            return (
              <FormControl >
                    <Select
                        native
                        onChange={this.handleChange2} >   
                        <option value="" />
                        {Object.entries(data).map((post, index)=>{
                             return <option key={index} value={post[1].value}>{post[1].text}</option>
                        })}
                    </Select>
              </FormControl>                
            )
        else
            return (<Loader />)
        
    }
}

SearchCombo.propTypes = {
    codeDynamicReq: PropTypes.func.isRequired,
    codeRequest: PropTypes.func.isRequired,
    spCall: PropTypes.object
  }

export default connect(
    state => state.spCall,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(SearchCombo);
 


// import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { actionCreators } from '../../store/Spcall'
// import { bindActionCreators } from 'redux';
// import { Dropdown } from 'semantic-ui-react'
// import Loader from './Loader'


// class SearchCombo extends Component {
//     state = {}
//     _isMounted = false;

//     constructor (props) {
//         super(props);
//         this.state = {
//             value: props.value,
//             searchQuery: '',
//             groupid : props.groupid,
//             where : props.where ? props.where : '',
//             data : [],
//             header: []
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSearchChange = this.handleSearchChange.bind(this)
//     }

    
//     handleChange = (e, { searchQuery, value }) => {
//         e.preventDefault();
        
//         this.setState({
//             searchQuery, value
//         })
       
//         this.props.onChange(this.props.id, value);
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return nextProps.name !== this.props.name 
//             || nextState.data !== this.state.data
//             || nextProps.value !== this.props.value
//             || nextState.searchQuery !== this.state.searchQuery
//     }

//     componentDidMount(){
//         this._isMounted = true;
//         const { groupid,where } = this.state

//         if(this._isMounted){
            
//             let comboData = []
//             let header, data = []

//             if (where === ''){
//                 this.props.codeRequest(groupid)
//                     .then(()=> {
//                         if (this.props.spCall.status === "SUCCESS"){
//                             header = this.props.spCall.header
//                             data = this.props.spCall.data;

//                             if(data.length > 0)
//                                 data.forEach(row => {
//                                     comboData.push({
//                                         key: row[header[0]],
//                                         value: row[header[0]],
//                                         text: row[header[1]]
//                                     })
//                                 });

                            
//                             this.setState({
//                                 data: comboData
//                             })
//                         }    
//                     })
//             } else{
//                 this.props.codeDynamicReq(groupid, where)
//                     .then(()=> {
//                         if(this.props.spCall.status === "SUCCESS"){                        
//                             header = this.props.spCall.header
//                             data = this.props.spCall.data;                            
                        
//                         if(data.length > 0)
//                             data.forEach(row => {
//                                 comboData.push({
//                                     key: row[header[0]],
//                                     value: row[header[0]],
//                                     text: row[header[1]]
//                                 })
//                             });
                            
//                         this.setState({
//                             data: comboData
//                         })
//                     }
//                 })
//             }
//         }
//     }

//     handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery: searchQuery})

//     render() {
//         const { data, searchQuery } = this.state
//         const { name, value, key } = this.props;
        
//         if (data !== undefined || data !== [])
//             return (
//                 <Dropdown
//                     placeholder={name}
//                     onSearchChange={this.handleSearchChange}
//                     onChange={this.handleChange}
//                     key={'drop' + key}
//                     fluid
//                     searchQuery={searchQuery}
//                     selection
//                     options={data}
//                     value={value}
//                 /> 
//             )
//         else
//             return (<Loader />)
        
//     }
// }

// SearchCombo.propTypes = {
//     codeDynamicReq: PropTypes.func.isRequired,
//     codeRequest: PropTypes.func.isRequired,
//     spCall: PropTypes.object
//   }

// export default connect(
//     state => state.spCall,
//     dispatch => bindActionCreators(actionCreators, dispatch)
//   )(SearchCombo);
  