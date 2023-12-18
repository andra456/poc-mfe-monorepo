import loadable from '@loadable/component';
import React from 'react';

const Component = loadable(() => import(/* webpackChunkName: "view-report" */ './BilingualViews'));

const config = {
  path: '/multilang',
  isLayout: true,
  keyIndex: 'multilang',
  element: <Component />,
};
export default config;
