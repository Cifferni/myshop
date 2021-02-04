import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail"
import ShopCart from "@/pages/ShopCart"
import AddCartSuccess from "@/pages/AddCartSuccess"
export default [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      //路由对象中的原配置,可以配置我们所需要的任何数据
      meta: {
        isShow: true,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isShow: true,
      },
    },
    {
      path: "/search/:keyWord?",
      component: Search,
      name: "search",
    },
    {
       path:"/detail/:skuId",
       component:Detail
    },
    {
       path:'/shopcart',
       component:ShopCart
    },
    {
       path:'/addcartsuccess',
       component:AddCartSuccess
    },
    {
      path: "/",
      redirect: 'home',
    },
  ]