import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		scene:"",//进入场景值
		clientType:"",//客户端类型
		provider:"",
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		saveScene(state,scene){
			state.scene = scene;
		},
		saveClientType(state,type){
			state.clientType = type;
		},
		saveProvider(state,type){
			state.provider = type;
		},
		
    }
})

export default store
