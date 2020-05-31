import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import Controls from './controls';
import moment from 'moment';

const BestOfPreviousMonth = props => {
  const {classes, feed, history} = props;

  const goDetails = id => history.push(`/feed/${id}`);

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <span className="feed-controls"><AccountCircle style={{fontSize: '1em', paddingRight: 3}}/><Typography color="textSecondary"> {feed.author.name}, {moment(feed.createdAt).format('DD MMMM')} </Typography></span>
          <Typography onClick={() => goDetails(feed._id)} component="h5" variant="h5" style={{marginTop: 2, fontSize: '1em'}}>
            {feed.header}
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
    height: '200',
    borderLeft: '3px solid lightgray',
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
)(BestOfPreviousMonth);
