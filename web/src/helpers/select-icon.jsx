import React from 'react';
import PizzaIcon from '../../public/icons/pizza.svg';

const Icon = ({icon, name, all}) => (
  <div style={{display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', padding: 5, borderRadius: 10}}>
    <img src={icon} style={{width: all ? 20 : 30, height: all ? 20 : 30}}/>
    <span style={{fontSize: all ? '1em' : '1.2em', marginLeft: 5, color: 'white'}}>{name}</span>
  </div>
);

export const CategoryIcon = ({category, all}) => {
  switch (category) {
    case 'pizza': {
      return <Icon icon={PizzaIcon} name="Pizzeria" all={all}/>;
    }
    default: {
      return null;
    }
  }
};
