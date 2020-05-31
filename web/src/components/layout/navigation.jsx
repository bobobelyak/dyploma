import React from 'react';
import Button from '@material-ui/core/Button/Button';
import {Link} from 'react-router-dom';
import {Translations} from '../../translations';

export const Navigation = props => {
  const {white} = props;

  return (
    <React.Fragment>
      <Button style={{color: white ? 'white' : 'black'}} component={Link} to="/">{Translations.navbar.main}</Button>
      <Button style={{color: white ? 'white' : 'black'}} component={Link} to="/feeds">{Translations.navbar.feeds}</Button>
      <Button style={{color: white ? 'white' : 'black'}} component={Link} to="/sights">{Translations.navbar.sights}</Button>
      <Button style={{color: white ? 'white' : 'black'}} component={Link} to="/events">{Translations.navbar.events}</Button>
      <Button style={{color: white ? 'white' : 'black'}} component={Link} to="/tours">{Translations.navbar.createRoute}</Button>
      <Button style={{color: white ? 'white' : 'black'}} component={Link} to="/create-place">{Translations.navbar.createPlace}</Button>
    </React.Fragment>
  );
};

