import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';


const SideBar = () => {

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

    </Grid>
  );
};



export default SideBar;
