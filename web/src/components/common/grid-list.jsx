import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/ModeComment';
import {getLikedPlaces} from '../../store/reducers/user';
import {toggleMoreInfo} from '../../store/reducers/more-info';
import {showPopup, setCoordinates} from '../../store/reducers/map';
import {setPlace} from '../../store/reducers/places';
import {CategoryIcon} from '../../helpers/select-icon';

const GridListComponent = props => {
  const {data, classes, toggleMoreInfo, history, setCoordinates, location, showPopup, setPlace, showActionIcons = true, cols, height, padding} = props;

  const goToMoreInfo = place => e => {
    e.stopPropagation();
    toggleMoreInfo();
    history.push(`/place/${place._id}`);
  };

  const setCenter = place => e => {
    e.stopPropagation();
    setPlace(place);
    setCoordinates([place.longitude, place.latitude]);
    if (location.pathname === '/create-tour') {
      showPopup({popup: true, btn: true});
    } else {
      showPopup({popup: true, btn: false});
    }
  };

  const actionIcons = place => showActionIcons ?
    [
      [
        <Tooltip key={2} title="Like" placement="top">
          <IconButton style={{padding: '0 5px 5px 5px'}}>
            <Badge classes={{badge: classes.badge}} style={{opacity: place.liked ? 1 : 0.7}} badgeContent={place.likes} color="primary">
              <FavoriteIcon className={classes.icon} style={{color: place.liked ? 'sandybrown' : 'white'}}/>
            </Badge>
          </IconButton>
        </Tooltip>,
        <Tooltip key={3} title="Dislike" placement="top">
          <IconButton style={{padding: '0 5px 5px 5px'}}>
            <Badge classes={{badge: classes.badge}} style={{opacity: place.disliked ? 1 : 0.7}} badgeContent={place.dislikes} color="primary">
              <ThumbDownIcon className={classes.icon} style={{color: place.disliked ? 'sandybrown' : 'white'}}/>
            </Badge>
          </IconButton>
        </Tooltip>,
        <Tooltip key={4} title="Comments" placement="top">
          <IconButton onClick={goToMoreInfo(place)} style={{padding: '0 5px 5px 5px'}}>
            <Badge classes={{badge: classes.badge}} style={{color: 'white', opacity: 0.7}} badgeContent={place.comments} color="primary">
              <CommentIcon className={classes.icon}/>
            </Badge>
          </IconButton>
        </Tooltip>,
      ],
    ] :
    [
      <Tooltip key={2} title="Like" placement="top">
        <IconButton style={{paddingTop: 0}}>
          <Badge classes={{badge: classes.badge}} style={{opacity: place.liked ? 1 : 0.7}} badgeContent={place.likes} color="primary">
            <FavoriteIcon className={classes.icon} style={{color: place.liked ? 'sandybrown' : 'white'}}/>
          </Badge>
        </IconButton>
      </Tooltip>,
    ];

  return (
    <CardContent>
      <GridList cellHeight={height ? height : 160} cols={cols}>
        {data.map(place => (
          <GridListTile key={place._id} style={{padding: padding ? 10 : 3}}>
            <div style={{position: 'absolute', padding: 5, zIndex: 100}}>
              <CategoryIcon category={place.iconImage} all={height}/>
            </div>
            <img onClick={setCenter(place)} className={classes.media} src={place.imgUrl} alt={place.name}/>
            <GridListTileBar
              title={place.name}
              subtitle={`${place.street}, ${place.buildingNumber}`}
              titlePosition="bottom"
              actionPosition="right"
              onClick={goToMoreInfo(place)}
              classes={{
                root: classes.titleBar,
                title: classes.title,
                subtitle: classes.subtitle,
              }}
              actionIcon={actionIcons(place)}
            />
          </GridListTile>
        ))}
      </GridList>
    </CardContent>
  );
};

const styles = theme => ({
  titleBar: {
    cursor: 'pointer',
    background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    '&:hover': {
      background:
          'linear-gradient(to top, rgba(255,146,10,1) 0%, rgba(255,175,75,0.7) 1%, rgba(255,175,75,0) 100%)',
    },
  },
  subtitle: {
    fontWeight: 'lighter',
  },
  icon: {
    width: '0.8em',
    height: '0.8em',
  },
  badge: {
    backgroundColor: 'transparent',
    color: 'white',
    top: '105%',
    right: -2,
    fontSize: '0.7rem',
    // The border color match the background color.
    // border: `2px solid white`,
  },
  media: {
    cursor: 'pointer',
  },
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, {toggleMoreInfo, setCoordinates, showPopup, setPlace}),
)(GridListComponent);

