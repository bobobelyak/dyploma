import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxField = props => {
  const {input} = props;

  return (
    <Checkbox
      style={{color: 'sandybrown'}}
      checked={input.value}
      onChange={input.onChange}
    />
  );
};

export default CheckboxField;
