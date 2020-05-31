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

const tabs = ['Suggested', 'Paid', 'Your routes'];

const CreateRoute = props => {
  const {tourTab, setTourTab, location} = props;

  return (
    <Grid container style={{height: '100%'}}>
      <Grid item md={4} style={{display: 'flex', justifyContent: 'center'}}>
        <div className="timeline">
          <RouteItems/>
        </div>
      </Grid>
      <Grid item md={8} style={{height: '100%'}}>
        <Paper style={{boxShadow: 'none', borderLeft: '1px solid #ddd', height: '100%', width: '100%', borderRadius: 0}}>
          {
            location.pathname === '/create-tour' ? <Create/> :
            <React.Fragment>
                <Tabs tabLabels={tabs} value={tourTab} changeTab={setTourTab}/>
                {
                  tourTab === 0 && <Tours tourType={1} md={6} moreDetails/>
                }
                {
                  tourTab === 1 && <Tours tourType={2} md={6} moreDetails paid/>
                }
                {
                  tourTab === 2 &&
                  (
                    AuthService.tokenExists() ?
                      <React.Fragment>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                          <Button component={Link} to="/create-tour" style={{color: 'sandybrown', fontWeight: 'lighter'}}><AddIcon
                            style={{fontSize: '1.3em', color: 'sandybrown', paddingRight: 5}}/> Plan your own tour
                          </Button>
                        </div>
                        <UserTours/>
                      </React.Fragment> :
                      <Grid container justify="center" direction="column" alignContent="center" style={{height: '70%'}}>
                        <Typography style={{fontFamily: `'Pangolin', cursive`, color: 'sandybrown'}} variant="h2">Login to create</Typography>
                        <Typography style={{fontFamily: `'Pangolin', cursive`, color: 'sandybrown'}} variant="h2">own tours</Typography>
                        <Button>Login</Button>
                      </Grid>
                  )
                }
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
