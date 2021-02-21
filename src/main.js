import Vue from "vue";
import App from "@/App"; //@表示src的路径
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from '@/store'
import  '@/mock/mockServer'
import 'swiper/css/swiper.css'
import CarouselMap from '@/components/CarouselMap'
import Pagination from "@/components/Pagination"
import * as API from '@/api'
Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component("CarouselMap",CarouselMap)
Vue.component("Pagination",Pagination)
new Vue({
  beforeCreate(){
     Vue.prototype.$bus = this
     Vue.prototype.API = API
  },
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
