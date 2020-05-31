import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, withState} from 'recompose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import Divider from '@material-ui/core/Divider/Divider';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Card from '@material-ui/core/Card/Card';
import {withStyles} from '@material-ui/core/styles';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const PreviewModal = props => {
  const {data, classes, onClose, open, selectedLanguage, setLanguage, handleSubmit} = props;

  const sightInfo = {
    ua: {
      name: data.uaName,
      street: data.uaStreet,
      description: data.uaDescription,
    },
    en: {
      name: data.enName,
      street: data.enStreet,
      description: data.enDescription,
    },
  }[selectedLanguage];

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      aria-labelledby="max-width-dialog-title"
      onClose={onClose}
    >
      {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
      <DialogContent>
        <Grid container spacing={16} style={{minHeight: '90vh'}}>
          <Grid item md={4}>
            <Card className={classes.card}>
              <CardMedia
                // OnClick={turnMoreInfo}
                className={classes.media}
                image={data.image.imageUrl}
                title="Paella dish"
              />
              <CardHeader
                action={
                  <span>
                    <img onClick={() => setLanguage('ua')} src={UA} width={20} height={20} className={selectedLanguage === 'ua' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
                    <img onClick={() => setLanguage('en')} src={EN} width={20} height={20} className={selectedLanguage === 'en' ? 'selected-language' : 'selected-language-inactive selected-language'}/>
                  </span>
                }
                title={sightInfo.name}
                subheader={sightInfo.street}
              />
              <Divider variant="middle"/>
              <CardContent>
                <Typography component="p">
                  {sightInfo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            {/* <Reviews/> */}
          </Grid>
          <Grid item md={4}>
                You can set my maximum width and whether to adapt or not.
                You can set my maximum width and whether to adapt or not.
                You can set my maximum width and whether to adapt or not.
                You can set my maximum width and whether to adapt or not.
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="center" alignItems="center">
          <Button onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" style={{backgroundColor: 'sandybrown', width: 100, height: 40}}>
            Create
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default compose(
  withStyles(styles),
  withState('selectedLanguage', 'setLanguage', localStorage.getItem('language')),
)(PreviewModal);
