import loadable from '@loadable/component';
import React from 'react';

const Component = loadable(() => import(/* webpackChunkName: "view-report" */ './AuthViews'));

const config = {
  path: '/auth',
  isLayout: false,
  keyIndex: 'auth',
  element: <Component />,
};
export default config;
