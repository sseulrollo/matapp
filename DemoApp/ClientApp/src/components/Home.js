import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Icon, Grid, Paper } 
from '@material-ui/core'
import { Lock, Edit, Menu, Pages } from '@material-ui/icons'

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

  return (
    <Container style={{ marginTop: '2em' }} fixed>
      <Grid container spacing={3} style={{marginTop: '3em'}}>   
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5"><Icon >
              <Edit />
            </Icon> 테스트 가능한 기능은 아래와 같습니다.</Typography>
            
            <Grid container style={{marginTop: '1em'}}>         
              <Grid item xs={12} sm container>      
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <Typography variant="subtitle1"><Icon width='128' height='128' ><Lock /></Icon> 로그인</Typography>
                    <Typography gutterBottom variant="subtitle2">Log in/Log out 기능</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container >         
              <Grid item xs={12} sm container>      
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <Typography variant="subtitle1"><Icon width='128' height='128' ><Menu /></Icon> 메뉴</Typography>
                    <Typography gutterBottom variant="subtitle2">Routing 기능</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container >         
              <Grid item xs={12} sm container>      
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item xs>
                    <Typography variant="subtitle1"><Icon width='128' height='128' ><Pages /></Icon> Test 페이지</Typography>
                    <Typography gutterBottom variant="subtitle2">Dropdown control, Db connection, Table</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="h5"><Icon >
              <Edit />
            </Icon> 2019.11.05 Release</Typography>

            <Typography variant="subtitle1">Design framework 수정</Typography>
            <Typography variant="body1">Semantic-ui-react에서 material-ui로 변경</Typography>
            <Typography variant="body2" >작업진행: 김시호, 노슬기</Typography>
            <Typography variant="body2">작업검수: 이성근</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* <Container style={{marginTop:'3em'}}>
        <h3>테스트 가능한 기능은 아래와 같습니다.</h3>
        <List style={{marginTop: '1em'}}>
          <ListItem style={{marginTop: '1em'}}>
            <Icon>
              <Lock />
            </Icon>
            <ListItem>
              <ListSubheader>로그인</ListSubheader>
              <ListItemText>Log in/Log out 기능</ListItemText>
            </ListItem>
          </ListItem>
          <ListItem style={{marginTop: '1em'}}>
            <Icon><Menu /></Icon>
            <ListItem>
              <ListSubheader>메뉴</ListSubheader>
              <ListItemText>Routing 기능</ListItemText>
            </ListItem>
          </ListItem>
          <ListItem style={{marginTop: '1em'}}>
            <Icon><Pages /></Icon>
            <ListItem>
              <ListSubheader>Test 페이지</ListSubheader>
              <ListItemText>Dropdown control, Db connection, Table</ListItemText>
            </ListItem>
          </ListItem>
        </List>
      </Container> */}
    </Container>
  )}

export default Home