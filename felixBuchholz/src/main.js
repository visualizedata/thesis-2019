import Vue from "vue";
import App from "./App.vue";
// import "./assets/css/normalize.css";
// import "./assets/css/tooltip.scss";
// import "./assets/css/layout.scss";
// import "./assets/css/checkbox.scss";
// import "./assets/css/input.scss";
// import "./assets/css/colors.scss";
// import "./assets/css/typography.scss";
import "./assets/scss/manifest.scss";

import VShowSlide from 'v-show-slide'
Vue.use(VShowSlide)

import titleMixin from "./mixins/titleMixin";
Vue.mixin(titleMixin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
