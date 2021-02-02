import Vuex from "vuex";
import Vue from "vue";
import home from "./home";
import user from "./user";
import search from './search'
Vue.use(Vuex);

const state = {};

const actions = {};

const mutations = {};

const geeters = {};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  geeters,
  modules: {
    home,
    user,
    search
  },
});

export default store;
