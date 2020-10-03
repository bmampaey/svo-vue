import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/authentication",
		name: "Authentication",
		component: () => import("../views/Authentication.vue")
	},
	{
		path: "/datasets",
		name: "Datasets",
		component: () => import("../views/Datasets.vue")
	},
	{
		path: "/data_selections",
		name: "DataSelections",
		component: () => import("../views/DataSelections.vue")
	},
	{
		path: "/events",
		name: "Events",
		component: () => import("../views/Events.vue")
	},
	// redirect all other routes to dataset
	{ path: "*", redirect: "/datasets" }
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

// TODO remove
var isAuthenticated = true;

router.beforeEach((to, from, next) => {
	if (to.name !== "Authentication" && !isAuthenticated) next({ name: "Authentication" });
	else next();
});

export default router;
