import loadable from '@loadable/component';

const Component = loadable(() => import(/* webpackChunkName: "view-report" */ './viewsPreview'));
export default Component;
