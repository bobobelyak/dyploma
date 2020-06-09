import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxField = props => {
  const {input} = props;

  return (
    <Checkbox
      style={{color: '#4b9635'}}
      checked={input.value}
      onChange={input.onChange}
    />
  );
};

export default CheckboxField;
