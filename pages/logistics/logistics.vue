<template>
	<view class="content">
		<!-- <ali :state="alidata2.state" :datas="alidata2.data" :ways="alidata2.information"></ali> -->
		<view class="box clear">
			<img :src="img" alt="" mode="widthFix" style="width: 25%;" class="fl">
			<view class="fr" style="width:73%;">
				<view class="proname">商品名称:<text>{{name}}\n</text></view>
				<view>承运来源：<text>{{information.expressName}}\n</text></view>
				<view>运单编号：<text>{{information.nu}}\n</text></view>
			</view>
		</view>
		<view class="logistics">
			<text>物流跟踪</text>
			<button class="fr kf" open-type="contact" size="mini">联系客服\n</button>
			<!-- <span class="fr kf">联系客服\n</span> -->
			<view class="loglist" v-for="item in information.data" :key="item.id">
				<text style="font-size: 28rpx;">{{item.context}}\n</text>
				<text class="time">{{item.ftime}}</text>
			</view>
			<!-- <view v-if="!result">
				{{information.message}}
			</view> -->
		</view>
	</view>
</template>

<script>
// import ali from '@/components/WuLiu-step.vue';
	import {
		getUserOrderExpress
	} from '@/common/vmeitime-http/'
export default {
	components: {
		// ali
	},
	data() {
		return {
			alidata:  [
					{
						time: '2019-05-23 16:30:20',
						remark: '[杭州市]快件派送至【丰巢智能快递柜】'
					},
					{
						time: '2019-05-23 14:54:29',
						remark: '[杭州市]快件交给黄平，正在派送途中（联系电话：15157162459）'
					},
					{
						time: '2019-05-23 14:48:46',
						remark: '[杭州市]正在派送途中'
					},
					{
						time: '2019-05-23 14:42:32',
						remark: '[杭州市]快件到达 【杭州西湖金月巷营业点】'
					},
					{
						time: '2019-05-23 12:48:30',
						remark: '[杭州市]快件已发车'
					},
					{
						time: '2019-05-23 12:48:20',
						remark: '[杭州市]快件在【杭州下沙中转场】已装车'
					},
					{
						time: '2019-05-23 11:36:57',
						remark: '[杭州市]快件到达 【杭州下沙中转场】'
					},
					{
						time: '2019-05-23 10:17:28',
						remark: '[杭州市]快件已发车'
					},
					{
						time: '2019-05-23 10:08:43',
						remark: '[杭州市]快件在【杭州上城集散中心】已装车'
					},
					{
						time: '2019-05-23 09:10:37',
						remark: '[杭州市]快件到达 【杭州上城集散中心】'
					},
					{
						time: '2019-05-22 18:00:48',
						remark: '[郑州市]快件已发车'
					},
					{
						time: '2019-05-22 16:59:21',
						remark: '[郑州市]快件在【郑州经开集散中心】已装车'
					},
					{
						time: '2019-05-22 16:17:40',
						remark: '[郑州市]快件到达 【郑州经开集散中心】'
					},
					{
						time: '2019-05-22 13:28:58',
						remark: '[洛阳市]快件已发车'
					},
					{
						time: '2019-05-22 13:28:22',
						remark: '[洛阳市]快件在【洛阳机场集散中心】已装车'
					},
					{
						time: '2019-05-22 12:06:57',
						remark: '[洛阳市]快件到达 【洛阳机场集散中心】'
					},
					{
						time: '2019-05-22 11:45:09',
						remark: '[洛阳市]快件已发车'
					},
					{
						time: '2019-05-22 11:34:13',
						remark: '[洛阳市]快件在【洛阳涧西集收客户营业部】已装车'
					},
					{
						time: '2019-05-22 11:27:43',
						remark: '[洛阳市]顺丰速运 已收取快件'
					},
					{
						time: '2019-05-22 11:17:30',
						remark: '[洛阳市]顺丰速运 已收取快件'
					}
				],
				information:'',
				img:'',
				name:''
			// 	information: {
			// 		no: '231880744913',
			// 		sName: 'SF',
			// 		expName: '顺丰速运',
			// 		url: 'http:www.sf-express.com',
			// 		tel: '95338',
			// 		img: 'https://oss-cn2.apistore.cn/exp/SF.png'
			// 	}
			// },
			// alidata2: {
			// 	state: 3,
			// 	uptime: '2019-05-24 10:58:24',
			// 	data: [
			// 		{
			// 			time: '2019-05-20 16:27:31',
			// 			remark: '杭州市【杭州西湖区十八部】，公司门口！详情致电17609715305 已签收'
			// 		},
			// 		{
			// 			time: '2019-05-20 14:03:11',
			// 			remark: '杭州市【杭州西湖区十八部】，【谭德银17609715305】正在派件'
			// 		},
			// 		{
			// 			time: '2019-05-20 10:53:15',
			// 			remark: '到杭州市【杭州西湖区十八部】'
			// 		},
			// 		{
			// 			time: '2019-05-20 04:22:38',
			// 			remark: '杭州市【杭州转运营业中心】，正发往【杭州西湖区十八部】'
			// 		},
			// 		{
			// 			time: '2019-05-20 03:30:17',
			// 			remark: '到杭州市【杭州转运中心】'
			// 		},
			// 		{
			// 			time: '2019-05-19 21:46:27',
			// 			remark: '苏州市【无锡转运中心】，正发往【杭州转运中心】'
			// 		},
			// 		{
			// 			time: '2019-05-19 21:43:28',
			// 			remark: '到苏州市【无锡转运中心】'
			// 		},
			// 		{
			// 			time: '2019-05-19 17:11:40',
			// 			remark: '到南通市【海门】'
			// 		},
			// 		{
			// 			time: '2019-05-19 13:17:56',
			// 			remark: '南通市【海门】，【金喜露18068137656】已揽收'
			// 		}
			// 	],
			// 	information: {
			// 		no: '70939995911523',
			// 		sName: 'HTKY',
			// 		expName: '百世快递(原汇通)',
			// 		url: 'http:www.htky365.com',
			// 		tel: '021-62963636',
			// 		img: 'https:oss-cn2.apistore.cnexpHTKY.png'
			// 	}
	   
		
	}
	},
	onLoad(option) {
		console.log("option: " + JSON.stringify(option));
		let id = option.id;
		this.name = option.name;
		this.img = option.img;
		var param = new Object();
		param.orderId = id;
		getUserOrderExpress(param).then(res => {
			console.log(res);
			if(res.data.code == 200){
				this.information = res.data.data;
			}
		})
	},
	methods: {
		
	}
};
</script>

<style scoped lang="scss">
	.box{
		font-size: 32rpx;
		width:95%;
		margin:0 auto;
		line-height:60rpx;
		padding-top:25rpx;
		.proname{
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp:1;
			overflow: hidden;
		}
	}
	.logistics{
		width: 95%;
		margin: 25rpx auto;
		font-size: 32rpx;
		.kf{
			border: 1px solid #E0E0E0;
			color: gray;
			font-size: 24rpx;
			padding: 8rpx;
			border-radius:40px;
			line-height: 1;
			background: none;
			

			
		}
		.loglist{
			color: #8F8F94;
			font-size: 20rpx;
			line-height: 40rpx;
			border-bottom: 1px solid #E0E0E0;
			padding-bottom: 8rpx;
			padding-top: 10rpx;
			
	}
		
	}
	
.content {
}
</style>
