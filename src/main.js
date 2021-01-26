import Vue from "vue";
import App from "@/App"; //@表示src的路径

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  render: (h) => h(App),
});
