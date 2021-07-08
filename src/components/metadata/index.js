export default {
	generic: () => import(/* webpackChunkName: "Generic" */ './Generic'),
	'AIA level 1': () => import(/* webpackChunkName: "AiaLevel1" */ './AiaLevel1')
};
