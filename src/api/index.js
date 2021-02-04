
/* 
 这个文件写的都是函数,都是接口请求函数
  每个接口对应每个函数,如果想要拿相关的接口的数据,只需要调用相关的接口请求函数

*/

//引入二次封装的axios
import service from "./axios";
import mockAjax from './mockAjax'

export const reqCategoryList = () => {
  return service({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};

export const  reqBannersData = () =>{
  return mockAjax({
    method:'get',
    url:'/banner'
  })
}

export const  reqFloorData = () =>{
  return mockAjax({
    method:'get',
    url:'/floor'
  })
}
 
// 获取搜索列表分类
export const reqSearchInfo = (value) =>{
  return service({
    method:'post',
    url:'/list',
    data:value
  })
}

//获取 reqSkuInfo 
export const  reqDetailInfo = (skuId) =>{
 return service({
    method:'get',
    url:`/item/${skuId}`,
 
  })
}
//添加购物车
export const addShopCart =(skuId,skuNum)=>{
  return service({
     method:'post',
     url:`/cart/addToCart/${ skuId }/${ skuNum }`
  })
}