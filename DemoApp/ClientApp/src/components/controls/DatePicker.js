import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



export default function DatePicker (props) {

    const classes = useStyles();
    const [value, setValue] = useState(props.value)

    const handleChange = event => {
      setValue(event.target.value)
      props.dateChange(event.target.id, event.target.value)
    }
  
    return (
        <TextField
          id={props.id}
          key={props.id}
          type="date"
          value={value}
          fullWidth = {false}
          style={{width:'180px'}}
          onChange={handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
    );
  }
