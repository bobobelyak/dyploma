import React from 'react';
import {Field} from 'redux-form';
import Grid from '@material-ui/core/Grid/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '../common/text-field';
import TextAreaField from '../common/textarea-field';
import UA from '../../../public/icons/ukraine.svg';
import EN from '../../../public/icons/united-kingdom.svg';

const Information = props => {
  const {} = props;

  return (
    <Grid container style={{width: '100%', marginTop: 10}} spacing={8}>
      <Grid item md={6}>
        <Grid container style={{width: '100%'}} justify="center">
          <Field
            label={<div><img src={UA} width={13} height={13}/>  Назва</div>}
            name="uaName"
            component={TextField}
          />
          <Field
            label={<div><img src={UA} width={13} height={13}/>  Опис</div>}
            rows={10}
            name="uaDescription"
            component={TextAreaField}
          />
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Grid container style={{width: '100%'}} justify="center">
          <Field
            label={<div><img src={EN} width={13} height={13}/>  Name</div>}
            name="enName"
            component={TextField}
          />
          <Field
            label={<div><img src={EN} width={13} height={13}/>  Description</div>}
            rows={10}
            name="enDescription"
            component={TextAreaField}
          />
        </Grid>
      </Grid>
      <Divider style={{width: '100%', marginTop: 20, marginBottom: 20}}/>
      <Grid item md={5}>
        <Field
          label={<div><img src={UA} width={13} height={13}/>  Вулиця</div>}
          name="uaStreet"
          component={TextField}
        />
      </Grid>
      <Grid item md={5}>
        <Field
          label={<div><img src={EN} width={13} height={13}/>  Street</div>}
          name="enStreet"
          component={TextField}
        />
      </Grid>
      <Grid item md={2}>
        <Field
          label="№"
          name="buildingNumber"
          component={TextField}
          type="number"
        />
      </Grid>
    </Grid>
  );
};

export default Information;
