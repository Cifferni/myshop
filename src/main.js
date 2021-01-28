import Vue from "vue";
import App from "@/App"; //@表示src的路径
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from '@/store'

Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
