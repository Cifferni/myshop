/* 
   user的vuex模块

*/
import { addShopCart } from "@/api/index";
const state = {};

const actions = {
  async addShopCart({ commit }, value) {
    let { skuId, skuNum } = value;
    const result = await addShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok"
    }else{
        return Promise.reject(new Error('failed'))
    }
  },
};

const mutations = {};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
