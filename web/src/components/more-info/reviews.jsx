import React from 'react';
import {connect} from 'react-redux';
import {compose, withState, withHandlers} from 'recompose';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import {withStyles} from '@material-ui/core/styles';
import TextareaField from '@material-ui/core/TextField';
import {addComment} from '../../store/reducers/places';
import LoginModal from '../login';
import {AuthService} from '../../helpers/auth-service';

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

const Reviews = props => {
  //TODO CREATE CONTEXT FOR LOGIN MODAL
  const {classes, comments, setText, text, placeId, addComment, setTextStrict, showLogin, toggleLogin} = props;

  const submitComment = e => {
    e.preventDefault();
    if (AuthService.tokenExists() && text.length > 0) {
      addComment({text, placeId}, setTextStrict(''));
    } else {
      toggleLogin();
    }
  };

  return (
    <React.Fragment>
      {showLogin &&
        <LoginModal
          open={showLogin}
          onClose={toggleLogin}
        />
      }
      <Grid container justify="center" style={{height: 580, overflow: 'hidden', overflowY: 'scroll'}}>
        <List className={classes.list}>
          {
            comments.map((comment, i) => (
              <React.Fragment key={comment._id} >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={comment.avatar}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<div>{comment.authorName} <span style={{float: 'right', fontSize: '0.8em', color: 'lightgrey'}}>{moment(comment.createdAt).fromNow()}</span></div>}
                    secondary={
                      <React.Fragment>
                        {/* <Typography component="span" color="textPrimary"> */}
                        {comment.text}
                        {/* </Typography> */}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {i !== comments.length - 1 && <Divider/>}
              </React.Fragment>))
          }
        </List>
      </Grid>
      <Divider style={{width: '100%'}}/>
      <form onSubmit={submitComment} style={{marginTop: 5}}>
        <TextareaField
          multiline
          // variant="filled"
          rows={2}
          style={{width: '100%'}}
          onChange={setText}
          value={text}
          placeholder="Enter review comment here"
          InputProps={{
            classes: {underline: classes.underline, root: classes.inputRoot},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={submitComment}
                >
                  <SendIcon style={{color: 'sandybrown'}}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </React.Fragment>
  );
};

export default compose(
  connect(null, {addComment}),
  withStyles(styles),
  withState('text', 'setTextStrict', ''),
  withState('showLogin', 'toggleLogin', false),
  withHandlers({
    setText: ({setTextStrict}) => e => setTextStrict(e.target.value),
    toggleLogin: ({showLogin, toggleLogin}) => () => toggleLogin(!showLogin),
  }),
)(Reviews);
