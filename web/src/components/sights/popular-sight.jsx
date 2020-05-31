import React from 'react';
import {compose} from 'recompose';
import {withStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/ModeComment';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {toggleMoreInfo} from '../../store/reducers/more-info';
import {CategoryIcon} from "../../helpers/select-icon";
import Grid from "@material-ui/core/Grid";

const Sight = props => {
  const {place, classes, height, history} = props;

  const goToMoreInfo = place => e => {
    e.stopPropagation();
    // toggleMoreInfo();
    history.push(`/place/${place._id}`);
  };

  const actionIcons = place =>
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
    ];

  return (
    <GridListTile style={{listStyleType: 'none', height}}>
      {place &&
      <React.Fragment>
        <div style={{position: 'absolute', padding: 5, zIndex: 100}}>
          <CategoryIcon category={place.iconImage} all/>
        </div>
        <img className={classes.media} src={place.imgUrl} alt={place.name}/>
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
      </React.Fragment>
      }
    </GridListTile>
  );
};

const stylesMain = theme => ({
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
    width: '100%',
    cursor: 'pointer',
    objectFit: 'fill',
  },
});

export const PopularSight = compose(
  withStyles(stylesMain),
  withRouter,
  connect(null, {toggleMoreInfo}),
)(Sight);

const RPlace = props => {
  const {classes, place, history} = props;

  const goDetails = id => history.push(`/place/${id}`);

  if (place === undefined) {
    return null;
  }

  return (
    <Card className={classes.card}>
      <div style={{position: 'absolute', padding: 5, zIndex: 100}}>
        <CategoryIcon category={place.iconImage} all/>
      </div>
      <CardMedia
        className={classes.media}
        onClick={() => goDetails(place._id)}
        image={place.imgUrl}
        title="Paella dish"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{marginTop: 2, fontSize: '1em', cursor: 'pointer'}}>
            {place.name}
          </Typography>
          <Typography component="p" color="textSecondary">
            {place.description}
          </Typography>
        </CardContent>
      </div>
      <Grid container direction="row" style={{paddingLeft: 16, marginBottom: 5}}>
        <span className="feed-controls"><FavoriteIcon style={{fontSize: '1em', padding: 3, color: place.liked && 'sandybrown', cursor: 'pointer'}}/> <span style={{fontSize: '0.8em'}}>{place.likes}</span></span>
        <span className="feed-controls"><ThumbDownIcon style={{fontSize: '1em', padding: 3, color: place.disliked && 'sandybrown', cursor: 'pointer'}}/> <span style={{fontSize: '0.8em'}}>{place.dislikes}</span></span>
        <span className="feed-controls"><CommentIcon style={{fontSize: '1em', padding: 3, cursor: 'pointer'}}/> <span style={{fontSize: '0.8em'}}>{place.comments}</span></span>
      </Grid>
    </Card>
  );
};

const stylesRight = theme => ({
  card: {
    maxWidth: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    height: '100%',
  },
  media: {
    height: 145,
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    // Width: '70%',
  },
});

export const RightPlace = compose(
  withStyles(stylesRight),
  withRouter,
)(RPlace);
