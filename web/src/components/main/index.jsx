import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Place from './place';

const SideBar = props => {
  const {place} = props;

  return (
    <Grid container style={{
      // Position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
      height: '100%',
    }}
    >
      <Grid item md={12} style={{height: '100%'}}>
        {
          place && <Place {...{place}}/>
        }
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  place: state.placesState.place,
});

export default connect(mapStateToProps)(SideBar);
