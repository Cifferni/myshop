import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes";
import store from "@/store";
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
VueRouter.prototype.push = function(location, onResolved, onRejected) {
  //location就是我们调用 this.$router.push，传递过来的对象
  // {
  //   name: "search",
  //   params: { keyword: this.keyword || undefined},
  //   query: { keyword1: this.keyword.toUpperCase() },
  // }
  if (onResolved === undefined && onRejected === undefined) {
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return oldPush.call(this, location).catch(() => {});
  } else {
    //证明调用的时候传递了成功或者失败的回调，或者都有
    return oldPush.call(this, location, onResolved, onRejected);
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
  // mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  /* 
      to  准备跳转的目的地对象
      from 从哪来的路由对象
      next 是一个函数 根据参数不同,功能不同 
      next() 无条件放行 
      next('/')代表强制跳转到指定的位置 
      next(false) 代表什么都不做,原地不动
   */
  //第一步,守卫拦截住 ,先去获取用户token和用户信息
  let token = store.state.user.token;
  let userInfo = store.state.user.userInfo.name;
  if (token) {
    //如果token是存在,代表用户登陆过
    if (to.path === "/login") {
      //用户已经登录还要我往登录页跳转,没必要
      next("/");
    } else {
      //如果用户已经登录了,但是跳转的不再是登录页那么我们要看用户的信息获取没有
      //如果用户的信息已经获取
      if (userInfo) {
        next();
      } else {
        //用户已经登录过,但是用户买没有获取用户信息
        try {
          await store.dispatch("getUserInfo");
          next() 
        } catch (error) {
          alert(error.message);
          //如果token获取失败,代表token可能过期
          //把用户过期的清除掉,
          store.dispatch("clearUserToken");
          next("/login");
        }
      }
    }
  } else {
    //目前什么都不做
    //后面我们是要添加功能的
    if(to.path === '/trade'){
        next('/login')
    }
    next();
  }
});

export default router;
