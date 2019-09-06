import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

// 商品详情页
export const getProductDetailById = (data) => {
    return http.request({
        url: 'product/getProductDetailById',
        method: 'GET', 
        data,
		// handle:true
    })
}

//获取当前用户地区是否在黑白名单
export const getProductIfAreaLimit = (data) => {
    return http.request({
        url: 'product/getProductIfAreaLimit',
        method: 'GET', 
        data,
		// handle:true
    })
}
//获取收货地址列表
export const getAddressByUserId = (data) => {
    return http.request({
        url: 'receiveAddressController/getAddressByUserId',
        method: 'GET', 
        data,
		// handle:true
    })
}
//添加收货地址
export const addAddress = (data) => {
    return http.request({
        url: 'receiveAddressController/addAddress',
        method: 'POST', 
        data,
		// handle:true
    })
}

//根据地址id获取地址详情
export const getAddressById = (data) => {
    return http.request({
        url: 'receiveAddressController/getAddressById',
        method: 'GET', 
        data,
		// handle:true
    })
}


//添加小程序地址并返回Id
export const addWeChatAddress = (data) => {
    return http.request({
        url: 'receiveAddressController/addWeChatAddress',
        method: 'POST', 
        data,
		// handle:true
    })
}
//修改地址
export const editAddress = (data) => {
    return http.request({
        url: 'receiveAddressController/editAddress',
        method: 'PUT', 
        data,
		// handle:true
    })
}
//确认订单
export const confirmOrder = (data) => {
    return http.request({
        url: 'orderController/confirmOrder',
        method: 'GET', 
        data,
		// handle:true
    })
}
//提交订单
export const submitOrder = (data) => {
    return http.request({
        url: 'orderController/submitOrder',
        method: 'GET', 
        data,
		// handle:true
    })
}
//微信统一下单接口
export const unifiedOrder = (data) => {
    return http.request({
        url: 'wxpay/unifiedOrder',
        method: 'GET', 
        data,
		// handle:true
    })
}
//保存页面访问记录
export const savePageVisitLog = (data) => {
    return http.request({
        url: 'pageVisit/savePageVisitLog',
        method: 'POST', 
        data,
		// handle:true
    })
}
//保存事件记录
export const savePageEventLog = (data) => {
    return http.request({
        url: 'pageVisit/savePageEventLog',
        method: 'POST', 
        data,
		// handle:true
    })
}


export const getMonthSignMsg = (data) => {
    return http.request({
        url: 'sign/getMonthSignMsg',
        method: 'GET', 
        data,
		// handle:true
    })
}
//------------------------------------------------签到页面接口start-------------------------------------------------------
export const getSignInContinuousBonus = (data) => {
    return http.request({
        url: '/sign/getSignInContinuousBonus',
        method: 'GET', 
        data,
		// handle:true
    })
}

//获取用户信息
export const getMemberMsg = (data) => {
    return http.request({
        url: '/wx/user/getMemberMsg',
        method: 'GET', 
        data,
		// handle:true
    })
}

//更新用户签到提醒 开关状态
export const updateSignRemind = (data) => {
    return http.request({
        url: '/sign/updateSignRemind',
        method: 'GET', 
        data,
		// handle:true
    })
}


//用户每日签到接口
export const memberTodaySign = (data) => {
    return http.request({
        url: '/sign/memberTodaySign',
        method: 'POST', 
        data,
		// handle:true
    })
}

//获取用户当月补签信息
export const getmemberRetroactiveMsg = (data) => {
    return http.request({
        url: '/sign/getmemberRetroactiveMsg',
        method: 'GET', 
        data,
		// handle:true
    })
}


//用户补签接口
export const memberRetroactive = (data) => {
    return http.request({
        url: '/sign/memberRetroactive',
        method: 'GET', 
        data,
		// handle:true
    })
}

//领取连续签到奖励接口 返回领取金额
export const getContinuousSignAward = (data) => {
    return http.request({
        url: '/sign/getContinuousSignAward',
        method: 'GET', 
        data,
		// handle:true
    })
}

//签到成功滚动消息
export const getSignInMessageNotification = (data) => {
    return http.request({
        url: '/sign/getSignInMessageNotification',
        method: 'GET', 
        data,
		// handle:true
    })
}
//------------------------------------------------签到页面接口end-------------------------------------------------------

//------------------------------------------------积分商城页面接口start-------------------------------------------------------
//获取积分兑换的用户  排行榜
export const getIntegerUser = (data) => {
    return http.request({
        url: '/sign/getIntegerUser',
        method: 'POST', 
        data,
		// handle:true
    })
}

//获取用户信息接口
export const userinfo = (data) => {
    return http.request({
        url: '/wx/user/info',
        method: 'GET', 
        data,
		// handle:true
    })
}

//获取用户上架商品分页查询
export const getProductPageList = (data) => {
    return http.request({
        url: '/product/getProductPageList',
        method: 'POST', 
        data,
		// handle:true
    })
}

//查询当前用户所有订单
export const getUserOrders = (data) => {
    return http.request({
        url: '/orderController/getUserOrders',
        method: 'POST', 
        data,
		// handle:true
    })
}
//------------------------------------------------积分商城页面接口end-------------------------------------------------------
//------------------------------------------------我的订单页面start-------------------------------------------------------

//获取订单列表
export const getMemberOrderList = (data) => {
    return http.request({
        url: '/orderController/getMemberOrderList',
        method: 'GET', 
        data,
		// handle:true
    })
}


//关闭未付款订单
export const closeUnpaidOrderById = (data) => {
    return http.request({
        url: '/orderController/closeUnpaidOrderById',
        method: 'GET', 
        data,
		// handle:true
    })
}


//确认收货订单
export const confirmOrderById = (data) => {
    return http.request({
        url: '/orderController/confirmOrderById',
        method: 'GET', 
        data,
		// handle:true
    })
}

//根据订单号查询快递信息
export const getUserOrderExpress = (data) => {
    return http.request({
        url: '/orderController/getUserOrderExpress',
        method: 'GET', 
        data,
		// handle:true
    })
}


//------------------------------------------------我的订单页面end-------------------------------------------------------

//------------------------------------------------------保存数据start--------------------------------------------------------------

//保存用户每日首次访问时的积分记录 用于积分分布统计
export const saveMemberFirstVisitIntegralLog = (data) => {
    return http.request({
        url: '/pageVisit/saveMemberFirstVisitIntegralLog',
        method: 'GET', 
        data,
		// handle:true
    })
}

//保存用户从模板消息进入访问记录
export const saveTemplateEnterIntoVisitLog = (data) => {
    return http.request({
        url: '/pageVisit/saveTemplateEnterIntoVisitLog',
        method: 'GET', 
        data,
		// handle:true
    })
}

//增加公众号Id
export const addPublicNumber = (data) => {
    return http.request({
        url: '/wx/user/addPublicNumber',
        method: 'GET', 
        data,
		// handle:true
    })
}


//发送预览成功消息
export const sendPreviewSuccessMsg = (data) => {
    return http.request({
        url: '/pageVisit/sendPreviewSuccessMsg',
        method: 'GET', 
        data,
		// handle:true
    })
}
//------------------------------------------------------保存数据end--------------------------------------------------------------
export const helloworldPost = (data) => {
    return http.request({
        url: 'test/testPost',
        method: 'POST', 
        data,
		// handle:true
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test
}