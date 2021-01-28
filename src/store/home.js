/* 
   home的vuex模块

*/
import { reqCategoryList } from "@/api/index";
const state = {
  categoryList: [],
};

const actions = {
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("GETCATEGORYLIST", result.data);
    }
  },
};

const mutations = {
  GETCATEGORYLIST(state, value) {
    state.categoryList = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
