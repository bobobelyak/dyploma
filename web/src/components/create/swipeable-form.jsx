import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import {reduxForm, formValueSelector} from 'redux-form';
import Button from '@material-ui/core/Button';
import lionImg from '../../../public/icons/lion.svg';
import {AuthService} from '../../helpers/auth-service';
import ImageCategory from './image-category';
import Information from './information';
import Final from './final';
import Location from './location';

const Swipeable = props => {
  const {step, stepIndexChange, formValues = {}, openPreviewModal} = props;

  return (
    <form encType="multipart/form-data" style={{marginRight: '1em', marginLeft: '1em'}}>
      <SwipeableViews index={step + 1} onChangeIndex={stepIndexChange}>
        <Location/>
        <Grid container style={{width: '100%'}}>
          <ImageCategory
            imageUrl={formValues.imageUrl ? formValues.imageUrl : ''}
          />
        </Grid>
        <Grid container style={{width: '100%'}}>
          <Information/>
        </Grid>
        <Grid container style={{width: '100%'}}>
          { AuthService.tokenExists() && <Final openPreviewModal={openPreviewModal}/>}
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{height: 500}}
        >
          <Typography variant="h2" style={{fontSize: '1.5em'}} gutterBottom>
           Thank you,
          </Typography>
          <Typography variant="h2" style={{fontSize: '1.5em'}} gutterBottom>
           your post should be approved by moderator <span style={{color: 'sandybrown'}}>:)</span>
          </Typography>
          <img src={lionImg} style={{width: 200, height: 200, marginBottom: 20, marginTop: 20}}/>
          <Button onClick={() => stepIndexChange(-1)} variant="contained" style={{color: 'white', backgroundColor: 'sandybrown', width: 100, height: 40, marginTop: 30}}>Confirm</Button>
        </Grid>
      </SwipeableViews>
    </form>
  );
};
const selector = formValueSelector('createPlace');
const SwipeableForm = reduxForm({
  form: 'createPlace',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: {
    allowShowName: true,
    image: {},
  },
})(Swipeable);

const mapStateToProps = state => ({
  formValues: selector(state, 'image'),
});

export default connect(mapStateToProps)(SwipeableForm);
