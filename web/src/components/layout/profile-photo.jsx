import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {AuthService} from '../../helpers/auth-service';

const ProfilePhoto = props => {
  const {openLogin, history, user} = props;

  const goToProfile = e => {
    e.preventDefault();
    history.push('/profile');
  };

  if (AuthService.tokenExists()) {
    if (user.avatar) {
      return <Avatar style={{cursor: 'pointer'}} onClick={goToProfile} alt="Remy Sharp" src={user.avatar}/>;
    }
    return <Avatar style={{cursor: 'pointer'}} onClick={goToProfile}>{user.name[0].toUpperCase()}</Avatar>;
  }
  return (
    <IconButton
      aria-haspopup="true"
      onClick={openLogin}
      style={{color: 'sandybrown'}}
    >
      <AccountCircle/>
    </IconButton>
  );
};

const MemoComponent = React.memo(ProfilePhoto);

const mapStateToProps = state => ({
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
)(MemoComponent);
