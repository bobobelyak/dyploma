import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import {Link} from 'react-router-dom';
import {setTourTab} from '../../store/reducers/tabs';
import {clearRoutes} from '../../store/reducers/create-route';
import Tabs from '../common/tabs';
import {clearTop} from '../../store/reducers/places';
import {AuthService} from '../../helpers/auth-service';
import loginToCreateImg from '../../../public/images/login-to-create.png';
import Typography from '@material-ui/core/Typography';
import RouteItems from './route-items';
import UserTours from './user-tours';
import Create from './create';
import Tours from './tours';

const tabs = ['Список'];

const CreateRoute = props => {
  const {tourTab, setTourTab, location} = props;

  return (
    <Grid container style={{height: '100%'}}>
      <Grid item md={8} style={{height: '100%'}}>
        <Paper style={{boxShadow: 'none', borderLeft: '1px solid #ddd', height: '100%', width: '100%', borderRadius: 0}}>
          {
            <React.Fragment>
                <Tabs tabLabels={tabs} value={tourTab} changeTab={setTourTab}/>

              </React.Fragment>
          }
        </Paper>

      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  tourTab: state.tabs.tourTab,
});

export default compose(
  connect(mapStateToProps, {setTourTab, clearTop, clearRoutes}),
  lifecycle({
    componentWillUnmount() {
      this.props.clearRoutes();
      this.props.clearTop();
    },
  }),
)(CreateRoute);
