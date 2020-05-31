import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import sideImg from '../../../public/images/side-img.jpg';
import instagramIcon from '../../../public/icons/instagram.png';
import googleIcon from '../../../public/icons/google.png';
import {styles} from './styles';

import FacebookButton from './facebook';

const Login = props => {
  const {open, onClose, classes} = props;

  return (
    <div className={classes.root}>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        aria-labelledby="max-width-dialog-title"
        onClose={onClose}
        className={classes.modal}
      >
        <DialogContent style={{padding: '0 0 0 0'}} className={classes.content}>
          <Grid className={classes.container} container spacing={16}>
            <Grid item md={3}>
              <CardMedia
                className={classes.sideImg}
                image={sideImg}
              />
            </Grid>
            <Grid item md={6}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Typography gutterBottom variant="h5" component="h2" style={{marginTop: 30}}>
                Welcome
                </Typography>
                <Typography className={classes.tBody} gutterBottom variant="body1">
                Sign in to create own routes,
                </Typography>
                <Typography className={classes.tBody} gutterBottom variant="body1">
                  make reviews and add comments.
                </Typography>
                <Typography className={classes.tBody} gutterBottom variant="body1">
                  Let`s make something good together!
                </Typography>
                <FacebookButton closeModal={onClose}/>
                <Button variant="outlined" className={classes.button}>
                  <img width={20} hweight={20} src={googleIcon}/>
                  <Typography className={classes.tBody} gutterBottom variant="body1">
                    Sign in with Google
                  </Typography>
                </Button>

                <Button variant="outlined" className={classes.button}>
                  <img width={20} height={20} src={instagramIcon}/>
                  <Typography className={classes.tBody} gutterBottom variant="body1">
                    Sign in with instagram
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <CardMedia
                className={classes.sideImg}
                image={sideImg}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default compose(
  withStyles(styles),
)(Login);
