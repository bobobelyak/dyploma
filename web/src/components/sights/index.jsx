import React from 'react';
import {compose, lifecycle, withState} from 'recompose';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';
import GridList from '../common/grid-list';
import TextField from '../common/text-field';
import {Navigation} from '../layout/navigation';
import {PopularSight, RightPlace} from './popular-sight';

const selectedLanguage = localStorage.getItem('language');

const topics = ['All', 'Home', 'Health', 'Education', 'Technologies', 'Buisness', 'Politics'];

const setLanguage = language => {
  localStorage.setItem('language', language);
  if (selectedLanguage !== language) {
    location.reload();
  }
};

const Transition = props => <Slide direction="left" {...props}/>;

// TODO CREATE LAYOUT FOR APPBAR
const Sights = props => {
  const {history, places, search, toggleSearch, classes} = props;

  const goCreatePlace = () => history.push('/create-place');

  return (
    <Dialog
      fullScreen
      open
      TransitionComponent={Transition}
    >
      <AppBar style={{boxShadow: 'none', position: 'relative'}}>
        <Toolbar style={{backgroundColor: 'sandybrown'}}>
          <Navigation white/>
          <div style={{flexGrow: 1}}/>
          <img onClick={() => setLanguage('en')} src={EN} width={20} height={20} style={{marginTop: 0}} className={selectedLanguage === 'en' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
          <img onClick={() => setLanguage('ua')} src={UA} width={20} height={20} style={{marginTop: 0}} className={selectedLanguage === 'ua' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
          <IconButton style={{cursor: 'pointer'}}><AddIcon onClick={goCreatePlace} style={{fontSize: '1.3em', color: 'white'}}/></IconButton>
        </Toolbar>
      </AppBar>
      <div style={{height: 100}}>
        <Grid container alignItems="center" justify="space-around" direction="row" style={{height: '100%'}}>
          <Grid item md={2}/>
          {
            search ?
              <TextField
                // OnChange={changeInfo('name')}
                // value={textInput.name}
                autoFocus
                style={{width: '60%'}}
                variant="standard"
                placeholder="Search"
                required
                InputProps={{
                  classes: {underline: classes.underline, root: classes.inputRoot},
                }}
              /> :
              topics.map(topic => (
                <Typography key={topic} component="h2" variant="h2" style={{cursor: 'pointer', marginRight: 30, fontSize: '1em', textTransform: 'uppercase', borderBottom: '2px solid sandybrown'}}>
                  {topic}
                </Typography>
              ))
          }
          { search ?
            <CloseIcon style={{cursor: 'pointer'}} onClick={() => toggleSearch(!search)}/> :
            <SearchIcon style={{cursor: 'pointer'}} onClick={() => toggleSearch(!search)}/>
          }
          <Grid item md={2}/>
        </Grid>
      </div>
      <Grid container>
        <Grid item md={1}/>
        <Grid item md={10} style={{height: 300}}>
          <Grid container spacing={8}>
            <Grid item md={6} style={{height: '100%'}}>
              <PopularSight place={places[0]} height={300}/>
            </Grid>
            <Grid item md={3} style={{height: '100%'}}>
              <PopularSight place={places[1]} height={145}/>
              <div style={{marginTop: 10}}/>
              <PopularSight place={places[1]} height={145}/>
            </Grid>
            <Grid item md={3} style={{height: '100%'}}>
              <RightPlace place={places[0]}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={1}/>
      </Grid>
      <Grid container style={{marginTop: 50}}>
        <Grid item md={2}/>
        <Grid item md={8}>
          <GridList data={places} cols={3} height={300} padding/>
        </Grid>
        <Grid item md={2}/>
      </Grid>

    </Dialog>
  );
};

const styles = theme => ({
  underline: {
    '&:after': {
      borderBottomColor: 'sandybrown',
    },
    '&:hover': {
      borderBottomColor: 'sandybrown',
    },
    '&:before': {
      borderBottomColor: 'sandybrown',
    },
    '&:hover:before': {
      borderBottomColor: 'sandybrown',
    },
  },
  inputRoot: {
    backgroundColor: 'white',
    paddingTop: 10,
    borderRadius: 0,
    '&:focused': {
      backgroundColor: '#fcfcfc',
    },
    '&:hover': {
      backgroundColor: '#fcfcfc',
    },
    '&:blur': {
      backgroundColor: '#fcfcfc',
    },
  },
});

const mapStateToProps = state => ({
  places: state.placesState.places,
});

export default compose(
  connect(mapStateToProps, {}),
  withStyles(styles),
  withState('search', 'toggleSearch', false),
)(Sights);
