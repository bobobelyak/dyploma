import React from 'react';
import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Loader from '../common/loader';
import {setSearchText, search, getTop, clearTop} from '../../store/reducers/places';
import GridList from '../common/grid-list';
import GridListSkeleton from '../common/grid-list-skeleton';

const Create = props => {
  const {classes, setSearchText, search, searchString, loadingSearch, searchResult, triggerSearch, loadingTop, topPlaces, clearTop} = props;

  const searchPlace = e => {
    e.preventDefault();
    search();
  };

  return (
    <CardContent>
      <form onSubmit={searchPlace}
        style={{marginTop: 5, marginBottom: 25, display: 'flex', justifyContent: 'center'}}
      >
        <TextField
          style={{width: '100%'}}
          onChange={e => setSearchText(e)}
          value={searchString}
          placeholder="Search"
          InputProps={{
            classes: {underline: classes.underline, root: classes.inputRoot},
            endAdornment: (
              [
                <InputAdornment position="end">
                  { triggerSearch && <IconButton
                    style={{padding: 1}}
                    onClick={() => clearTop()}
                  >
                    <ClearIcon style={{color: 'lightgrey'}}/>
                  </IconButton> }
                </InputAdornment>,
                <InputAdornment position="end">
                  <IconButton
                    style={{padding: 1}}
                    onClick={searchPlace}
                  >
                    <SearchIcon style={{color: 'sandybrown'}}/>
                  </IconButton>
                </InputAdornment>,
              ]
            ),
          }}
        />
      </form>
      {
        triggerSearch ?
          (
            loadingSearch ?
              <Loader/> :
              (
                searchResult.length === 0 ?
                  <div>There is no</div> :
                  <GridList cols={2} data={searchResult}/>
              )
          ) : (
            <div>
              <Typography style={{fontSize: '2em', color: 'sandybrown', textTransform: 'uppercase'}} variant="h2"
                gutterBottom
              >
                      Most popular sights
              </Typography>
              {loadingTop ? <GridListSkeleton data={[1, 2, 3]} cols={3}/> :
              <GridList cols={3} data={topPlaces} showActionIcons={false}/>}
              <Typography style={{fontSize: '2em', color: 'sandybrown', textTransform: 'uppercase'}} variant="h2"
                gutterBottom
              >
                      Upcoming events
              </Typography>
              {loadingTop ? <GridListSkeleton data={[1, 2, 3]} cols={3}/> :
              <GridList cols={3} data={topPlaces} showActionIcons={false}/>}
            </div>
          )

      }
    </CardContent>
  );
};

const styles = theme => ({
  listCard: {
    // BoxShadow: 'none',
    marginBottom: 5,
    height: 80,
    padding: 0,
  },
  list: {
    width: '98%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 5,
  },
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
  loadingSearch: state.placesState.loadingSearch,
  searchString: state.placesState.searchString,
  searchResult: state.placesState.searchResult,
  triggerSearch: state.placesState.triggerSearch,
  loadingTop: state.placesState.loadingTop,
  topPlaces: state.placesState.topPlaces,
});

export default compose(
  connect(mapStateToProps, {setSearchText, search, getTop, clearTop}),
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      this.props.getTop(3);
    },
  }),
)(Create);
