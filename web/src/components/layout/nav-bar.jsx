import React from 'react';
import {connect} from 'react-redux';
import {compose, withState, withHandlers} from 'recompose';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button/Button';
import Login from '../login';
import {Translations} from '../../translations';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';
import ProfilePhoto from './profile-photo';
import {Navigation} from "./navigation";

const selectedLanguage = localStorage.getItem('language');

const setLanguage = language => {
  localStorage.setItem('language', language);
  if (selectedLanguage !== language) {
    location.reload();
  }
};

const NavBar = React.memo(props => {
  const {isLoginModal, openLogin, user, white} = props;

  return (
    <React.Fragment>
      {
        isLoginModal &&
          <Login
            open={isLoginModal}
            onClose={openLogin}
          />
      }
      <div style={{
        width: '100%',
      }}
      >
        <AppBar position="static" style={{backgroundColor: '#4b9635', boxShadow: 'none'}}>
          <Toolbar>
            <Navigation />
            {user && (user.role === 'admin') && <Button style={{color: white ? 'white' : 'white'}} component={Link} to="/create-place" >{Translations.navbar.createPlace}</Button>}
            <div style={{flexGrow: 1}}/>
            <img onClick={() => setLanguage('en')} src={EN} width={20} height={20} style={{marginTop: 0}} className={selectedLanguage === 'en' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
            <img onClick={() => setLanguage('ua')} src={UA} width={20} height={20} style={{marginTop: 0}} className={selectedLanguage === 'ua' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
            <IconButton style={{color: '#4b9635'}}>
              <NotificationsIcon/>
            </IconButton>
            <ProfilePhoto openLogin={openLogin}/>
          </Toolbar>

        </AppBar>
      </div>
    </React.Fragment>
  );
});


const mapStateToProps = state => ({
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps, {setLanguage}),
  withState('isLoginModal', 'toggleLogin', false),
  withHandlers({
    openLogin: ({toggleLogin, isLoginModal}) => () => toggleLogin(!isLoginModal),
  }),
)(NavBar);
