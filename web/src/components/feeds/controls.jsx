import React from 'react';
import {compose, withState} from 'recompose';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/ModeComment';
import {dislike, like} from '../../store/reducers/feeds';

const Controls = props => {
  const {
    allowLike,
    setAllowLike,
    allowDislike,
    setAllowDislike,
    feed,
  } = props;

  const likeFeed = () => {
    const {like} = props;
    setAllowLike(false);
    like({feedId: feed._id}, () => setAllowLike(true));
  };

  const dislikeFeed = () => {
    const {dislike} = props;
    setAllowDislike(false);
    dislike({feedId: feed._id}, () => setAllowDislike(true));
  };

  return (
    <Grid container direction="row" style={{paddingLeft: 16, marginBottom: 5}}>
      <span className="feed-controls"><FavoriteIcon onClick={allowLike ? () => likeFeed() : null} style={{fontSize: '1em', padding: 3, color: feed.liked && 'sandybrown', cursor: 'pointer'}}/> <span style={{fontSize: '0.8em'}}>{feed.likes}</span></span>
      <span className="feed-controls"><ThumbDownIcon onClick={allowDislike ? () => dislikeFeed() : null} style={{fontSize: '1em', padding: 3, color: feed.disliked && 'sandybrown', cursor: 'pointer'}}/> <span style={{fontSize: '0.8em'}}>{feed.dislikes}</span></span>
      <span className="feed-controls"><CommentIcon style={{fontSize: '1em', padding: 3, cursor: 'pointer'}}/> <span style={{fontSize: '0.8em'}}>{feed.comments}</span></span>
    </Grid>
  );
};

export default compose(
  connect(null, {like, dislike}),
  withState('allowLike', 'setAllowLike', true),
  withState('allowDislike', 'setAllowDislike', true),
)(Controls);

