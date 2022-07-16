// API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'
// 三级联动接口  注意接口大小写啊啊啊
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
export const reqGetBannerList = () => mockRequests.get('/banner')
export const reqFloorList = () => mockRequests.get('/floor')
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
export const reqGoodsInfo = (skuId) => requests({ url: `item/${skuId}`, method: 'get' })
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车列表数据
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
// 删除购物产品
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 获取验证码 别忘了先输入手机号再点击获取验证码哈 不然404哭死大冤种
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 完成注册
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })
// 登录
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })
// 获取用户信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// 获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
// 获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })


