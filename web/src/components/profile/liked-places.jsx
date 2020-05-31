import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, branch, renderComponent} from 'recompose';
import Loader from '../common/loader';
import {getLikedPlaces} from '../../store/reducers/user';
import {toggleMoreInfo} from '../../store/reducers/more-info';
import NoLikedPlace from '../common/no-data/no-liked-place';
import GridList from '../common/grid-list';

const LikedPlaces = props => {
  const {likedPlaces, classes, toggleMoreInfo, history} = props;

  const goToMoreInfo = place => e => {
    e.stopPropagation();
    toggleMoreInfo();
    history.push(`/place/${place._id}`);
  };

  if (likedPlaces.length === 0) {
    return <NoLikedPlace/>;
  }

  return <GridList data={likedPlaces} cols={2}/>;
};

const mapStateToProps = state => ({
  likedPlaces: state.user.likedPlaces,
  loadingPlaces: state.user.loadingPlaces,
});

export default compose(
  connect(mapStateToProps, {getLikedPlaces, toggleMoreInfo}),
  lifecycle({
    async componentDidMount() {
      await this.props.getLikedPlaces();
    },
  }),
  branch(
    ({loadingPlaces}) => loadingPlaces,
    renderComponent(LikedPlaces),
    renderComponent(Loader),
  ),
)(LikedPlaces);

