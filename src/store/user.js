/* 
   user的vuex模块

*/
import { getUserTempId } from "@/utils/userabout";
import {
  registerUsers,
  getCode,
  reqLogin,
  reqUserInfo,
  reqSignOut,
  reqUserAddress
} from "@/api/index";
const state = {
  //这个函数专门用来生成用户的临时标识的
  userTempId: getUserTempId(),
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
  userAddressInfo:[]
};

const actions = {
  async isterInfo({ commit }, registerInfo) {
    const result = await registerUsers(registerInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  async reqGetCode({ commit }, phone) {
    const result = await getCode(phone);
    if (result.code === 200) {
      commit("REQGETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failure"));
    }
  },
  async getLoginToken({ commit }, loginInfo) {
    const result = await reqLogin(loginInfo);
    if (result.code === 200) {
      commit("GETLOGINTOKEN", result.data);
      localStorage.setItem("TOKEN", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failure"));
    }
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    if (result.code === 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failure"));
    }
  },
  //清除用户的token
  clearUserToken({ commit }) {
    commit("RESETUSERINFO");
    localStorage.clear("TOKEN");
  },
  //退出登录
  async SignOut({ commit }) {
    const result = await reqSignOut();
    if (result.code === 200) {
      commit('RESETUSERINFO')
      localStorage.clear("TOKEN");
      return "ok";
    } else {
      return Promise.reject(new Error("failure"));
    }
  },
  //获取用户收货地址信息
  async getUserAddressInfo({commit}){
    const result = await reqUserAddress()
    if(result.code === 200){
       commit('GETUSERADDRESSINFO',result.data)
    }
   },
};

const mutations = {
  REQGETCODE(state, value) {
    state.code = value;
  },
  GETLOGINTOKEN(state, value) {
    state.token = value.token;
  },
  GETUSERINFO(state, value) {
    state.userInfo = value;
  },
  // CLEARUSERTOKEN(state) {
  //   state.token = "";
  // },
  RESETUSERINFO(state) {
    state.token = "";
    state.userInfo = {};
  },
  GETUSERADDRESSINFO(state,value){
    state.userAddressInfo = value
  }
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
