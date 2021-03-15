import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.config.productionTip = false;
Vue.use(mavonEditor);
new Vue({
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
