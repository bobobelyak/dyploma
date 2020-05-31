import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import LocationIcon from '@material-ui/icons/LocationOn';
import DistanceIcon from '@material-ui/icons/DirectionsWalk';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const TourDetails = props => {
  const {closeModal, open, tour} = props;

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      aria-labelledby="max-width-dialog-title"
      onClose={closeModal}
    >
      <DialogContent style={{minHeight: '80vh', overflowY: 'scroll'}}>
        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
          <span style={{justifyContent: 'flex-start', flex: 1, display: 'flex', alignItems: 'center', marginLeft: 20}}>
            <Typography variant="h2">{tour.name}</Typography>
          </span>
          {tour.type === 2 && <span style={{justifyContent: 'flex-end', flex: 1, display: 'flex', alignItems: 'center', marginRight: 20}}>
            <span style={{color: 'sandybrown', fontSize: '2em'}}>{tour.price} <span style={{fontWeight: 'lighter'}}>UAH</span>
              <p style={{display: 'flex', justifyContent: 'center'}}>
                <a target="_blank" href={tour.contactUrl}>
                  <Button size="small" variant="contained" color="primary" style={{background: 'sandybrown', boxShadow: 'none', width: 80}}>
                  order
                  </Button>
                </a>
              </p>
            </span>
          </span> }
          {tour.type === 1 && <span style={{justifyContent: 'flex-end', flex: 1, display: 'flex', alignItems: 'center', marginRight: 20}}>
            <span style={{color: 'sandybrown'}}> {tour.contactPhone}
              <p>
                <a target="_blank" href={tour.contactUrl}>Contact</a>
              </p>
            </span>
          </span> }
        </div>
        <div style={{height: 100, padding: 30}}><Typography style={{height: 100}} variant="body1">{tour.tourDescription}</Typography></div>
        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
          <span style={{justifyContent: 'flex-start', flex: 1, display: 'flex', alignItems: 'center', marginLeft: 50}}>
            <LocationIcon style={{width: 60, height: 60, color: 'sandybrown'}}/>
            <span style={{color: 'sandybrown', fontSize: '2em'}}>{tour.routes.length}
              <p style={{textTransform: 'uppercase', fontWeight: 'lighter', fontSize: '0.5em'}}>sights</p>
            </span>
          </span>
          <span style={{justifyContent: 'center', flex: 1, display: 'flex', alignItems: 'center'}}>
            <AlarmIcon style={{width: 60, height: 60, color: 'sandybrown'}}/>
            <span style={{color: 'sandybrown', fontSize: '2em'}}>{Math.floor(tour.routes.reduce((a, b) => a + (b.duration || 0), 0))}
              <p style={{textTransform: 'uppercase', fontWeight: 'lighter', fontSize: '0.5em'}}>minutes</p>
            </span>
          </span>
          <span style={{justifyContent: 'flex-end', flex: 1, display: 'flex', alignItems: 'center', marginRight: 50}}>
            <DistanceIcon style={{width: 60, height: 60, color: 'sandybrown'}}/>
            <span style={{color: 'sandybrown', fontSize: '2em'}}>{Math.floor(tour.routes.reduce((a, b) => a + (b.distance || 0), 0))}
              <p style={{textTransform: 'uppercase', fontWeight: 'lighter', fontSize: '0.5em'}}>meters</p>
            </span>
          </span>
        </div>
        <VerticalTimeline className="vertical-timeline">
          {
            tour.routes.map((place, i) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{background: 'rgb(33, 150, 243)', color: 'sandybrown'}}
                date={i + 1}
                icon={<Avatar style={{height: '100%', width: '100%'}} src={place.imgUrl}/>}
              >
                <h3 className="vertical-timeline-element-title">{place.name}</h3>
                <h4 className="vertical-timeline-element-subtitle">{place.street}</h4>
                <p>
                  {place.placeDescription}
                </p>
              </VerticalTimelineElement>
            ))
          }
        </VerticalTimeline>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => ({
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),

)(TourDetails);
