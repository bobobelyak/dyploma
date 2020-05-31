import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

const MiddleFeeds = props => {
  const {classes, feed, history} = props;

  const goDetails = id => history.push(`/feed/${id}`);

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <span className="feed-controls"><AccountCircle style={{fontSize: '1em', paddingRight: 3}}/><Typography color="textSecondary"> {feed.author.name}, {moment(feed.createdAt).format('DD MMMM')} </Typography></span>
          <Typography component="h5" variant="h5" style={{fontSize: '1em', cursor: 'pointer'}} onClick={() => goDetails(feed._id)}>
            {feed.header}
          </Typography>
          <Typography component="p" color="textSecondary">
            {feed.shortDescription}
          </Typography>
        </CardContent>
      </div>

      <CardMedia
        className={classes.cover}
        onClick={() => goDetails(feed._id)}
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
    height: 125,
    borderRadius: 0,
    marginBottom: 5,
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
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

export default compose(
  withStyles(styles),
  withRouter,
)(MiddleFeeds);
