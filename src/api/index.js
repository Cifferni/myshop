/* 
 这个文件写的都是函数,都是接口请求函数
  每个接口对应每个函数,如果想要拿相关的接口的数据,只需要调用相关的接口请求函数

*/

//引入二次封装的axios
import service from "./axios";
import mockAjax from "./mockAjax";

export const reqCategoryList = () => {
  return service({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};

export const reqBannersData = () => {
  return mockAjax({
    method: "get",
    url: "/banner",
  });
};

export const reqFloorData = () => {
  return mockAjax({
    method: "get",
    url: "/floor",
  });
};

// 获取搜索列表分类
export const reqSearchInfo = (value) => {
  return service({
    method: "post",
    url: "/list",
    data: value,
  });
};

//获取 reqSkuInfo
export const reqDetailInfo = (skuId) => {
  return service({
    method: "get",
    url: `/item/${skuId}`,
  });
};
//添加购物车
export const addShopCart = (skuId, skuNum) => {
  return service({
    method: "post",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

//获取购物车列表
export const reqCartList = () => {
  return service({
    method: "get",
    url: "/cart/cartList",
  });
};

//修改单个商品的选中选中状态
export const reqItemChecked = (skuID, isChecked) => {
  return service({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "get",
  });
};

//删除购物车单个商品
export const reqDeleteItem = (skuId) => {
  return service({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};
//注册用户
export const registerUsers = (registerInfo) => {
  return service({
    url: "/user/passport/register",
    method: "post",
    data: registerInfo,
  });
};

//获取验证码
export const getCode = (phone) => {
  return service({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

//登录
export const reqLogin = (loginInfo) => {
  return service({
    url: "user/passport/login",
    method: "post",
    data: loginInfo,
  });
};

//根据token获取用户信息
export const reqUserInfo = () => {
  return service({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
};

//退出登录
export const reqSignOut = () => {
  return service({
    url: "user/passport/logout",
    method: "get",
  });
};

//获取用户的订单页面的信息
export const reqTradeInfo = ()=>{
  return service({
    url:'order/auth/trade',
    method:'get'
  })
}

//获取用户的收货地址信息
export const reqUserAddress = () =>{
  return service({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
  })
}
//提交订单 /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder =(tradeNo,tradeInfo)=>{
   return service({
     url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
     method:'post',
     data: tradeInfo
   })
}

//请求获取支付信息 /payment/weixin/queryPayStatus/{orderId}
export const reqPaymentInfo =(orderId) =>{
  return service({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}

//请求获取支付状态 /payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus =(orderId)=>{
  return service({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}
//获取订单列表 order/auth/{page}/{limit}
export const reqOrderListInfo = (page,limit)=>{
  return service({
    url:`order/auth/${page}/${limit}`,
    method:'get'
  })
}