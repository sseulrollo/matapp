import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const BasicButton = (props) => (
    <Button 
       variant="contained" 
        color="inherit" 
        type="submit" 
        size={props.size ? props.size : 'large'}
        onClick={props.onclick}
        key={'btn' + props.name}
        name={props.name}
        >
        {props.label}
    </Button>
)
const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(0.5),
    },
    input: {
      display: 'none',
    },
  }));

  export default function ContainedButtons(props) {
    const classes = useStyles();

    return (
        <div>
          <Button 
          className={classes.button}
          variant="contained" 
         color="inherit" 
         type="submit" 
         //size={props.size ? props.size : 'large'}
         onClick={props.onclick}
         key={'btn' + props.name}
         name={props.name}
         >
         {props.label}
          </Button>
         </div> 
    );
}

// import React from 'react';
// import Button from '@material-ui/core/Button';

// const BasicButton = (props) => (
//     <Button 
//        variant="contained" 
//         color="secondary" 
//         type="submit" 
//         size={props.size ? props.size : 'large'}
//         onClick={props.onclick}
//         key={'btn' + props.name}
//         name={props.name}
//         >
//         {props.label}
//     </Button>
// )

// export default BasicButton;