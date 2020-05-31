import React from 'react';
import {compose, lifecycle, branch, renderComponent} from 'recompose';
import {connect} from 'react-redux';
import {getTours, setTour} from '../../store/reducers/create-route';
import Loader from '../common/loader';
import ToursList from './tours-list';

const Tours = props => {

  return (
    <ToursList {...props}/>
  );
};

const mapStateToProps = state => ({
  loadingTours: state.createRoute.loadingTours,
  tours: state.createRoute.tours,
});

export default compose(
  connect(mapStateToProps, {getTours, setTour}),
  lifecycle({
    async componentDidMount() {
      await this.props.getTours(this.props.tourType);
    },
  }),
  branch(
    ({loadingTours}) => loadingTours,
    renderComponent(Tours),
    renderComponent(Loader),
  ),
)(Tours);
