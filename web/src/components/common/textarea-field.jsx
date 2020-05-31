import React from 'react';
import TextField from '@material-ui/core/TextField';
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
