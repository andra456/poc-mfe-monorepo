import loadable from '@loadable/component';
import React from 'react';
const Dashboard = loadable(() => import(/* webpackChunkName: "view-report" */ './HomeViews'));
const config = {
  path: '/dashboard',
  isLayout: true,
  keyIndex: 'state',
  element: <Dashboard />,
};
export default config;
