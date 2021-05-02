// 后端接口基础路径
export const BASE_API_URL = 'http://127.0.0.1:8040'
// 登录地址
export const LOGIN_URL = BASE_API_URL + '/user-center/users/login'
// 获取用户信息
export const USER_INFO = BASE_API_URL + '/user-center/users/userInfo'
// 用户对某个订单提交退款
export const START_CANCEL_TRAN = BASE_API_URL + '/user-center/users/startCancelTransaction'
// 对某个订单的退款进行处理
export const HANDLE_CANCEL_TRAN = BASE_API_URL + '/user-center/users/cancelTransaction'
// 更改用户信息
export const ALTER_INFO = BASE_API_URL + '/user-center/users/alterUserInfo'
// 根据用户token找购物车商品
export const USER_CART = BASE_API_URL + '/user-center/users/getCart'
// 订单页面找商品的url
export const GET_SELECTED_URL = BASE_API_URL + '/user-center/users/getSelected'
// 直接买的url
export const JUST_BUY_URL = BASE_API_URL + '/user-center/users/jstBuy'
// 支付链接
export const HANDLE_ORDER_URL = BASE_API_URL + '/user-center/users/handleOrder'
// 用户加购物车
export const ADD_CART = BASE_API_URL + '/user-center/users/addCart'
// 用户提交地址的url
export const ADD_ADDRESS = BASE_API_URL + '/user-center/users/address/add'
// 找订单地址(无id默认)
export const GET_TRANSACTION_ADDRESS = BASE_API_URL + '/user-center/user/address/getAddress'
// 获取用户已经提交的地址
export const GET_ADDRESS = BASE_API_URL + '/user-center/user/address/selfAddress'
// 用户已经购买的商品
export const GET_BOUGHT = BASE_API_URL + '/user-center/userAndCommodities/getUserBought'
// 已经购买商品的详细信息
export const GET_BOUGHT_INFO = BASE_API_URL + '/user-center/userAndCommodities/getUserBoughtOrSellInfo'
// 已经卖出的商品信息
export const GET_SELL = BASE_API_URL + '/user-center/userAndCommodities/getSell'
// 用户一处购物车里的商品
export const REMOVE_CART_COMMODITY = BASE_API_URL + '/user-center/users/removeCart'
// 上传照片的地址
export const POST_PIC_URL = BASE_API_URL + '/commodity-center/commodity/getPic'
// 用户已经提交的商品
export const GET_SUBMIT = BASE_API_URL + '/commodity-center/commodity/userCommit'
// 更改自己已经调教商品的状态
export const ALTER_COMMODITY_STATUS = BASE_API_URL + '/commodity-center/commodity/alterStatus'
// 获取十个商品
export const MAIN_COMMODITIES = BASE_API_URL + '/commodity-center/commodity/getmainopagecommodities'
// 根据商品id找商品
export const COMMODITY_INFO = BASE_API_URL + '/commodity-center/commodity/getInfo'
// 根据仓库名找商品
export const CATEGORY_COMMODITIES = BASE_API_URL + '/commodity-center/commodity/findAllCommoByCategpry'
// 提交商品地址
export const SUBMIT_COMMODITY_URL = BASE_API_URL + '/commodity-center/commodity/submitCommodity'
// 公告接口地址
export const NOTICE_URL = BASE_API_URL + '/notices/newest'
// share
export const SHARE_POST_URL = BASE_API_URL + '/shares'
// 预览地址
export const SHARE_POST_PREVIEW_URL = SHARE_POST_URL + '/preview'
// 用户主地址
export const USER_URL = BASE_API_URL + '/users'
// 签到地址
export const SIGN_URL = USER_URL + '/sign'
// 转发地址
export const FORWARD_URL = USER_URL + '/forward'
// 我的积分明细
export const USER_BONUS_LOG_URL = USER_URL + '/bonus-logs'
// 我的投稿
export const USER_MY_CONTRIBUTION_URL = USER_URL + '/contributions'
// 当前登录人员的个人信息
export const USER_URL_ME = USER_URL + '/me'
// 完善个人信息
export const USER_URL_COMPLETE = USER_URL + '/complete'
// 投稿
export const SHARE_POST_CONTRIBUTE_URL = SHARE_POST_URL + '/contribute'
