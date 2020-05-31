import React from 'react';
import {connect} from 'react-redux';
import {compose, withState, withHandlers} from 'recompose';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Grid from '@material-ui/core/Grid';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import FormData from 'form-data';
import {getFormValues} from 'redux-form';
import {checkStep} from '../../helpers/check-step';
import {places} from '../../api/places';
import PreviewModal from './preview-modal';
import SwipeableForm from './swipeable-form';

const muiTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        '&$active': {
          color: 'sandybrown',
        },
        '&$completed': {
          color: 'sandybrown',
        },
      },
    },
  },
});

const data = [1, 2, 3];

const StepperComponent = props => {
  const {classes, step, stepForward, stepBack, formData, user, showPreviewModal, openPreviewModal, setStep} = props;

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('longitude', formData.longitude);
    data.append('latitude', formData.latitude);
    data.append('image', formData.image.file);
    data.append('type', formData.type);
    data.append('iconImage', formData.iconImage);
    data.append('iconSize', formData.iconSize);
    data.append('uaName', formData.uaName);
    data.append('enName', formData.enName);
    data.append('uaStreet', formData.uaStreet);
    data.append('enStreet', formData.enStreet);
    data.append('buildingNumber', formData.buildingNumber);
    data.append('uaDescription', formData.uaDescription);
    data.append('enDescription', formData.enDescription);
    data.append('allowShowName', formData.allowShowName);
    if (formData.allowShowName) {
      data.append('userId', user._id);
    }
    try {
      const response = await places.create(data, true);
      if (response.status === 200) {
        openPreviewModal();
        setStep(3);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {
        showPreviewModal &&
        <PreviewModal
          open={showPreviewModal}
          onClose={openPreviewModal}
          handleSubmit={handleSubmit}
          data={formData}
        />
      }
      <MuiThemeProvider theme={muiTheme}>
        <Stepper activeStep={step} alternativeLabel>
          {data.map(label => (
            <Step
              key={label}
            >
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active,
                    disabled: classes.disabled,
                  },
                }}
              />
            </Step>
          ))}
        </Stepper>
      </MuiThemeProvider>
      <div style={{height: '500px'}}>
        <SwipeableForm
          step={step}
          stepIndexChange={setStep}
          openPreviewModal={openPreviewModal}
        />
      </div>
      <Grid container justify="center" alignContent="center">
        {step > -1 && step !== 3 &&
          <Button
            style={{border: '1px solid sandybrown'}}
            onClick={stepBack}
          >
            Back
          </Button>
        }
        <div style={{width: 5}}/>
        {step !== data.length - 1 && step !== 3 &&
          <Button
            style={{backgroundColor: checkStep(step, formData) && 'sandybrown'}}
            disabled={!checkStep(step, formData)}
            variant="contained"
            color="primary"
            onClick={stepForward}
          >
            Next
          </Button>
        }
      </Grid>
    </React.Fragment>

  );
};

const mapStateToProps = state => ({
  formData: getFormValues('createPlace')(state),
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps),
  withStyles({}, {withTheme: true}),
  withState('step', 'setStep', -1),
  withState('showPreviewModal', 'openPreviewModal', false),
  withHandlers({
    stepForward: ({setStep, step}) => () => setStep(step + 1),
    stepBack: ({setStep, step}) => () => setStep(step - 1),
    openPreviewModal: ({openPreviewModal, showPreviewModal}) => () => openPreviewModal(!showPreviewModal),
  }),
)(StepperComponent);
