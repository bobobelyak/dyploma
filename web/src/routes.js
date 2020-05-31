import React from 'react';

const MoreInfo = React.lazy(() => import('./components/more-info'));
const Tour = React.lazy(() => import('./components/tour'));
const Suggestions = React.lazy(() => import('./components/suggestions'));
const CreatePlace = React.lazy(() => import('./components/create'));
const MainSidebar = React.lazy(() => import('./components/main'));
const Profile = React.lazy(() => import('./components/profile'));
const Feeds = React.lazy(() => import('./components/feeds'));
const SingleFeed = React.lazy(() => import('./components/feeds/single'));
const Sights = React.lazy(() => import('./components/sights'));
const Events = React.lazy(() => import('./components/events'));

export const routes = [
  {
    path: '/',
    exact: true,
    component: MainSidebar,
    secured: false,
  },
  {
    path: '/create-place',
    component: CreatePlace,
    exact: true,
    secured: false,
  },
  {
    path: '/suggestions',
    component: Suggestions,
    exact: true,
    secured: true,
  },
  {
    path: '/sights',
    component: Sights,
    exact: true,
    secured: true,
  },
  {
    path: '/events',
    component: Events,
    exact: true,
    secured: true,
  },
  {
    path: '/profile',
    component: Profile,
    exact: true,
    secured: true,
  },
  {
    path: '/tours',
    component: Tour,
    exact: true,
    secured: false,
  },
  {
    path: '/create-tour',
    component: Tour,
    exact: true,
    secured: false,
  },
  {
    path: '/place/:id',
    component: MoreInfo,
    exact: true,
    secured: false,
  },
  {
    path: '/feeds',
    component: Feeds,
    exact: true,
    secured: false,
  },
  {
    path: '/feed/:id',
    component: SingleFeed,
    exact: true,
    secured: false,
  },
];
