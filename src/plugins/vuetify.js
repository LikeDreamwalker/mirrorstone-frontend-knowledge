import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			dark: {
				primary: "#0066FF",
				secondary: "#424242",
				accent: "#B39DDB",
				error: "#FF5252",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FB8C00",
			},
			light: {
				primary: "#0066FF",
				secondary: "#424242",
				accent: "#B39DDB",
				error: "#FF5252",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FB8C00",
			},
		},
	},
});
