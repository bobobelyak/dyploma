import React from 'react';
import moment from 'moment';
import {compose, lifecycle, withState, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Controls from './controls';
import {dislike, like} from '../../store/reducers/feeds';

const FeedItem = props => {
  const {classes, feed, history,} = props;

  const goDetails = id => history.push(`/feed/${id}`);

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <span className="feed-controls"><AccountCircle style={{fontSize: '1em', paddingRight: 3}}/><Typography color="textSecondary"> {feed.author.name}, {moment(feed.createdAt).format('DD MMMM')}</Typography></span>
          <Typography onClick={() => goDetails(feed._id)} component="h5" variant="h5" style={{marginTop: 2, cursor: 'pointer'}}>
            {feed.header}
          </Typography>
          <Typography component="p" color="textSecondary">
            {feed.shortDescription}
          </Typography>
        </CardContent>
        <Controls feed={feed}/>
      </div>

      <CardMedia
        onClick={() => goDetails(feed._id)}
        className={classes.cover}
        image={feed.imgUrl}
        title="Live from space album cover"
      />
    </Card>
  );
};

const styles = theme => ({
  card: {
    display: 'flex',
    width: '100%',
    minHeight: 180,
    borderRadius: 0,
    marginBottom: 30,
    boxShadow: 'none',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '30%',
    cursor: 'pointer',
  },
});

export default compose(
  withStyles(styles, {withTheme: true}),
  connect(null, {like, dislike}),
  withState('allowLike', 'setAllowLike', true),
  withState('allowDislike', 'setAllowDislike', true),
)(FeedItem);
