import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AlarmIcon from '@material-ui/icons/Alarm';
import LocationIcon from '@material-ui/icons/LocationOn';
import {withStyles} from '@material-ui/core';
import TourDetails from './tour-details-dialog';

const ToursList = props => {
  const {classes, tours, setTour, tourId, md = 3, paid, moreDetails, modal, openModal} = props;
  return (
    <CardContent>
      {
        modal.open &&
          <TourDetails
            open={modal.open}
            closeModal={openModal}
            tour={modal.tour}
          />
      }
      <Grid container spacing={24}>
        {
          tours.map(tour => (
            <Grid key={tour._id} item md={md}>
              <div style={{position: 'absolute', padding: 5}}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  width: '100%',
                  padding: 5,
                  borderRadius: 10,
                }}
                >
                  <AlarmIcon style={{width: 20, height: 20, color: '#4b9635'}}/>
                  <span style={{
                    fontSize: '0.9em',
                    marginLeft: 5,
                    color: 'white',
                  }}
                  >{Math.floor(tour.routes.reduce((a, b) => a + (b.duration) || 0, 0))} min
                  </span>
                </div>
              </div>
              <div style={{position: 'absolute', padding: 5, marginTop: 35}}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  width: '100%',
                  padding: 5,
                  borderRadius: 10,
                }}
                >
                  <LocationIcon style={{width: 20, height: 20, color: '#4b9635'}}/>
                  <span style={{fontSize: '0.9em', marginLeft: 5, color: 'white'}}>{tour.routes.length}</span>
                </div>
              </div>
              <Card onClick={() => setTour(tour.routes, tour._id)} className={classes.card} style={{height: moreDetails && 355}}>
                <CardMedia
                  component="img"
                  src={tour.routes[0].imgUrl}
                  alt="Contemplative Reptile"
                  className={classes.media}
                  height="140"
                  title="Contemplative Reptile"
                />
                <CardContent className={classnames(classes.cardContent, {[classes.selected]: tour._id === tourId})}>
                  <Typography gutterBottom variant="h2" style={{fontSize: '1.2em'}}>
                    {tour.name}
                  </Typography>
                  {moreDetails &&
                  <Typography variant="h2" gutterBottom
                    style={{fontSize: '0.8em', marginTop: 10, marginBottom: 10}}
                  >
                    {tour.tourDescription && tour.tourDescription.slice(0, 230)} {tour.tourDescription && tour.tourDescription.length > 230 && '...'}
                  </Typography>}
                  <Typography variant="h2" gutterBottom style={{fontSize: '0.8em'}}>
                        Distance:
                    <strong style={{color: '#4b9635'}}>
                      {Math.floor(tour.routes.reduce((a, b) => a + (b.distance) || 0, 0))} m
                    </strong>
                  </Typography>
                  {moreDetails &&
                  <Typography
                    style={{color: '#4b9635', marginTop: 10, cursor: 'pointer', display: 'inline-block'}}
                    variant="button"
                    onClick={() => openModal(tour)}
                  >
                        More info
                  </Typography>
                  }
                  {
                    paid &&
                    <Typography
                      style={{
                        fontSize: '1.5em',
                        color: '#4b9635',
                        marginTop: 10,
                        cursor: 'pointer',
                        display: 'inline-block',
                        float: 'right',
                      }}
                      variant="button"
                    >
                      {tour.price} <span style={{fontSize: '0.5em', fontWeight: 'lighter'}}>UAH</span>
                    </Typography>
                  }
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </CardContent>
  );
};

const styles = theme => ({
  card: {
    borderRadius: 0,
  },
  cardContent: {
    padding: 12,
  },
  selected: {
    borderBottom: '3px solid #4b9635',
  },
  titleBar: {
    background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  subtitle: {
    fontWeight: 'lighter',
  },
  badge: {
    backgroundColor: 'transparent',
    color: 'white',
    top: '105%',
    right: 0,
    // The border color match the background color.
    // border: `2px solid white`,
  },
  media: {
    cursor: 'pointer',
    // Width: '100%',
    // height: '100%',
    objectFit: 'cover',
  },
});
export default compose(
  withStyles(styles),
  withState('modal', 'toggleModal', {open: false, tour: {}}),
  withHandlers({
    openModal: ({modal, toggleModal}) => tour => toggleModal({open: !modal.open, ...(tour && {tour})}),
  }),
)(ToursList);
