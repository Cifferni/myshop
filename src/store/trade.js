import {reqTradeInfo} from '@/api/index'
const state = {
    tradeInfo : {}
};
const actions = {
  async getTradeInfo({commit}){
  const result = await reqTradeInfo()
  if(result.code === 200){
      commit('GETTRADEINFO',result.data)
  }
  }
};
const mutations = {
    GETTRADEINFO(state,value){
     state.tradeInfo = value
    }
};
const getters = {
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || []
    }
};
export default {
  state,
  actions,
  mutations,
  getters,
};
