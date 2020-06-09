import React from 'react';
import Text from '@material-ui/core/TextField';
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

const TextField = props => {
  const {input, label, type, placeholder, autoFocus, required, style, variant, InputProps} = props;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Text
        autoFocus={autoFocus}
        required={required}
        style={style ? style : {width: '100%'}}
        label={label}
        variant={variant ? variant : 'outlined'}
        placeholder={placeholder}
        type={type}
        InputProps={InputProps}
        {...input}
      />
    </MuiThemeProvider>
  );
};

export default withStyles({}, {withTheme: true})(TextField);
