import React from 'react';
import {compose, withState, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/ModeComment';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';
import {Navigation} from '../layout/navigation';
import dumpImg from '../../../public/images/dump.jpeg';
import {getEvents, getComing, like, dislike} from '../../store/reducers/events';
import Create from './create';

const selectedLanguage = localStorage.getItem('language');

const setLanguage = language => {
  localStorage.setItem('language', language);
  if (selectedLanguage !== language) {
    location.reload();
  }
};

const Transition = props => <Slide direction="left" {...props}/>;

const array = [1, 1, 1, 1];

const actionIcons = (event, classes, like, dislike) => [
  <Tooltip key={2} title="Like" placement="top">
    <span style={{padding: '0 5px 5px 5px'}}>
      <Badge classes={{badge: classes.badge}} style={{opacity: event.liked ? 1 : 0.7, marginBottom: 10}} badgeContent={event.likes} color="primary">
        <FavoriteIcon onClick={() => like(event)} className={classes.icon} style={{color: event.liked ? 'sandybrown' : 'white'}}/>
      </Badge>
    </span>
  </Tooltip>,
  <Tooltip key={3} title="Dislike" placement="top">
    <span style={{padding: '0 5px 5px 5px'}}>
      <Badge classes={{badge: classes.badge}} style={{opacity: event.disliked ? 1 : 0.7, marginBottom: 10}} badgeContent={event.dislikes} color="primary">
        <ThumbDownIcon onClick={() => dislike(event)} className={classes.icon} style={{color: event.disliked ? 'sandybrown' : 'white'}}/>
      </Badge>
    </span>
  </Tooltip>,
  <Tooltip key={4} title="Comments" placement="top">
    <span style={{padding: '0 5px 5px 5px'}}>
      <Badge classes={{badge: classes.badge}} style={{color: 'white', opacity: 0.7, marginBottom: 10}} badgeContent={event.comments} color="primary">
        <CommentIcon className={classes.icon}/>
      </Badge>
    </span>
  </Tooltip>,
];

const Events = props => {
  const {history, classes, openCreate, toggleCreate, events = [], allowLike, setAllowLike, allowDislike, setAllowDislike} = props;

  const likeEvent = event => {
    const {like} = props;
    setAllowLike(false);
    like({eventId: event._id}, () => setAllowLike(true));
  };

  const dislikeEvent = event => {
    const {dislike} = props;
    setAllowDislike(false);
    dislike({eventId: event._id}, () => setAllowDislike(true));
  };

  return (
    <Dialog
      fullScreen
      open
      TransitionComponent={Transition}
    >
      {openCreate && <Create
        open={openCreate}
        onClose={() => toggleCreate(!openCreate)}
      /> }
      <AppBar style={{boxShadow: 'none', position: 'relative'}}>
        <Toolbar style={{backgroundColor: 'sandybrown'}}>
          <Navigation white/>
          <div style={{flexGrow: 1}}/>
          <img onClick={() => setLanguage('en')} src={EN} width={20} height={20} style={{marginTop: 0}} className={selectedLanguage === 'en' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
          <img onClick={() => setLanguage('ua')} src={UA} width={20} height={20} style={{marginTop: 0}} className={selectedLanguage === 'ua' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
          <IconButton onClick={() => toggleCreate(!openCreate)} style={{cursor: 'pointer'}}><AddIcon style={{fontSize: '1.3em', color: 'white'}}/></IconButton>
        </Toolbar>
      </AppBar>
      <Grid container style={{marginTop: 10}} spacing={8}>
        <Grid item md={1}/>
        <Grid item md={10}>
          <Typography variant="h2" style={{fontSize: '2em', textTransform: 'uppercase', fontWeight: 'lighter', padding: 10}}> Upcoming events</Typography>
          <GridList cellHeight={100} cols={12} spacing={1} className={classes.gridList}>
            {events.map((event, i) => (
              <GridListTile key={i} cols={3} rows={4} style={{padding: 5}}>
                <div style={{position: 'absolute', paddingTop: 5, zIndex: 100}}>
                  <div style={{backgroundColor: 'sandybrown', color: 'white', padding: 3, fontWeight: 'lighter'}}>
                    {moment(event.eventDate).isSame(moment(), 'd') ? 'Today' : moment(event.eventDate).format('DD MMMM')}
                  </div>
                </div>
                <img src={event.imgUrl} style={{cursor: 'pointer'}} onClick={() => console.log('go to')} alt={i}/>
                <GridListTileBar
                  title={event.header}
                  // Subtitle={`${place.street}, ${place.buildingNumber}`}
                  titlePosition="bottom"
                  actionPosition="right"
                  // OnClick={goToMoreInfo(place)}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                    subtitle: classes.subtitle,
                  }}
                  actionIcon={actionIcons(event, classes, likeEvent, dislikeEvent)}
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid item md={1}/>
      </Grid>
      <Grid container style={{marginTop: 10}} spacing={8}>
        <Grid item md={1}/>
        <Grid item md={10}>
          <Typography variant="h2" style={{fontSize: '2em', textTransform: 'uppercase', fontWeight: 'lighter', padding: 10}}> Coming soon</Typography>
          <GridList cellHeight={100} cols={12} spacing={1} className={classes.gridList}>
            {array.map((tile, i) => (
              <GridListTile key={i} cols={3} rows={4} style={{padding: 5}}>
                <div style={{position: 'absolute', paddingTop: 5, zIndex: 100}}>
                  <div style={{backgroundColor: 'sandybrown', color: 'white', padding: 3, fontWeight: 'lighter'}}>
                      May 21
                  </div>
                </div>
                <img src={dumpImg} alt={i}/>
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid item md={1}/>
      </Grid>
    </Dialog>
  );
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    cursor: 'pointer',
    background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 1%, rgba(0,0,0,0.1) 100%)',
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
});

const mapStateToProps = state => ({
  events: state.events.events,
});

export default compose(
  connect(mapStateToProps, {getEvents, getComing, like, dislike}),
  withStyles(styles),
  withState('openCreate', 'toggleCreate', false),
  withState('allowLike', 'setAllowLike', true),
  withState('allowDislike', 'setAllowDislike', true),
  lifecycle({
    componentDidMount() {
      this.props.getEvents();
    },
  }),
)(Events);
