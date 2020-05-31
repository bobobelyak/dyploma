import React from 'react';
import {compose, lifecycle, withState} from 'recompose';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/ModeComment';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import {getSingleFeed, like, dislike} from '../../../store/reducers/feeds';
import Comments from './comments';

const Transition = props => <Slide direction="left" {...props}/>;

class SingleFeed extends React.Component {
  // TODO ADD 3 SUGGESTIONS FOR FEED
  constructor() {
    super();

    this.myRef = React.createRef();
  }

  goBack = () => this.props.history.goBack();

  scrollToMyRef = () => {
    if (this.myRef.current) {
      this.myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  likeFeed = () => {
    const {like, setAllowLike, feed} = this.props;
    setAllowLike(false);
    like({feedId: feed._id}, () => setAllowLike(true));
  };

  dislikeFeed = () => {
    const {dislike, setAllowDislike, feed} = this.props;
    setAllowDislike(false);
    dislike({feedId: feed._id}, () => setAllowDislike(true));
  };

  render() {
    const {history, feed, classes, allowLike, allowDislike} = this.props;

    return (
      <Dialog
        fullScreen
        open
        TransitionComponent={Transition}
      >
        <AppBar style={{boxShadow: 'none', position: 'relative'}}>
          <Toolbar style={{backgroundColor: 'sandybrown'}}>
            <span onClick={this.goBack} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              <CloseIcon style={{fontSize: '2em'}}/> Back
            </span>
          </Toolbar>
        </AppBar>
        <Grid container>
          <div className="sticky-bar">
            <Grid container justify="center" direction="column" alignItems="center" style={{width: '100%'}}>
              <FavoriteIcon onClick={allowLike ? () => this.likeFeed() : null} style={{color: feed.liked ? 'sandybrown' : 'lightgray', cursor: 'pointer'}}/>
              <span style={{fontSize: '0.8em', fontWeight: 'lighter'}}>{feed.likes}</span>
              <ThumbDownIcon onClick={allowDislike ? () => this.dislikeFeed() : null} style={{marginTop: 10, color: feed.disliked ? 'sandybrown' : 'lightgray', cursor: 'pointer'}}/>
              <span style={{fontSize: '0.8em', fontWeight: 'lighter'}}>{feed.dislikes}</span>
              <CommentIcon onClick={this.scrollToMyRef} style={{marginTop: 10, color: 'lightgray', cursor: 'pointer'}}/>
              <span style={{fontSize: '0.8em', fontWeight: 'lighter'}}>{feed.comments.length}</span>
            </Grid>
          </div>
          <Grid item md={3}/>
          <Grid item md={6}>
            <Typography component="h5" variant="h5" style={{marginTop: 20, fontSize: '2em'}}>
              {feed.header}
            </Typography>
            <Typography color="textSecondary" style={{fontSize: '1.3em'}}>
              {feed.shortDescription}
            </Typography>
            <span>
              {
                feed.author &&
                <CardHeader
                  avatar={<Avatar className={classes.avatar} alt="Remy Sharp" src={feed.author.avatar}/>}
                  title={
                    <Typography className={classes.title} variant="h5" gutterBottom>
                      {feed.author.name}
                    </Typography>
                  }
                  subheader={
                    <Typography className={classes.subtitle} variant="h2" gutterBottom>
                      {moment(feed.createdAt).format('MMMM DD')}
                    </Typography>
                  }
                />
              }
            </span>
            <CardMedia
              style={{width: '100%', height: 400}}
              image={feed.imgUrl}
              title="Live from space album cover"
            />
            <div className="text-from-editor" style={{marginTop: 30}}>{ReactHtmlParser(feed.text)}</div>
          </Grid>
          <Grid item md={3}/>
        </Grid>
        <Comments comments={feed.comments}>
          <div ref={this.myRef} style={{marginTop: 300, display: 'fixed', position: 'absolute'}}/>
        </Comments>
      </Dialog>

    );
  }
}

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    height: '100vh',
  },
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
});

const mapStateToProps = state => ({
  feed: state.feeds.feed,
});

export default compose(
  connect(mapStateToProps, {getSingleFeed, like, dislike}),
  withState('allowLike', 'setAllowLike', true),
  withState('allowDislike', 'setAllowDislike', true),
  lifecycle({
    async componentDidMount() {
      const {match, getSingleFeed} = this.props;
      await getSingleFeed(match.params.id);
    },
  }),
  withStyles(styles),
)(SingleFeed);
