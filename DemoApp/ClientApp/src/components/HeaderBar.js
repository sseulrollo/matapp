import React, { Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux'
import { actionCreators } from '../store/Authentication';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

const HeaderBar = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar position={props.menuFixed ? "fixed" : "static"} >
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>{props.route ? props.route : 'Prototype'}</Typography>
                    <IconButton edge="end" onClick={props.logout} color="inherit">
                        <LockOutlinedIcon color="inherit" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}



HeaderBar.propTypes = {
    logout: PropTypes.func.isRequired
  }
  
  export default connect(
    state => state.login,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(HeaderBar);
  