import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, withState, withHandlers} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import LikeIcon from '@material-ui/icons/Favorite';
import LikedPlaces from './liked-places';
import NoLikedPlaces from '../common/no-data/no-liked-place';

import {withStyles} from '@material-ui/core/styles';

import Tabs from '../common/tabs';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    height: '100vh',
  },
  avatar: {
    width: 70,
    height: 70,
    border: '4px solid sandybrown',
  },
  title: {
    fontSize: '1.5em',
    color: 'sandybrown',
  },
  subtitle: {
    fontSize: '1em',
    color: '#898989',
  },
  settingIcon: {
    marginTop: 10,
    marginRight: 5,
    color: '#898989',
  },
});

const tabLabels = [<LikeIcon key={1}/>, 'Events', 'Feeds'];

const Profile = props => {
  const {user, classes, tab, setTab} = props;

  return (
    <Grid container>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            (user.avatar ?
              <Avatar className={classes.avatar} alt="Remy Sharp" src={user.avatar}/> :
              <Avatar className={classes.avatar}>{user.name[0].toUpperCase()}</Avatar>
            )
          }
          title={
            <Typography className={classes.title} variant="h3" gutterBottom>
              {user.name}
            </Typography>
          }
          subheader={
            <Typography className={classes.subtitle} variant="h2" gutterBottom>
              {user.email}
            </Typography>
          }
          action={
            <IconButton className={classes.settingIcon}>
              <SettingsIcon/>
            </IconButton>
          }
        />
        <Divider/>
        <Tabs value={tab} changeTab={setTab} tabLabels={tabLabels}/>
        {tab === 0 && <LikedPlaces/>}
        {tab === 1 && 'asd'}
        {tab === 2 && 324}
      </Card>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps),
  withState('tab', 'setTab', 0),
  withHandlers({
    setTab: ({setTab}) => (e, tab) => setTab(tab),
  }),
  withStyles(styles),
)(Profile);
