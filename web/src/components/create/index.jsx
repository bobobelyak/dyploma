import React from 'react';
import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import {createPlace, getPlaceCategories} from '../../store/reducers/places';
import Stepper from './stepper';

const CreatePlace = props => {
  const {} = props;


  return (
      <Stepper/>
  );
};

export default compose(
  connect(({placesState: {categories}}) => ({categories}), {getPlaceCategories}),
  lifecycle({
    componentDidMount() {
      this.props.getPlaceCategories();
    },
  }),
)(CreatePlace);
