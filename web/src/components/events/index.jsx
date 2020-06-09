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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';
import {Navigation} from '../layout/navigation';
import dumpImg from '../../../public/images/dump.jpeg';
import {getEvents, getComing, like, dislike} from '../../store/reducers/events';
import Create from './create';
import SearchIcon from '@material-ui/icons/Search';


const selectedLanguage = localStorage.getItem('language');

const setLanguage = language => {
  localStorage.setItem('language', language);
  if (selectedLanguage !== language) {
    location.reload();
  }
};

const topics = ['Онкологія', 'Біохімія', 'Алергія', 'Щитоподібна', 'Covid-19'];

const Transition = props => <Slide direction="left" {...props}/>;

const array = [1, 1, 1, 1];


const Events = props => {
  const {history, classes,search, openCreate, toggleCreate, events = [], allowLike, setAllowLike, allowDislike, setAllowDislike} = props;

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
        <Toolbar style={{backgroundColor: '#4b9635'}}>
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
            search ?
              <TextField
                // OnChange={changeInfo('name')}
                // value={textInput.name}
                autoFocus
                style={{width: '60%'}}
                variant="standard"
                placeholder="Search"
                required
                InputProps={{
                  classes: {underline: classes.underline, root: classes.inputRoot},
                }}
              /> :
              topics.map(topic => (
                <Typography key={topic} component="h2" variant="h2" style={{cursor: 'pointer', marginRight: 30, fontSize: '1em', textTransform: 'uppercase', borderBottom: '2px solid #4b9635'}}>
                  {topic}
                </Typography>
              ))
          }
          { search ?
            <CloseIcon style={{cursor: 'pointer'}} onClick={() => toggleSearch(!search)}/> :
            <SearchIcon style={{cursor: 'pointer'}} onClick={() => toggleSearch(!search)}/>
          }
          <Grid item md={2}/>
        </Grid>
      </div>
      <Grid container style={{marginTop: 10}} spacing={8}>
        <Grid item md={1}/>
        <Grid item md={11}>
          <GridList cellHeight={500} cols={3.5} spacing={50} className={classes.gridList}>
          <Card className={classes.rot}>
  <CardActionArea>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      height="280"
      image={require('./image1.jpeg')}
      title="Contemplative Reptile"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        РОЗГОРНУТИЙ АНАЛІЗ КРОВІ
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Розгорнутий (загальний, клінічний) аналіз крові (ЗАК). Автоматизований аналіз з формулою (16 показників) + Швидкість осідання еритроцитів (ШОЕ, РОЕ) + Лейкоцитарна формула (ручний підрахунок)
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" color="primary">
      Тривалість може варіюватися
    </Button>
    <Button size="small" color="primary">
      110 грн
    </Button>
  </CardActions>
</Card>
<Card className={classes.rot}>
<CardActionArea>
<CardMedia
component="img"
alt="Contemplative Reptile"
height="280"
image={require('./image2.jpeg')}
title="Contemplative Reptile"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Комплекс "Печінкові проби"(9 показників)
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Лабораторні тести направлені на визначення ключових параметрів функції печінки: АЛТ, АСТ, гама-ГТП, ЛФ, білірубін фракційно, загальний білок, тимолова проба</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary">
Тривалість може варіюватися
</Button>
<Button size="small" color="primary">
270 грн
</Button>
</CardActions>
</Card>
<Card className={classes.rot}>
<CardActionArea>
<CardMedia
component="img"
alt="Contemplative Reptile"
height="280"
image={require('./image3.jpg')}
title="Contemplative Reptile"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Антитіла IgM та IgG до вірусу кору
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
IgM та IgG до вірусу кору є специфічними антитілами, які виявляються в крові починаючи з 3-ої доби від появи висипки (IgM) та через 2-2.5 тижні після моменту інфікування (IgG)
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary">
Тривалість може варіюватися
</Button>
<Button size="small" color="primary">
100 грн  за кожен вид антитіл
</Button>
</CardActions>
</Card>
<Card className={classes.rot}>
<CardActionArea>
<CardMedia
component="img"
alt="Contemplative Reptile"
height="280"
image={require('./image4.jpg')}
title="Contemplative Reptile"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
РОЗГОРНУТИЙ АНАЛІЗ КРОВІ
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Розгорнутий (загальний, клінічний) аналіз крові (ЗАК). Автоматизований аналіз з формулою (16 показників) + Швидкість осідання еритроцитів (ШОЕ, РОЕ) + Лейкоцитарна формула (ручний підрахунок)
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary">
Тривалість може варіюватися
</Button>
<Button size="small" color="primary">
110 грн
</Button>
</CardActions>
</Card>
<Card className={classes.rot}>
<CardActionArea>
<CardMedia
component="img"
alt="Contemplative Reptile"
height="280"
image={require('./image5.jpg')}
title="Contemplative Reptile"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
РОЗГОРНУТИЙ АНАЛІЗ КРОВІ
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Розгорнутий (загальний, клінічний) аналіз крові (ЗАК). Автоматизований аналіз з формулою (16 показників) + Швидкість осідання еритроцитів (ШОЕ, РОЕ) + Лейкоцитарна формула (ручний підрахунок)
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary">
Тривалість може варіюватися
</Button>
<Button size="small" color="primary">
110 грн
</Button>
</CardActions>
</Card>
<Card className={classes.rot}>
<CardActionArea>
<CardMedia
component="img"
alt="Contemplative Reptile"
height="280"
image={require('./image6.jpg')}
title="Contemplative Reptile"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
РОЗГОРНУТИЙ АНАЛІЗ КРОВІ
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Розгорнутий (загальний, клінічний) аналіз крові (ЗАК). Автоматизований аналіз з формулою (16 показників) + Швидкість осідання еритроцитів (ШОЕ, РОЕ) + Лейкоцитарна формула (ручний підрахунок)
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary">
Тривалість може варіюватися
</Button>
<Button size="small" color="primary">
110 грн
</Button>
</CardActions>
</Card>


          </GridList>
        </Grid>
        <Grid item md={1}/>
      </Grid>
      <Grid container style={{marginTop: 10}} spacing={8}>
        <Grid item md={1}/>
        <Grid item md={10}>
          <GridList cellHeight={100} cols={12} spacing={1} className={classes.gridList}>
            {array.map((tile, i) => (
              <GridListTile key={i} cols={3} rows={4} style={{padding: 5}}>
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
  rot: {
    maxWidth: 500,
  },
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
  withState('search', 'toggleSearch', false),
  lifecycle({
    componentDidMount() {
      this.props.getEvents();
    },
  }),
)(Events);
