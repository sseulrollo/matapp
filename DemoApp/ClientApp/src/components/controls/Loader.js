import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function LoaderExampleLoader() {
  const classes = useStyles();

  return (
    <div>
      {/* <CircularProgress className={classes.progress} /> */}
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

// import React from 'react'
// import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

// const LoaderExampleLoader = () => (
//   <Segment>
//     <Dimmer active>
//       <Loader />
//     </Dimmer>

//     <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
//   </Segment>
// )

// export default LoaderExampleLoader