import React from 'react';
import Button from '@material-ui/core/Button';

const BasicButton = (props) => (
    <Button 
       variant="contained" 
        color="secondary" 
        type="submit" 
        size={props.size ? props.size : 'large'}
        onClick={props.onclick}
        key={'btn' + props.name}
        name={props.name}
        >
        {props.label}
    </Button>
)

export default BasicButton;