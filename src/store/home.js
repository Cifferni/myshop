/* 
   home的vuex模块

*/
import { reqCategoryList, reqBannersData, reqFloorData } from "@/api/index";
const state = {
  categoryList: [],
  bannerData: [],
  floorData: [],
};

const actions = {
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("GETCATEGORYLIST", result.data);
    }
  },
  async getBannerData({ commit }) {
    const result = await reqBannersData();
    if(result.code === 200){
      commit('GETBANNERDATA',result.data)
    }
  },
  async getFloorData({commit}){
    const result = await reqFloorData()
    if(result.code === 200) commit('GETFLOORDATA',result.data)
  }
};

const mutations = {
  GETCATEGORYLIST(state, value) {
    state.categoryList = value;
  },
  GETBANNERDATA(state,value){
     state.bannerData = value
  },
  GETFLOORDATA(state,value){
    state.floorData = value
  }
  
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
