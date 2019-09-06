export function getCurPage(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length-1];
    return curPage
}

import {
	savePageVisitLog,
	savePageEventLog,
	saveMemberFirstVisitIntegralLog,
	saveTemplateEnterIntoVisitLog,
	addPublicNumber,
	sendPreviewSuccessMsg
} from '@/common/vmeitime-http/';
import store from '@/store';
export async function savePageVisit(pageUrl){
	var that = this;
    savePageVisitLog({
		 "clientType": store.state.clientType,
		  "pageUrl": pageUrl,
		  "provider": store.state.provider,
		  "scene": store.state.scene 
	}).then((res) => {
		console.log('request success', res)
		if (res.data.code == 200) {
			console.log('request success', res);
		}
	}).catch((err) => {
		console.log('request fail', err);
	})
}

export async function savePageEvent(eventType){
	var that = this;
    savePageEventLog({
		 "eventType": eventType,
	}).then((res) => {
		console.log('request success', res)
		if (res.data.code == 200) {
			console.log('request success', res);
		}
	}).catch((err) => {
		console.log('request fail', err);
	})
}
//页面加载时的异步请求
export async function onloadSaveAjax(options){
	
	saveMemberFirstVisitIntegralLog();
	if(options.templateMsgId != null && options.templateMsgId != ''){
		var param = new Object();
		param.templateMsgId = options.templateMsgId;
		saveTemplateEnterIntoVisitLog(param).then((res) => {
			console.log('request success', res)
		})
	}
	if(options.openId != null && options.openId != ''){
		var param = new Object();
		param.mpOpenId = options.openId;
		addPublicNumber(param).then((res) => {
			console.log('request success', res)
		})
	}
	if(options.preview != null && options.preview != '' && options.preview == 1){
		var param = new Object();
		param.source = options.source;
		sendPreviewSuccessMsg(param).then((res) => {
			console.log('request success', res)
		})
	}
	
	
}

export default {
	'getCurPage':getCurPage,
	'savePageVisit':savePageVisit,
	'savePageEvent':savePageEvent,
	'onloadSaveAjax':onloadSaveAjax
}