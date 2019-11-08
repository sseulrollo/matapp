import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Icon, Grid, Paper, Divider } 
from '@material-ui/core'
import { Lock, Edit, Menu, Pages } from '@material-ui/icons';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
}));

const Home = () => {
  

  const classes = useStyles();
  console.log(window.width, window)
  return (
    <Fragment>
      <div style={{margin:'1em', alignItems:"center"}}>
        <Typography variant="h4">
          <Icon fontSize="default"><AssignmentOutlinedIcon /></Icon> Release Note
        </Typography>
      </div>  
      <Container style={{ overflowY:'auto', height:window.innerHeight - 200, width:'95%' }} fixed>        
        <Grid container spacing={3} style={{marginTop: '0.5em'}} >  
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Typography variant="h5"><Icon >
                <EventAvailableOutlinedIcon />
              </Icon> 2019.11.08 Release</Typography>
  
              <Grid container style={{marginTop: '1em'}}>         
                <Grid item xs={12} sm container>      
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography variant="subtitle1"><Icon width='128' height='128' ><Edit /></Icon> Design framework 수정</Typography>
                      <Typography gutterBottom variant="subtitle2">Semantic-ui-react에서 material-ui로 변경</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid container alignContent="center" style={{marginTop: '0.3em'}}>         
                <Grid item xs={12} sm container >      
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography variant="subtitle1"><Icon width='128' height='128' ><GroupOutlinedIcon /></Icon> 개발</Typography>
                      <Typography gutterBottom variant="subtitle2">노슬기(개발), 이성근(검수)</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid> 
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5"><Icon >
                <EventAvailableOutlinedIcon />
              </Icon>2019.09.30 Release</Typography>
              
              <Grid container style={{marginTop: '0.5em'}}>         
                <Grid item xs={12} sm container>      
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography variant="subtitle1"><Icon width='128' height='128' ><Lock /></Icon> 로그인</Typography>
                      <Typography gutterBottom variant="subtitle2">Log in/Log out 기능</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid container  style={{marginTop: '0.3em'}}>         
                <Grid item xs={12} sm container>      
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography variant="subtitle1"><Icon width='128' height='128' ><Menu /></Icon> 메뉴</Typography>
                      <Typography gutterBottom variant="subtitle2">Routing 기능</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid container  style={{marginTop: '0.3em'}}>         
                <Grid item xs={12} sm container>      
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography variant="subtitle1"><Icon width='128' height='128' ><Pages /></Icon> Test 페이지</Typography>
                      <Typography gutterBottom variant="subtitle2">Dropdown control, Db connection, Table</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid container  style={{marginTop: '0.3em'}}>         
                <Grid item xs={12} sm container>      
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography variant="subtitle1"><Icon width='128' height='128' ><GroupOutlinedIcon /></Icon> 개발</Typography>
                      <Typography gutterBottom variant="subtitle2">김시호(개발), 노슬기(개발), 이성근(검수)</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )}

export default Home