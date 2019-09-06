/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/*
// 开放的接口
import http from './interface'

http.config.baseUrl = "http://localhost:8080/api/"

http.request(url:'user/list',method:'GET').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list', {status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post('user', {id:1, status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put('user/1', {status: 2}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete('user/1').then((res)=>{
	console.log(JSON.stringify(res))
}) 

*/
export default {
	config: {
		//baseUrl: "http://192.168.1.146:9090/hyb-wx-api/",
		baseUrl: "https://m.soodii.com/hyb-wx-api/",
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		
		options.dataType = options.dataType || this.config.dataType
		//验证是否包含基础路径
		if(options.url.indexOf(options.baseUrl) == -1){
			options.baseUrl = options.baseUrl || this.config.baseUrl
			options.url = options.baseUrl + options.url
		}
		options.data = options.data || {}
		options.method = options.method || this.config.method
		var contentType = "application/x-www-form-urlencoded";
		if(options.method == 'POST' || options.method == 'PUT'){
			contentType = "application/json;charset=UTF-8";
		}
		options.header = {
			'Content-Type':contentType,
			'x-auth-token': uni.getStorageSync("x-auth-token"),
			'source':uni.getStorageSync("source")
		}
		//TODO 加密数据
		console.log(options);
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   
		return new Promise((resolve, reject) => {
			let _config = null
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response)
				if (statusCode === 200) { //成功
					//resolve(response);
					resolve(checkStatus(response, options));
				} else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
import http from './interface'

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}


/*-----------------------请求时token过期自动刷新token  start---------------------- */
let isRefreshing = true;
function checkStatus(response, options) {
  if (response && (response.data.code === 401)) {
    // 刷新token的函数,这需要添加一个开关，防止重复请求
    if (isRefreshing) {
      wx.removeStorageSync('x-auth-token');
      console.log("*******刷新token")
      login();
      //refreshTokenRequst()
    }
    isRefreshing = false;
    // 这个Promise函数很关键
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(() => {
        resolve(http.request(options))
      })
    });
    return retryOriginalRequest;
  } else {
    return response;
  }
}
function login(){
	var that = this;
	var provider = uni.getProvider({
		service: 'oauth',
		success: (result) => {
			if (~result.provider.indexOf('weixin')) {
				wxMiAppLogin();
			}
	
		},
		fail: (error) => {
			console.log('获取登录通道失败', error);
		}
	});
	
}
//微信小程序登陆
function wxMiAppLogin(){
	var that = this;
	uni.login({
		provider: "weixin",
	    // #ifdef MP-ALIPAY
	    scopes: 'auth_user',  //支付宝小程序需设置授权类型
	    // #endif
		success: (res) => {
			console.log('login success:', res);
			// 更新保存在 store 中的登录状态
			//this.login(provider.id);
			http.get("wx/user/login",{
				code:res.code
			}).then(function (res) {
				if(res.data.code == 200){
				  uni.setStorageSync('x-auth-token',res.data.data);
				  onAccessTokenFetched();
				  isRefreshing = true;
				}
			  })
		},
		fail: (err) => {
			console.log('login fail:', err);
		}
	});
}
// Promise函数集合
let subscribers = [];
function onAccessTokenFetched() {
  subscribers.forEach((callback) => {
    callback();
  })
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback)
}
/*-----------------------请求时token过期自动刷新token  end---------------------- */

