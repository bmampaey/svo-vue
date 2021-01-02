import Generic from './Generic';

export default {
	generic: Generic,
	aia_lev1: () => import(/* webpackChunkName: "AiaLev1" */ './AiaLev1')
};
