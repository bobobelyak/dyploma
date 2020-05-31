import React from 'react';
import {compose} from 'recompose';
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import moment from 'moment';

import Controls from './controls';

const MainFeed = props => {
  const {classes, feed, history} = props;

  const goDetails = id => history.push(`/feed/${id}`);

  return (
    <Card className={classes.card}>
      <CardMedia
        onClick={() => goDetails(feed._id)}
        className={classes.media}
        image={feed.imgUrl}
        title="Paella dish"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <span className="feed-controls"><AccountCircle style={{fontSize: '1em', paddingRight: 3}}/><Typography color="textSecondary"> {feed.author.name}, {moment(feed.createdAt).format('DD MMMM')} </Typography></span>
          <Typography onClick={() => goDetails(feed._id)} component="h5" variant="h5" style={{marginTop: 2, cursor: 'pointer'}}>
            {feed.header}
          </Typography>
          <Typography component="p" color="textSecondary" style={{fontSize: '1em'}}>
            {feed.shortDescription}
          </Typography>
        </CardContent>
        <Controls feed={feed}/>
      </div>
    </Card>
  );
};

const styles = theme => ({
  card: {
    maxWidth: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    height: '100%',
  },
  media: {
    height: 150,
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    // Width: '70%',
  },
});

export default compose(
    withStyles(styles),
    withRouter,
)(MainFeed);
