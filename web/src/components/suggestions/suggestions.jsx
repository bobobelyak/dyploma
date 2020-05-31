import React from 'react';
import {connect} from 'react-redux';
import {compose, withState, withHandlers} from 'recompose';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {updatePlace, removePlace, confirmPlace} from '../../store/reducers/places';
import {utcFormat} from '../../helpers/convert-time';
import ConfirmationModal from '../common/confirmation-modal';
import PreviewModal from './preview-modal';

const styles = theme => ({
  card: {
    display: 'flex',
    height: 150,
    borderRadius: 0,
    marginBottom: 16,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    height: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '30%',
    cursor: 'pointer',
  },
});

const language = localStorage.getItem('language');

const SuggestionCard = props => {
  const {item, togglePreview, setCoordinates, classes, toggleConfirmation, user} = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        onClick={() => setCoordinates([item.longitude, item.latitude])}
        className={classes.cover}
        image={item.imgUrl}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {item.en && item[language].name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${item.en && item[language].street}, ${item.buildingNumber}`}
          </Typography>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={() => togglePreview(item)} size="small" variant="contained" color="primary" style={{backgroundColor: 'sandybrown', boxShadow: 'none'}}>
              Preview
            </Button>
            <Button size="small" onClick={() => toggleConfirmation('confirm', item._id)}>
              Confirm
            </Button>
            {user.role === 'admin' && <Button size="small" onClick={() => toggleConfirmation('remove', item._id)} color="secondary">
              Delete
            </Button>}
          </div>
          <Typography style={{fontSize: '0.5em', marginTop: 5}} variant="subtitle1" color="textSecondary">
            Created by: {item.author.name}
          </Typography>
          <Typography style={{fontSize: '0.5em'}} variant="subtitle1" color="textSecondary">
            Created at: {utcFormat(item.createdAt, 'LLLL')}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

const Suggestions = props => {
  const {data, togglePreview, showPreview, updatePlace, showConfirmation, toggleConfirmation, removePlace, confirmPlace} = props;

  const update = data => {
    updatePlace(data);
  };

  const remove = e => {
    e.preventDefault();
    if (showConfirmation.selectedId) {
      removePlace(showConfirmation.selectedId, toggleConfirmation('remove', ''));
    }
  };

  const confirm = e => {
    e.preventDefault();
    if (showConfirmation.selectedId) {
      confirmPlace(showConfirmation.selectedId, toggleConfirmation('confirm', ''));
    }
  };

  return (
    <React.Fragment>
      {
        showPreview.show &&
        <PreviewModal
          open={showPreview.show}
          onClose={togglePreview}
          data={showPreview.selected}
          onSubmit={update}
        />
      }
      {
        showConfirmation.confirm &&
        <ConfirmationModal
          open={showConfirmation.confirm}
          onClose={() => toggleConfirmation('confirm', '')}
          dialogText="Do you want to confirm?"
          type="confirm"
          acceptFunction={confirm}
        />
      }
      {
        showConfirmation.remove &&
        <ConfirmationModal
          open={showConfirmation.remove}
          onClose={() => toggleConfirmation('remove', '')}
          dialogText="Do you want to remove?"
          type="remove"
          acceptFunction={remove}
        />
      }
      {
        data.map((item, i) => <SuggestionCard key={i} item={item} {...props}/>)
      }
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps, {updatePlace, removePlace, confirmPlace}),
  withStyles(styles),
  withState('showPreview', 'togglePreview', {selected: {}, show: false}),
  withState('showConfirmation', 'toggleConfirmation', {selectedId: '', confirm: false, remove: false}),
  withHandlers({
    togglePreview: ({togglePreview, showPreview}) => selected => togglePreview({selected, show: !showPreview.show}),
    toggleConfirmation: ({toggleConfirmation, showConfirmation}) => (name, id) => toggleConfirmation({...showConfirmation, [name]: !showConfirmation[name], selectedId: id}),
  }),
)(Suggestions);
