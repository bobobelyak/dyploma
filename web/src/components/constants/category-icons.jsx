import React from 'react';
import RestaurantImg from '../../../public/icons/municipal.png';
import PizzeriaImg from '../../../public/icons/clinic.png';



export const iconCategories = {
  restaurant: {
    label: 'Municipal',
    icon: <img src={RestaurantImg} style={{width: 40, height: 40}}/>,
  },
};

export const iconSubCategories = {
  pizzeria: {
    label: 'Clinic',
    icon: <img src={PizzeriaImg} style={{width: '100%', height: '100%'}}/>,
  },
};
