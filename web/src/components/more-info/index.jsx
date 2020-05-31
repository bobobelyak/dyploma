import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/KeyboardArrowLeft';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import {getSingle, setPlace, clearSingle} from '../../store/reducers/places';
import {toggleMoreInfo} from '../../store/reducers/more-info';
import {showPopup} from '../../store/reducers/map';

import Loader from '../common/loader';
import PlaceCard from '../main/place';
import Reviews from './reviews';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const Transition = props => <Slide direction="left" {...props}/>;

const MoreInfo = props => {
  const {place = {}, classes, history, toggleMoreInfo, loadingSingle, setPlace, clearSingle} = props;

  const closeModal = e => {
    e.stopPropagation();
    if (place.comments) {
      setPlace({...place, comments: place.comments.length});
    }
    clearSingle();
    toggleMoreInfo();
    history.goBack();
  };

  return (
    <Dialog
      fullScreen
      open
      TransitionComponent={Transition}
    >
      <AppBar style={{boxShadow: 'none', position: 'relative'}}>
        <Toolbar style={{backgroundColor: 'sandybrown'}}>
          <span onClick={closeModal} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
            <CloseIcon style={{fontSize: '2em'}}/> Back
          </span>
        </Toolbar>
      </AppBar>
      {loadingSingle ?
        <DialogContent style={{minHeight: '80vh', overflow: 'hidden', marginTop: 30}}>
          <Grid container spacing={16}>
            <Grid item md={4}>
              <PlaceCard {...{place}} isMoreInfo/>
            </Grid>
            <Grid item md={4}>
              <Reviews comments={place.comments} placeId={place._id}/>
            </Grid>
            <Grid item md={4}>
              upcoming event
            </Grid>
          </Grid>
        </DialogContent> : <Loader/>}
    </Dialog>
  );
};

const mapStateToProps = state => ({
  isMoreInfoModal: state.moreInfo.isMoreInfoModal,
  loadingSingle: state.placesState.loadingSingle,
  place: state.placesState.singlePlace,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {toggleMoreInfo, getSingle, setPlace, showPopup, clearSingle}),
  lifecycle({
    async componentDidMount() {
      const {getSingle, match} = this.props;
      // ShowPopup({popup: false, btn: false});

      await getSingle(match.params.id);
      // SetPlace(place);
    },
  }),
)(MoreInfo);
