import React from 'react';
import RestaurantImg from '../../../public/icons/cutlery.svg';
import PizzeriaImg from '../../../public/icons/pizza.svg';

export const iconCategories = {
  restaurant: {
    label: 'Restaurant',
    icon: <img src={RestaurantImg} style={{width: 40, height: 40}}/>,
  },
};

export const iconSubCategories = {
  pizzeria: {
    label: 'Pizzeria',
    icon: <img src={PizzeriaImg} style={{width: '80%', height: '80%'}}/>,
  },
};
