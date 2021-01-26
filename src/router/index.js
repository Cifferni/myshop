import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
Vue.use(VueRouter);

const router = new VueRouter({
  mode:"history",
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      //路由对象中的原配置,可以配置我们所需要的任何数据
      meta:{
         isShow:true
      }
    },
    {
      path: "/register",
      component: Register,
      meta:{
        isShow:true
     } 
    },
    {
      path: "/search/:keyWord?",
      component: Search,
      name:'search',
      props(route){
        return{keyWord:route.params.keyWord}
      }
    },
    {
      path: "/",
      component: Home,
    },
  ],
});

export default router;
