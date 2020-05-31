import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import {withStyles} from '@material-ui/core/styles';
import facebookIcon from '../../../public/icons/facebook.png';
import {signInFacebook} from '../../store/reducers/auth';
import {styles} from './styles';

const FacebookButton = props => {
  const {classes, signInFacebook, closeModal} = props;

  const responseFacebook = async response => {
    await signInFacebook({access_token: response.accessToken}, closeModal);
  };

  return (
    <FacebookLogin
      fields="name,email,picture, user_link, user_location"
      appId={process.env.FACEBOOK_APP_ID}
      callback={responseFacebook}
      render={renderProps => (
        <Button onClick={renderProps.onClick} variant="outlined" className={classes.button}>
          <img width={20} height={20} src={facebookIcon}/>
          <Typography className={classes.tBody} gutterBottom variant="body1">
              Sign in with facebook
          </Typography>
        </Button>
      )}
    />
  );
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, {signInFacebook}),
)(FacebookButton);
