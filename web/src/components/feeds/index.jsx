import React from 'react';
import {compose, withState, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/KeyboardArrowLeft';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {getFeeds, getTopFeeds, getPreviousTopFeeds} from '../../store/reducers/feeds';
import EN from '../../../public/icons/united-kingdom.svg';
import UA from '../../../public/icons/ukraine.svg';
import {Navigation} from '../layout/navigation';
import FeedItem from './feed-list-item';
import MainFeed from './main-feed';
import MiddleFeeds from './middle-feeds';
import RightFeed from './right-feed';
import BestOfPreviousMonth from './best-of-previous-month';
import Create from './create';

const Transition = props => <Slide direction="left" {...props}/>;

const topics = ['All', 'Home', 'Health', 'Education', 'Technologies', 'Buisness', 'Politics'];

const selectedLanguage = localStorage.getItem('language');

const setLanguage = language => {
  localStorage.setItem('language', language);
  if (selectedLanguage !== language) {
    location.reload();
  }
};

const Feeds = props => {
  // TODO OPTIMIZE RENDERING
  const {history, openCreate, toggleCreate, feeds, topFeeds, previousMonthFeeds} = props;

  const goBack = () => history.goBack();

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
      <div style={{height: 100}}>
        <Grid container alignItems="center" justify="space-around" direction="row" style={{height: '100%'}}>
          <Grid item md={2}/>
          {
            topics.map(topic => (
              <Typography key={topic} component="h2" variant="h2" style={{cursor: 'pointer', marginRight: 30, fontSize: '1em', textTransform: 'uppercase', borderBottom: '2px solid sandybrown'}}>
                {topic}
              </Typography>
            ))
          }
          <Grid item md={2}/>
        </Grid>
      </div>
      <Grid container style={{height: 400, marginTop: 10}} spacing={8}>
        <Grid item md={1}/>
        <Grid item md={4} style={{height: 400}}>
          {topFeeds[0] && <MainFeed feed={topFeeds[0]}/>}
        </Grid>
        <Grid item md={4} style={{height: 400}}>
          <Grid container alignItems="center" style={{height: '100%'}}>
            {topFeeds[1] && <MiddleFeeds feed={topFeeds[1]}/>}
            {topFeeds[2] && <MiddleFeeds feed={topFeeds[2]}/>}
            {topFeeds[3] && <MiddleFeeds feed={topFeeds[3]}/>}
          </Grid>
        </Grid>
        <Grid item md={2} style={{height: 400}}>
          {topFeeds[4] && <RightFeed feed={topFeeds[4]}/> }
        </Grid>
        <Grid item md={1}/>
      </Grid>
      <Grid container style={{marginTop: 30}} spacing={8}>
        <Grid item md={2}/>
        <Grid item md={6}>
          {
            feeds.map(feed => <FeedItem key={feed._id} feed={feed} history={history}/>)
          }
        </Grid>
        <Grid item md={2} style={{height: '100%'}}>
          <Typography variant="h2" style={{fontSize: '1.1em', textTransform: 'uppercase', marginBottom: 10}}>Best of previous month</Typography>
          {
            previousMonthFeeds.map(feed => <BestOfPreviousMonth key={feed._id} feed={feed}/>)
          }
        </Grid>
        <Grid item md={2}/>
      </Grid>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  feeds: state.feeds.feeds,
  topFeeds: state.feeds.topFeeds,
  previousMonthFeeds: state.feeds.previousMonthFeeds,
});

export default compose(
  connect(mapStateToProps, {getFeeds, getTopFeeds, getPreviousTopFeeds}),
  withState('openCreate', 'toggleCreate', false),
  lifecycle({
    async componentDidMount() {
      await this.props.getFeeds();
      await this.props.getTopFeeds();
      await this.props.getPreviousTopFeeds();
    },
  }),
)(Feeds);
