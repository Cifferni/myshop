import { reqDetailInfo } from "@/api/index";
const state = {
  detailInfo: {},
};

const actions = {
  async getDetailInfo({ commit }, value) {
    const result = await reqDetailInfo(value);
    if(result.code === 200){
    commit('GETDETAILINFO',result.data)
    }
  },
};

const mutations = {
  GETDETAILINFO(state,value){
    state.detailInfo = value
    
  }
};

const getters = {
  categoryView(state){
    return state.detailInfo.categoryView ||{}
  },
  skuInfo(state){
    return state.detailInfo.skuInfo ||[]
  },
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList ||[]
  }


};

export default {
  state,
  actions,
  mutations,
  getters,
};
