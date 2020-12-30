import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/authentication",
		name: "Authentication",
		component: () => import("@/views/Authentication.vue")
	},
	{
		path: "/datasets",
		name: "Datasets",
		component: () => import("@/views/Datasets.vue")
	},
	{
		path: "/data_selections",
		name: "DataSelections",
		component: () => import("@/views/DataSelections.vue")
	},
	{
		path: "/hek_events",
		name: "HekEvents",
		component: () => import("@/views/HekEvents.vue")
	},
	// redirect all other routes to dataset
	{
		path: "*",
		name: "NotFound",
		component: () => import("@/views/NotFound.vue")
	}
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
