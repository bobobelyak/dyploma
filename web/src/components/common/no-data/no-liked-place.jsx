import React from 'react';

import Typography from '@material-ui/core/Typography';
import Lottie from 'react-lottie';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  subtitle: {
    fontSize: '1em',
    color: '#898989',
  },
  settingIcon: {
    marginTop: 10,
    marginRight: 5,
    color: '#898989',
  },
});

const NoLikedPlace = props => {
  const {classes} = props;

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{height: '70%'}}
    >
      <Typography className={classes.subtitle} variant="h2" gutterBottom>
          You have not liked posts yet
      </Typography>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: require('../../../animations/location.json'),
        }}
        height={300}
        width={300}
        style={{position: 'absolute'}}
      />
      <Typography className={classes.subtitle} variant="h2" gutterBottom>
          Move quickly,
      </Typography><Typography className={classes.subtitle} variant="h2" gutterBottom>
        you must explore a lot of things...
      </Typography>
    </Grid>
  );
};

export default withStyles(styles)(NoLikedPlace);
