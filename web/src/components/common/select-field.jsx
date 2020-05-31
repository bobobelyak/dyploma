import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core';

const muiTheme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        '&$focused': {
          color: 'sandybrown',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          color: 'sandybrown',
          borderColor: 'sandybrown',
        },
        '&$notchedOutline': {
          borderColor: 'sandybrown',
        },
      },
    },
  },
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
  underline: {
    borderBottomColor: 'sandybrown',
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
    marginTop: 0,
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

const SelectField = props => {
  const {input, data, classes, style, value} = props;

  return (
    <Select
      classes={{root: classes.inputRoot}}
      style={style}
      value={value}
      input={<Input style={{borderBottomColor: 'sandybrown'}} classes={{
        underline: classes.underline,
      }}/>}
      {...input}
    >
      {data.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default withStyles(styles)(SelectField);
