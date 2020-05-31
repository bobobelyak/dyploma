import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Field} from 'redux-form';
import Checkbox from '../common/checkbox-field';

const Final = props => {
  const {user, openPreviewModal} = props;

  return (
    <Grid container justify="center" alignItems="center" direction="column" style={{height: 400}}>
      <Avatar src={user.avatar} style={{border: '4px solid sandybrown', width: 150, height: 150}}/>
      <Typography variant="h2" style={{fontSize: '1.5em', marginTop: 10}}>{user.name}</Typography>
      <Typography variant="h2" style={{fontSize: '1em', marginTop: 10}}>
        <Field
          name="allowShowName"
          component={Checkbox}
        />
        Allow show your name and link to social media as post creator
      </Typography>
      <Button onClick={openPreviewModal} variant="contained" style={{color: 'white', backgroundColor: 'sandybrown', width: 100, height: 40, marginTop: 30}}>Preview</Button>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user,
});

export default compose(
  connect(mapStateToProps),
)(Final);
