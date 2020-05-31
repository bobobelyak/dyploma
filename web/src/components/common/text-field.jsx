import React from 'react';
import Text from '@material-ui/core/TextField';
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
