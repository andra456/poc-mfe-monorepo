import React from 'react';
import loadable from '@loadable/component';

const Component = loadable(() => import(/* webpackChunkName: "view-report" */ './viewsAuth'));
export default Component;
