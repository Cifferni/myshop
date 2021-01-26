import Vue from "vue";
import App from "@/App"; //@表示src的路径
import router from '@/router'
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
