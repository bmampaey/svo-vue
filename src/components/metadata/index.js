// TODO move the import outside index otherwise they will always get imported
export default {
	generic: () => import(/* webpackChunkName: "Generic" */ './Generic'),
	'AIA level 1': () => import(/* webpackChunkName: "AiaLevel1" */ './AiaLevel1')
};
