/* 
   user的vuex模块

*/
import {
  addShopCart,
  reqCartList,
  reqItemChecked,
  reqDeleteItem,
} from "@/api/index";
const state = {
  cartList: [],
};

const actions = {
  async addShopCart({ commit }, value) {
    let { skuId, skuNum } = value;
    const result = await addShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  async getCartList({ commit }) {
    const result = await reqCartList();
    if (result.code === 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //修改单个商品选中状态
  async setItemChecked({ commit }, { skuID, isChecked }) {
    const result = await reqItemChecked(skuID, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //修改多个商品选中状态
  setAllItemChecked({ commit, getters, dispatch }, value) {
    let promises = [];
    getters.cartListItem.cartInfoList.forEach(async (item) => {
      if (item.isChecked === value) return;
      item.isChecked = value;
      const result = await dispatch("setItemChecked", {
        skuID: item.skuId,
        isChecked: item.isChecked,
      });
      promises.push(result);
    });
    return Promise.all(promises);
  },
  //删除单个购物车商品
  async deleteItem({ commit }, value) {
    const result = await reqDeleteItem(value);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  //删除全部选中的商品
  deleteAllItem({commit,getters,dispatch}) {
    let promises = []
    getters.cartListItem.cartInfoList.forEach((item)=>{
      if(!item.isChecked) return
      const result = dispatch('deleteItem',item.skuId)
      promises.push(result)
    } )
    return Promise.all(promises)
  },
};

const mutations = {
  GETCARTLIST(state, value) {
    state.cartList = value;
  },
};

const getters = {
  cartListItem(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
