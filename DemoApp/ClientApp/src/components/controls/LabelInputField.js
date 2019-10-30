import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    //  display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

}));

export default function OutlinedTextFields(props) {
  const classes = useStyles();

  return (
      <TextField
        // id={'txt' + props.name}
        id="outlined-email-input"
        name={props.name}
        label={props.placeholder}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}  
        className={classes.textField}
        type={props.type ? 'password' : 'text' }
        //type="password"
        margin="normal"
        variant="outlined"
      />
  );
}

// import React from 'react';
// import { Form, Input } from 'semantic-ui-react'


// const LabelInputField = (props) => (
//     <Form.Field key={'field' + props.name}>
//         {props.icon ? '' : <label key={'lbl' + props.name}>{props.placeholder}</label> }
//         <Input
//             type={props.type ? props.type : "text"}
//             key={'txt' + props.name}
//             id={'txt' + props.name}
//             icon={props.icon}
//             fluid
//             iconPosition={props.iconPosition ? props.iconPosition : 'left'}
//             name={props.name}
//             placeholder={props.placeholder}
//             className={props.css ? props.css : "form-control" }
//             value={props.value}
//             onChange={props.onChange} />
//     </Form.Field>
// )

// export default LabelInputField