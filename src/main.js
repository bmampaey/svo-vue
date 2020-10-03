import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import "./components/globals";
import { formatDate } from "./utils";
import "@/services/hek";
import "@/services/sda";

Vue.config.productionTip = false;

Vue.filter("dateFormat", formatDate);

window.vue = new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
