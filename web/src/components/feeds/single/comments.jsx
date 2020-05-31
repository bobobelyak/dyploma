import React from 'react';
import moment from 'moment';
import {compose, withState, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';
import TextareaField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import {AuthService} from '../../../helpers/auth-service';
import {postComment} from '../../../store/reducers/feeds';
import LoginModal from '../../login';

const Comments = props => {
  const {comments, classes,
    postComment,
    text,
    setCommentText,
    setText, match,
    showLogin,
    toggleLogin} = props;

  const submitComment = e => {
    e.preventDefault();
    if (AuthService.tokenExists() && text.length > 0) {
      postComment({text, feedId: match.params.id}, setCommentText(''));
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
      <Grid container>
        <Grid item md={3}/>
        <Grid item md={6}>
          <Card style={{
            width: '100%',
            border: '1px solid lightgray',
            borderRadius: 0,
            boxShadow: 'none',
            height: 80,
          }}
          >
            <form onSubmit={submitComment} style={{marginTop: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TextareaField
                multiline
                onChange={setText}
                value={text}
                rows={2}
                style={{width: '90%'}}
                placeholder="Enter comment here"
                InputProps={{
                  classes: {underline: classes.underline, root: classes.inputRoot},
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={submitComment}
                        aria-label="Toggle password visibility"
                      >
                        <SendIcon style={{color: 'sandybrown'}}/>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Card>
        </Grid>
        <Grid item md={3}/>
        {
          props.children
        }
      </Grid>
      <Grid container>
        <Grid item md={3}/>
        <Grid item md={6} style={{marginBottom: 150}}>
          {
            comments.map(comment => (
              <Card style={{
                width: '100%',
                marginTop: 5,
                border: '1px solid lightgray',
                borderRadius: 0,
                boxShadow: 'none',
              }}
              >
                <CardHeader
                  avatar={<Avatar className={classes.avatar} alt="Remy Sharp" src={comment.avatar}/>}
                  title={
                    <Typography variant="h2" color="textSecondary" style={{fontSize: '1em'}} gutterBottom>
                      {comment.authorName}
                    </Typography>
                  }
                  subheader={
                    <Typography style={{fontSize: '0.8em'}} variant="h2" gutterBottom>
                      {moment(comment.createdAt).fromNow()}
                    </Typography>
                  }
                />

                <CardContent style={{padding: '0 20px 20px 20px', fontWeight: 'lighter'}}>
                  {comment.text}
                </CardContent>
              </Card>
            ))
          }
        </Grid>
        <Grid item md={3}/>
      </Grid>
    </React.Fragment>
  );
};

const styles = theme => ({
  avatar: {
    width: 50,
    height: 50,
    border: '2px solid sandybrown',
  },
  title: {
    fontSize: '1em',
    color: 'sandybrown',
  },
  subtitle: {
    fontSize: '1em',
    color: '#898989',
  },
  underline: {
    '&:after': {
      borderBottom: 'sandybrown',
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

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, {postComment}),
  withState('text', 'setCommentText', ''),
  withState('showLogin', 'toggleLogin', false),
  withHandlers({
    setText: ({setCommentText}) => e => setCommentText(e.target.value),
    toggleLogin: ({showLogin, toggleLogin}) => () => toggleLogin(!showLogin),

  }),
)(Comments);
