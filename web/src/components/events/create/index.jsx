import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Field, getFormValues, reduxForm} from 'redux-form';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import green from '@material-ui/core/colors/green';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import {Button} from '@material-ui/core';
import FormData from 'form-data';
import UA from '../../../../public/icons/ukraine.svg';
import TextField from '../../common/text-field';
import EN from '../../../../public/icons/united-kingdom.svg';
import TextAreaField from '../../common/textarea-field';
import TextEditor from '../../common/text-editor';
import UploadImageField from '../../common/upload-image-field';
import Calendar from '../../common/calendar';
import {events} from '../../../api/event';
import {withSnackBarContext} from '../../../context/snack-bar-context';

const CreateFeed = props => {
  const {formData, open, onClose, user, snackBarContext} = props;

  const createFeed = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', formData.image.file);
    data.append('eventDate', formData.eventDate);
    // Data.append('type', formData.type);
    data.append('uaHeader', formData.uaHeader);
    data.append('uaShortDescription', formData.uaShortDescription);
    data.append('uaText', formData.uaText);
    data.append('enHeader', formData.enHeader);
    data.append('enShortDescription', formData.enShortDescription);
    data.append('enText', formData.enText);
    data.append('userId', user._id);

    const response = await events.create(data, true);
    if (response.status === 200) {
      snackBarContext.openSnackBar('Your event successfully uploaded, after approving of moderator you will be sent an email, thank you:)');
      onClose();
    } else {
      snackBarContext.openSnackBar('There is a problems with uploading your feed', 'error');
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
      <form onSubmit={createFeed} encType="multipart/form-data">
        <AppBar style={{boxShadow: 'none', position: 'relative'}}>
          <Toolbar style={{backgroundColor: 'sandybrown'}}>
            <span onClick={onClose} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              <CloseIcon style={{fontSize: '2em'}}/> Back
            </span>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item md={3}/>
          <Grid item md={3} style={{marginTop: 10}}>
            <Field
              name="image"
              component={UploadImageField}
              imageUrl={formData && formData.image.imageUrl ? formData.image.imageUrl : ''}
              style={{width: '100%', height: 400}}
            />
          </Grid>
          <Grid item md={3} style={{marginTop: 10}}>
            <Field
              name="eventDate"
              component={Calendar}
            />
          </Grid>
          <Grid item md={3}/>
        </Grid>
        <Grid container spacing={8}>
          <Grid item md={1}/>
          <Grid item md={5}>
            <CardContent>
              <Field
                required
                label={<div><img src={UA} width={13} height={13}/>  Заголовок</div>}
                name="uaHeader"
                component={TextField}
              />
              <Field
                required
                label={<div><img src={UA} width={13} height={13}/>  Короткий опис</div>}
                rows={3}
                name="uaShortDescription"
                component={TextAreaField}
              />
              <Field
                required
                name="uaText"
                component={TextEditor}
              />
            </CardContent>
          </Grid>
          <Grid item md={5}>
            <CardContent>
              <Field
                required
                label={<div><img src={EN} width={13} height={13}/>  Header</div>}
                name="enHeader"
                component={TextField}
              />
              <Field
                required
                label={<div><img src={EN} width={13} height={13}/>  Short description</div>}
                rows={3}
                name="enShortDescription"
                component={TextAreaField}
              />
              <Field
                required
                name="enText"
                component={TextEditor}
              />
            </CardContent>
          </Grid>
          <Grid item md={1}/>
        </Grid>
        <div style={{display: 'flex', justifyContent: 'center', padding: 20}}>
          <Button type="submit" variant="contained" color="primary" style={{backgroundColor: 'sandybrown'}}>Create</Button>
        </div>
      </form>
    </Dialog>
  );
};
const mapStateToProps = state => ({
  formData: getFormValues('createEvent')(state),
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'createEvent',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: {
      image: {},
      uaText: '',
      enText: '',
      eventDate: new Date(),
    },
  }),
  withSnackBarContext,
)(CreateFeed);
