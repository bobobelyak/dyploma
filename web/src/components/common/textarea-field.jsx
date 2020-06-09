import React from 'react';
import TextField from '@material-ui/core/TextField';
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

const TextareaField = props => {
  const {label, input, rows, variant, style, onChange} = props;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <TextField
        multiline
        label={label}
        onChange={onChange}
        {...input}
        rows={rows}
        style={{width: '100%', marginTop: 20, ...style}}
        variant={variant || 'outlined'}
      />
    </MuiThemeProvider>
  );
};

export default withStyles({}, {withTheme: true})(TextareaField);
