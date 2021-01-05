export default {
	generic: () => import(/* webpackChunkName: "Generic" */ './Generic'),
	aia_lev1: () => import(/* webpackChunkName: "AiaLev1" */ './AiaLev1')
};
