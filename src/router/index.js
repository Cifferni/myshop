import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
Vue.use(VueRouter);
/* 
     解决多次点击编程时导航报错问题,多次执行会抛出NavigationDuplicated的警告错误!
       原因:vue-router3.1.0之后, 引入了promise的语法如果没有通过参数指定成功或者失败回调函数就返回一个promise且内部会判断如果要跳转的路径和参数都没有变化,
       会抛出一个失败的promise
      解决方法一 this.$router.push('/xxx').catch(()=>)
      解决方法二 this.$router.push('/xxx',()=>{})
      解决方法三  修改源码
  */
const oldPush = VueRouter.prototype.push;
const oldReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(localtion, resolve, reject) {
  if (!resolve && !reject) {
    return oldPush.call(this, localtion).catch(() => {});
  } else {
    return oldPush.call(this, localtion, resolve, reject);
  }
};
VueRouter.prototype.replace = function(localtion, resolve, reject) {
  if (!resolve && !reject) {
    return oldReplace.call(this, localtion).catch(() => {});
  } else {
    return oldReplace.call(this, localtion, resolve, reject);
  }
};

const router = new VueRouter({
  mode: "history",
  routes: [
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
      path: "/",
      redirect: 'home',
    },
  ],
});

export default router;
