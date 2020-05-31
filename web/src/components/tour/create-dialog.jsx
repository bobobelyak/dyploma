import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose, withState, withHandlers} from 'recompose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import SelectField from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import {tours} from '../../api/tour';
import {setTourTab} from '../../store/reducers/tabs';
import DescriptionField from '../common/textarea-field';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';
import {setTourDescription} from '../../store/reducers/create-route';

const types = [
  {value: 1, label: 'Suggested'},
  {value: 2, label: 'Paid'},
];

const CreateDialog = props => {
  const {size, open, onClose, classes, name, routeList, history, user, textInput, setValue, setTourDescription} = props;

  const isAdmin = user.role === 'admin' || user.role === 'moderator';

  const createTour = async e => {
    e.preventDefault();

    if (textInput.type > 0) {
      const {name, price, type, tourDescription, contactPhone, contactUrl} = textInput;
      const response = await tours.create({name, routeList, price, type, tourDescription, contactPhone, contactUrl});
      if (response.status === 200) {
        setTourTab(e, 2);
        history.push('/tours');
      }
    } else {
      const response = await tours.create({name, routeList});
      if (response.status === 200) {
        setTourTab(e, 2);
        history.push('/tours');
      }
    }
  };

  const changeInfo = name => e => setValue({...textInput, [name]: e.target.value});
  const setDescription = (routeId, language) => e => setTourDescription(routeId, language, e.target.value);

  return (
  // TODO CREATE ONE TEXT INPUT COMPONENT EDIT STYLES
    <Dialog
      fullWidth
      maxWidth={size}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <form onSubmit={createTour}>
        {
          console.log(textInput)
        }
        <DialogContent style={{overflowY: 'scroll'}}>
          <Grid container justify="center" alignItems="center" direction="column">
            <TextField
              onChange={changeInfo('name')}
              value={textInput.name}
              autoFocus
              style={{width: isAdmin ? '50%' : '100%', marginRight: 5}}
              variant="standard"
              placeholder="Tour Name"
              required
              InputProps={{
                classes: {underline: classes.underline, root: classes.inputRoot},
              }}
            />
            <div>
              <SelectField
                onChange={changeInfo('type')}
                value={textInput.type}
                style={{width: '49%', display: 'inline-block'}}
                input={<Input style={{borderBottomColor: 'sandybrown'}} classes={{
                  underline: classes.underline, root: classes.inputRoot,
                }}/>}
              >
                {types.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </SelectField>
              <TextField
                onChange={changeInfo('price')}
                value={textInput.price}
                style={{width: '49%', display: 'inline-block', marginLeft: 3}}
                variant="standard"
                placeholder="Price"
                required
                InputProps={{
                  classes: {underline: classes.underline, root: classes.inputRoot},
                }}
              />
            </div>
            <TextField
              onChange={changeInfo('tourDescription')}
              value={textInput.tourDescription}
              multiline
              autoFocus
              style={{width: '50%'}}
              variant="standard"
              placeholder="Tour Description"
              required
              rows={4}
              InputProps={{
                classes: {underline: classes.underline, root: classes.inputRoot},
              }}
            />
            <div>
              <TextField
                onChange={changeInfo('contactPhone')}
                value={textInput.contactPhone}
                style={{width: '49%', display: 'inline-block', marginLeft: 3}}
                variant="standard"
                placeholder="Contact Phone"
                required
                InputProps={{
                  classes: {underline: classes.underline, root: classes.inputRoot},
                }}
              />
              <TextField
                onChange={changeInfo('contactUrl')}
                value={textInput.contactUrl}
                style={{width: '49%', display: 'inline-block', marginLeft: 3}}
                variant="standard"
                placeholder="Contact Url"
                required
                InputProps={{
                  classes: {underline: classes.underline, root: classes.inputRoot},
                }}
              />
            </div>
            {
              routeList.map(place => (
                <Grid key={place._id} container spacing={8} justify="center" alignItems="center">
                  <Grid item md={2}>
                    <Grid container justify="center" alignItems="center" direction="column">
                      <Avatar src={place.imgUrl} style={{width: 65, height: 65}}/>
                      <Typography>{place.name}</Typography>
                      <Typography variant="h2" style={{fontSize: '0.7em'}}>{place.street}, {place.buildingNumber}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item md={4}>
                    <DescriptionField
                      onChange={setDescription(place._id, 'en')}
                      label={<div><img src={EN} width={13} height={13}/> Description</div>}
                      rows={4}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <DescriptionField
                      onChange={setDescription(place._id, 'ua')}
                      label={<div><img src={UA} width={13} height={13}/> Опис</div>}
                      rows={4}
                    />
                  </Grid>
                </Grid>))
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" style={{color: 'grey'}}>
          Close
          </Button>
          <Button type="submit" color="primary" variant="contained" style={{backgroundColor: 'sandybrown'}}>
          Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>);
};

const styles = theme => ({
  underline: {
    '&:after': {
      borderBottomColor: 'sandybrown',
    },
    '&:hover': {
      borderBottomColor: 'sandybrown',
    },
    '&:before': {
      borderBottomColor: 'sandybrown',
    },
    '&:hover:before': {
      borderBottomColor: 'sandybrown',
    },
  },
  inputRoot: {
    backgroundColor: 'white',
    paddingTop: 10,
    borderRadius: 0,
    '&:focused': {
      backgroundColor: '#fcfcfc',
    },
    '&:hover': {
      backgroundColor: '#fcfcfc',
    },
    '&:blur': {
      backgroundColor: '#fcfcfc',
    },
  },
});

const mapStateToProps = state => ({
  routeList: state.createRoute.routeList,
  user: state.authentication.user,
});

export default compose(
  withState('textInput', 'setValue', {
    name: '',
    price: 0,
    type: types[0].value,
  }),
  connect(mapStateToProps, {setTourDescription}),
  withRouter,
  withStyles(styles),
)(CreateDialog);
