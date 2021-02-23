/* 

路由懒加载 
const Home = () =>import("@/pages/Home") //import函数可以让问价你单独打包,并且动态加载 
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import ShopCart from "@/pages/ShopCart";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Center from "@/pages/Center";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Trade from "@/pages/Trade";
import GroupOrder from "@/pages/Center/GroupOrder";
import MyOrder from "@/pages/Center/MyOrder";

*/

import Vue from "vue";
export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    //路由对象中的原配置,可以配置我们所需要的任何数据
    meta: {
      isShow: true,
    },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: {
      isShow: true,
    },
  },
  {
    path: "/search/:keyWord?",
    component: () => import("@/pages/Search"),
    name: "search",
  },
  {
    path: "/detail/:skuId",
    component: () => import("@/pages/Detail"),
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
  },
  {
    path: "/addcartsuccess/:skuNum",
    component: () => import("@/pages/AddCartSuccess"),
    beforeEnter: (to, from, next) => {
      let params = to.params.skuNum;
      let SKUINFO = sessionStorage.getItem("SKUINFO_KEY");
      if (params && SKUINFO) {
        next();
      } else {
        Vue.prototype.$message.error("没有此页面");
        next("/");
      }
    },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    children: [
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder"),
      },
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        Vue.prototype.$message.error("只有从订单界面才可以跳到支付界面");
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component:   () => import("@/pages/PaySuccess"),
    beforeEnter(to, from, next) {
      if (from.path === "/pay") {
        next();
      } else {
        Vue.prototype.$message.error("只有从支付界面才可以跳到支付界面");
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/",
    redirect: "home",
  },
];
