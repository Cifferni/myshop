import Vue from "vue";
import App from "@/App"; //@表示src的路径
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from '@/store'
import  '@/mock/mockServer'
import 'swiper/css/swiper.css'
import CarouselMap from '@/components/CarouselMap'
import Pagination from "@/components/Pagination"
import VueLazyload from 'vue-lazyload'
import * as API from '@/api'
import loading from '@/assets/images/loading.jpg'
import { Button,MessageBox,Message } from 'element-ui';
import  '@/utils/validate'
Vue.use(Button)
//第二种组件就和messageBox类型,引入之后不能直接注册,而是挂载vue的原型上使用
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message; //同来做提示消息 ,比alert要好看
//懒加载
// Vue.use(VueLazyload)
// orwith options
Vue.use(VueLazyload, {
  loading,
})
Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component("CarouselMap",CarouselMap)
Vue.component("Pagination",Pagination)

new Vue({
  beforeCreate(){
     Vue.prototype.$bus = this
     Vue.prototype.$API = API
  },
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
