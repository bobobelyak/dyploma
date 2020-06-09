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
          color: '#4b9635',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          color: '#4b9635',
          borderColor: '#4b9635',
        },
        '&$notchedOutline': {
          borderColor: '#4b9635',
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
    borderBottomColor: '#4b9635',
    '&:after': {
      borderBottomColor: '#4b9635',
    },
    '&:hover': {
      borderBottomColor: '#4b9635',
    },
    '&:before': {
      borderBottomColor: '#4b9635',
    },
    '&:hover:before': {
      borderBottomColor: '#4b9635',
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
      input={<Input style={{borderBottomColor: '#4b9635'}} classes={{
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
