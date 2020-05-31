import React from 'react';
import Grid from '@material-ui/core/Grid';
import MapImg from '../../../public/icons/map.svg';
import Typography from '@material-ui/core/Typography';

const Location = props => {
  const {} = props;

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={{height: 400}}>
      <img src={MapImg} width={150} height={150}/>
      <Typography variant="h2" style={{fontSize: '1.3em', marginTop: 20}}>Click on the map to set place location</Typography>
      <Typography variant="h2" style={{fontSize: '1.3em', marginTop: 10}}>than click <span style={{color: 'sandybown', fontWeight: 'bold'}}>next</span> button</Typography>
    </Grid>
  );
};

export default Location;
