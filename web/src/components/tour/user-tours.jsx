import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, branch, renderComponent} from 'recompose';
import {Grid} from '@material-ui/core';
import Loader from '../common/loader';
import {getTours} from '../../store/reducers/user';
import {setTour} from '../../store/reducers/create-route';
import noRoutesImg from '../../../public/images/no-routes.png';
import ToursList from './tours-list';

const UserTours = props => {
  const {tours} = props;


  if (tours.length === 0) {
    return (
      <Grid container justify="center" alignContent="center" style={{width: '100%', height: '50%'}}>
        <img src={noRoutesImg} width={400} height={400}/>
      </Grid>
    );
  }

  return (
    <ToursList {...props}/>
  );
};

const mapStateToProps = state => ({
  tours: state.user.tours,
  loadingTours: state.user.loadingTours,
  tourId: state.createRoute.tourId,
});

export default compose(
  connect(mapStateToProps, {getTours, setTour}),
  lifecycle({
    async componentDidMount() {
      await this.props.getTours();
    },
  }),
  branch(
    ({loadingTours}) => loadingTours,
    renderComponent(UserTours),
    renderComponent(Loader),
  ),
)(UserTours);
