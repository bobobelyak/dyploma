import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {compose, lifecycle, withHandlers, withState} from 'recompose';
import {withStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider/Divider';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/ModeComment';
import Tooltip from '@material-ui/core/Tooltip';

import {toggleMoreInfo} from '../../store/reducers/more-info';
import {setPlace} from '../../store/reducers/places';
import {like, dislike} from '../../store/reducers/comments';
import {CategoryIcon} from '../../helpers/select-icon';
import {styles} from './styles';

const Place = props => {
  const {place, classes, history, toggleMoreInfo, like, allowLike, setAllowLike, dislike, allowDislike, setAllowDislike, isMoreInfo} = props;

  const goToMoreInfo = e => {
    e.stopPropagation();
    toggleMoreInfo();
    history.push(`/place/${place._id}`);
  };

  const likePlace = () => {
    setAllowLike(false);
    like({placeId: place._id}, () => setAllowLike(true));
  };
  const dislikePlace = () => {
    setAllowDislike(false);
    dislike({placeId: place._id}, () => setAllowDislike(true));
  };

  return (
    <Card className={classes.card}>
      <div style={{position: 'absolute', padding: 5}}>
        <CategoryIcon category={place.iconImage}/>
      </div>
      <CardMedia
        onClick={isMoreInfo ? null : goToMoreInfo}
        className={classes.media}
        image={place.imgUrl}
        title="Paella dish"
      />
      <CardHeader
        action={[
          <Tooltip key={2} title="Like" placement="top">
            <IconButton onClick={allowLike ? (() => likePlace()) : null}>
              <Badge classes={{badge: classes.badge}} badgeContent={place.likes} color="primary">
                <FavoriteIcon style={{color: place.liked && 'sandybrown'}}/>
              </Badge>
            </IconButton>
          </Tooltip>,
          <Tooltip key={3} title="Dislike" placement="top">
            <IconButton onClick={allowDislike ? (() => dislikePlace()) : null}>
              <Badge classes={{badge: classes.badge}} badgeContent={place.dislikes} color="primary">
                <ThumbDownIcon style={{color: place.disliked && 'sandybrown'}}/>
              </Badge>
            </IconButton>
          </Tooltip>,
          !isMoreInfo && <Tooltip key={4} title="Comment" placement="top">
            <IconButton>
              <Badge classes={{badge: classes.badge}} badgeContent={place.comments} color="primary">
                <CommentIcon/>
              </Badge>
            </IconButton>
          </Tooltip>,
          <Tooltip key={1} title="Share" placement="top">
            <IconButton>
              <ShareIcon/>
            </IconButton>
          </Tooltip>,
        ]}
        title={place.name}
        subheader={`${place.street}, ${place.buildingNumber}`}
      />
      <Divider variant="middle"/>
      <CardContent>
        <Typography component="p">
          {place.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  isMoreInfoModal: state.moreInfo.isMoreInfoModal,
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {toggleMoreInfo, setPlace, like, dislike}),
  withState('readMoreState', 'toggle', false),
  withState('allowLike', 'setAllowLike', true),
  withState('allowDislike', 'setAllowDislike', true),
  withHandlers({
    toggle: ({toggle}) => param => toggle(param),
  }),
)(Place);
