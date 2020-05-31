import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import {getPlacesSuggestions, getPlaces} from '../../store/reducers/places';
import {setCoordinates} from '../../store/reducers/map';
import Tabs from '../common/tabs';
import PlacesSuggestions from './suggestions';
import Loader from '../common/loader';

const tabLabels = ['Places', 'Events', 'Feeds'];

const Suggestions = props => {
  const {places, setCoordinates, loadingSuggestions} = props;

  return (
    <Card style={{boxShadow: 'none', borderRadius: 0}}>
      <Tabs {...{tabLabels}}/>
      <CardContent style={{paddingRight: 1}}>
        {loadingSuggestions ? <PlacesSuggestions setCoordinates={setCoordinates} data={places}/> : <Loader />}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  places: state.placesState.places,
  loadingSuggestions: state.placesState.loadingSuggestions,
});

export default compose(
  connect(mapStateToProps, {getPlaces, getPlacesSuggestions, setCoordinates}),
  lifecycle({
    async componentDidMount() {
      await this.props.getPlacesSuggestions();
    },
    async componentWillUnmount() {
      await this.props.getPlaces();
    },
  }),
)(Suggestions);
