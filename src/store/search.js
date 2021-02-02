import {reqSearchInfo} from "@/api/index"
const state= {
   SeardInfro:{}
}

const actions = {
  async getSearchInfo({commit},value){
 const result = await reqSearchInfo(value)
    commit("REQSEARCHINFO",result.data)
 }

 }

const mutations = {
    REQSEARCHINFO(state,value){
        state.SeardInfro = value
    }
}


const getters = {
    attrsList(state){
        return state.SeardInfro.attrsList || []
    },
    goodsList(state){
        return state.SeardInfro.goodsList || []
    },
    trademarkList(state){
        return state.SeardInfro.trademarkList ||[]
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}