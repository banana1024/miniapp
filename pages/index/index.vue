<template>
	<view v-show="pageshow">
		
		 <uni-notice-bar 
		 :show-icon="true" :scrollable="true" :single="true" color="#870000" background-color="#FFCA37" style="margin-bottom:0rpx;" :text="text"/>

		<view class="dw">
			<view class="checkbg">
				<view class="flexbox clear">
					<view class="fl" style="width: 244rpx;">
						<text class="ljqd">累计签到\n</text>
						<text style="font-size: 46rpx;">{{day}}天\n</text>
						<view style="font-size: 22rpx;width: 232rpx;" v-if="remainingDays != -1">距离额外奖励还有<text class="count">{{remainingDays}}</text>天</view>

					</view>
					<view class="fr" style="width:35%;">
						<text style="font-size: 24rpx;">当前积分\n</text>
						<text style="font-size: 46px;">{{userMsg.integral}}</text>\t<span><img src="../../static/img/qianbi.png" alt="" mode="widthFix"
							 style="width:12%;"></span>
						<text>\n</text>
						<text class="exchangebtn" @click="exchange">去兑换</text>
					</view>
				</view>
			</view>
			<view class="border"></view>
			<button  class="checkbtn" v-if="userMsg.signStatus == 0" open-type="getUserInfo" lang="zh_CN"  plain="true" @getuserinfo="openPopup"
			 >
			<view>
				签到
			</view>
			</button>
			<view class="checkbtn" v-else>
				已签到
			</view>
			
		</view>

		<uni-popup ref="popup" type="center" custom="true" style="position: relative;">
			<view class="jifen">
				<img src="../../static/img/qianbao1.png" alt="" mode="widthFix" style="width:100%;">
				<view class="getintegral">获取{{price}}积分</view>
			</view>
			<!-- <view class="close" @click="closePopup">×</view> -->
		</uni-popup>

		<view class="calendar">
			<view class="checkrules" @click="signrules">规则</view>
			<uni-popup ref="popup2" type="center" show="false" class="popup2" style="width:80%;">
			
					<view style="line-height: 32px;margin-bottom: 30px;" >
						
							<view class="tipsbg1">
								<view class="tips textcenter center">签到规则\n</view>
								1.每日签到可以获得积分，连续签到可获得额外奖励
								<br>2.每日最多可签到一次，断签则会重新计算连签天数
								<br>3.每月会有补签次数，每次补签需要消耗一定积分
								<br>4.积分满足一定条件后，可前往积分商城兑换更多超值好物
								<br>5.积分商城每款奖品数量有限，兑完即止，积分商城会不断更新商品上架
								<view class="iknow" @click="closePopup2">
									我知道了
								</view>
							</view>
						
						</view>
			     
			</uni-popup>
			<view class="nowdate">{{nowdate}}
				<view class="uni-padding-wrap uni-common-mt fr" style="font-size: 22rpx;">
					签到提醒
					<switch :checked="userMsg.signInRemind == 1" @change="switch1Change" color="#1AAD19" style="transform:scale(0.7)" />
				</view>
			</view>

			<uni-calendar :insert="true" :lunar="false" :disable-after="true" :endDate="endDate" :selected="selected" @change="change">
			</uni-calendar>
		</view>
		<uni-popup ref="popup1" type="center" show="false">
			<view class="tipsbg">
				<text class="tips" v-if="memberRetroactiveMsg.useNum >= memberRetroactiveMsg.total">您本月补签次数已用完</text>
				<view style="line-height:72px;margin-bottom:15px;" v-else>
					<text class="tips">本次补签需消耗{{memberRetroactiveMsg.retroactiveUseIntegral}}积分</text>
					<text style="font-size:22rpx;">\n本月还剩补签次数（{{memberRetroactiveMsg.useNum}}/{{memberRetroactiveMsg.total}}）次</text>

				</view>

				<button type="default" size="mini" class="cancel" @click="cancel" style="background: #DDDDDD;border-radius: 50px;">取消</button><text>\t\t\t\t</text>
				
				<button v-if="memberRetroactiveMsg.useNum >= memberRetroactiveMsg.total" type="default" size="mini" class="sure" @click="cancel" style="background: #FF3545;border-radius: 50px;">确定</button>
				<button v-else type="default" size="mini" class="sure" style="background: #FF3545;border-radius: 50px;" @click="retroactiveClick()">确定</button>
			</view>
		</uni-popup>
		<view class="reward">
			<view class="rewardbg" v-if="reward.length > 0">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view id="demo1" class="scroll-view-item_H" v-for="item in reward" :key="item.id">
						<view class="jf" @click="pointstips(item.signInDay)">
							<img src="http://img.soodii.com/ee13a61adf8441b2b8f0c1a8cc351229.png" alt="" mode="widthFix">
							<view class="wz">
								<text class="days">连续{{item.signInDay}}天\n</text>
								<text class="counts">{{item.amount}}积分</text>
							</view>
							<view class="received" v-if="item.isGet == 1">
								<view>已领取</view>
							</view>
						</view>

					</view>

				</scroll-view>
			</view>
			<view class="tablebg">
				<view class="tabledata">
					<view class="tabletitle">
						<text>今日排行</text>
						<text>用户</text>
						<text>连续签到</text>
						<text>积分</text>
					</view>
					<view class="border"></view>
					<view class="tablelist">
						<view class="ltem" v-for="(item,index) in tablelist" :key="item.id">
							<text>{{index+1}}</text>
							<view class="name"><img :src="item.headImg" alt="" mode="widthFix" class="img">\t{{item.nickname}}\t</view>
							<text>{{item.signInDays}}天</text>
							<text>+{{item.integral ? item.integral:0}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniNoticeBar from '@/components/notice-bar/uni-notice-bar.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		getMonthSignMsg,
		getSignInContinuousBonus,
		getMemberMsg,
		updateSignRemind,
		memberTodaySign,
		getmemberRetroactiveMsg,
		memberRetroactive,
		getContinuousSignAward,
		getIntegerUser,
		getSignInMessageNotification,
		userinfo
	} from '@/common/vmeitime-http/'

import {onloadSaveAjax} from '@/common/util.js'
	export default {
		components: {
			uniCalendar,
			uniPopup,
			uniNoticeBar

		},
		data() {
			return {
				endDate:new Date(),
				price:'',//获取积分
				day:{
					
				},
				remainingDays:{
					
				},

				text:[],
 
				reward: [
					{signInDay: "",
					amount: "",
					isGet: ""}
				
				],
				date: '2019-03-10',
				selected: [],
				userMsg:'',//用户信息数据
				memberRetroactiveMsg:'',//用户补签数据
				selectedDate:'',//当前选择日期
				nowdate:"",//日期展示2019年8月
				tablelist:[],
				pageshow:true

			}

		},

		methods: {

			change(e) {
				if (e.clockinfo.info == "补签") {
					var that = this;
					getmemberRetroactiveMsg().then(res =>{
						if(res.data.code == 200){
							that.memberRetroactiveMsg = res.data.data;
						    that.$refs.popup1.open()
						}else{
							uni.showToast({
							    title: res.data.message,
							    duration: 1000,
								icon:'none'
							});
						}
					});
				}
				this.selectedDate = e;
				console.log(e);
				// this.show = false
			},
			//确定补签
			retroactiveClick(){
				var that = this;
				let param = new Object();
				param.localDate = that.selectedDate.year+'-'+that.zeroFill(that.selectedDate.month)+'-'+that.zeroFill(that.selectedDate.date);
				memberRetroactive(param).then(res =>{
					if(res.data.code == 200){
						that.getMemberMsgFun();
						that.getMonthSignMsgGet();
						that.getSignInContinuousBonusGet();
						uni.showToast({
						    title: '补签成功',
						    duration: 2000
						});
						that.$refs.popup1.close();
					}else if(res.data.code == 1004){
						uni.showToast({
						    title: '积分不足',
						    duration: 2000,
							icon:'none'
						});
					}
					
				});
			},
			zeroFill(num){
				 return num < 10 ? '0' + num : '' + num; // 如果是1-9月，那么前面补0
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				let param = new Object();
				param.status = e.target.value ? 1 : 0;
				updateSignRemind(param).then(res =>{
					if(res.data.code == 200){
						uni.showToast({
						    title: '修改成功',
						    duration: 2000
						});
					}
				});
			},
			scroll: function(e) {
				console.log(e)

			},

			getMonthSignMsgGet(){
				var that = this;
				getMonthSignMsg().then(res =>{
					if(res.data.code == 200){
						that.selected = res.data.data;
					}
				});
			},
			getSignInContinuousBonusGet(){
				var that = this;
				getSignInContinuousBonus().then(res =>{
					if(res.data.code == 200){
						that.reward = res.data.data.continuousSignDetailVos;
						that.day = res.data.data.day;
						console.log(that.day);
						that.remainingDays = res.data.data.remainingDays;
						console.log(that.remainingDays);
						if(that.remainingDays == 0){
							that.getContinuousSignAwardFun(that);
						}
					}
				});
			},
			//领取连续签到奖励
			getContinuousSignAwardFun(that){
				getContinuousSignAward().then(res => {
					console.log(res);
					if(res.data.code == 200){
						that.getMemberMsgFun();
						that.getSignInContinuousBonusGet();
						that.$refs.popup.open();
					}
				})
			},
			//获取积分信息和签到信息
			getMemberMsgFun(){
				var that = this;
				getMemberMsg().then(res => {
					console.log(res);
					if(res.data.code == 200){
						that.userMsg = res.data.data;
					}
				})
			},
			cancel() {
				this.$refs.popup1.close()
			},
			
			signrules(){
				this.$refs.popup2.open();
				
			},
			closePopup2(){
				this.$refs.popup2.close()
			},
			openPopup(result) {
				var that = this;
					// that.$refs.popup.open();
					// 	setTimeout(function () {
					// 	that.$refs.popup.close();
					// },2800)
					// return
					
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg == 'getUserInfo:ok') {
					var param = new Object();
					param.signature = result.detail.signature;
					param.rawData = result.detail.rawData;
					param.encryptedData = result.detail.encryptedData;
					param.iv = result.detail.iv;
					userinfo(param).then(res => {
						if(res.data.code == 200){
						}
					})
				}
			//
				memberTodaySign().then(res => {
					console.log(res);
					if(res.data.code == 200){
						that.price = res.data.data
						that.getMemberMsgFun();
						that.getSignInContinuousBonusGet();
						that.$refs.popup.open();
							setTimeout(function () {
							that.$refs.popup.close();
						},2800)
						
					}
					
					
				})
				
			},
			closePopup() {
			
				
			},
			//获取积分排行榜
			getIntegerUserFun(){
				var param = new Object();
				param.pageNum = 1;
				param.pageSize = 10;
				getIntegerUser(param).then(res => {
					console.log(res);
					if(res.data.code == 200){
						this.tablelist = res.data.data.list;
					}
				})
			},
			//获取滚动消息
			getSignInMessageNotificationFun(){
				getSignInMessageNotification().then(res => {
					console.log(res);
					if(res.data.code == 200){
						this.text = res.data.data;
					}
				})
			},
			exchange(){
				uni.navigateTo({
					url: '/pages/pointsMall/pointsMall',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},
			pointstips(day){
				uni.showToast({
				  title: '已连续签到'+this.day+'天，还剩'+(day-this.day)+'天即可领取',
				  icon: 'none',
				  duration: 2500
				})
					// uni.showModal({
					// 		title: '提示',
					// 		content: '这是一个模态弹窗',
					// 		success: function(res) {
					// 			if (res.confirm) {
					// 			console.log('用户点击确定')
					// 			} else if (res.cancel) {
					// 			console.log('用户点击取消')
					// 			}
					// 		}
					// 	})
				
				
			}
			
	},
		onLoad(options){
			this.pageshow = false;
			console.log(options);
			onloadSaveAjax(options);
			if(options.source != null && options.source != ''){
				uni.setStorageSync("source", options.source);
			}
			//日历数据
			this.getMonthSignMsgGet();
			this.getSignInContinuousBonusGet();
			this.getMemberMsgFun();
			this.getIntegerUserFun();
			//
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			this.nowdate = year+"年"+month+"月";
			
			this.pageshow = true;
			setInterval(function(){
				this.getSignInMessageNotificationFun();
			},1000*60*10)
		},
		onShow() {
			this.getSignInMessageNotificationFun();
		}
// 		onLoad() {
// 		
// 			var self = this;
// 			var width = wx.getSystemInfoSync().screenWidth;
// 
// 			function carousel_num() {
// 
// 				var animation = wx.createAnimation({
// 					transformOrigin: "50% 50%",
// 					duration: 5000,
// 					timingFunction: "linear",
// 					delay: 0
// 				})
// 				self.animation = animation
// 				animation.translate3d(-width, 0, 100).step()
// 				console.log("第一动画开始");
// 				self.setData({
// 					animationData_notice: animation.export(),
// 				})
// 				setTimeout(function() {
// 					var animation = wx.createAnimation({
// 						transformOrigin: "50% 50%",
// 						duration: 0,
// 						timingFunction: "linear",
// 						delay: 0
// 					})
// 					self.animation = animation
// 					animation.translate3d(0, 0, 100).step()
// 					console.log("第二动画开始");
// 					self.setData({
// 						animationData_notice: animation.export(),
// 					})
// 					setTimeout(function() {
// 						carousel_num();
// 					}, 50)
// 				}, 5000)
// 			}
// 			setTimeout(function() {
// 				carousel_num();
// 			}, 100);
//      	}
	};
</script>

<style lang="scss">
	$font24:24rpx;
	$fontcolor:white;
	.uni-calender__active {
       color: #fd2e32;
	}

	.uni-calender__body-date-week .uni-calender__date.uni-calender__date-current.uni-calender__active .uni-calender__circle-box {
	background: none;
	color: #333;
	}
	.uni-calender__body-date-week .uni-calender__date.uni-calender__date-current .uni-calender__lunar {
	color: #fd2e32;
	}
	.uni-calender__body-date-week .uni-calender__date .uni-calender__lunar {
	
	color: #fd2e32;
	}

.uni-calender__body-date-week .uni-calender__date.uni-calender__date-current .uni-calender__circle-box {
	background: none;
	color: #fd2e32;
}


	.scroll_notice {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		white-space: nowrap;
		height: 65rpx;
		background-color: #e6513e;
	}

	.scroll_notice_item_image {
		position: absolute;
		left: 0px;
		top: 14rpx;
		width: 49rpx;
		height: 38rpx;
	}

	.scroll_notice_item {
		margin-left: 61rpx;
		margin-top: 14rpx;
		height: 37rpx;
		font-family: PingFangSC;
		font-size: 26rpx;
		font-weight: 500;
		letter-spacing: 1rpx;
		text-align: left;
		color: #fff;
	}

	.scroll_notice_item_bg {
		position: relative;
		margin-left: 20rpx;
		height: 100%;
		display: inline-flex;
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
			//animation-duration: 1s;
			//transform: translateY(0);
			transform:translate(0,0);
			}
		
		100% {
			opacity: 0;
			transform:translate(200px,-450px);
				
		}
	}

	.nowdate {
		font-size: 28rpx;
		color: #606266;
		line-height: 80rpx;
		padding-left: 20rpx;
	}
      .jifen{
			// background: white;
			// box-shadow: 0px 50px 100px #fff, 0px 0px 100px #fff, 0px 0px 100px #fff;  
			width:67%;
			height:67%;
			// border-radius: 50%;
			font-size: 26rpx;
			margin:0 auto;
			animation: hidePopup .8s linear both;
			animation-delay:2s;
		    text-align:center;
			
		  .getintegral {
				font-size: 26rpx;
				color: red;
				line-height: 3px;
				position: absolute;
				text-align:center;
				width: 100%;
				// left: 22%;
				bottom: 34%;
				
			}
		}
	

	.tipsbg {
		background: white;
		width: 100%;
		height: 260px;
		font-size: 26rpx;
		border-radius: 6px;
		line-height: 130rpx;
}
	.tipsbg1 {
		background: white;
		width:100%;
		height:400px;
		overflow: auto;
		font-size: 24rpx;
		border-radius: 6px;
		line-height: 40rpx;
		text-align: left;
		padding: 15px;
}
.iknow{
			color: #1AAD19;
			line-height:65rpx;
			border-top: 1px solid #ccc;
			background: white;
			font-size: 28rpx;
			text-align: center;
			margin-top: 20px;

		}
.sure::after {
		color: white;
		border-radius: 50px;
		font-size: 26rpx;

	}

	.cancel::after {
		color: white;
		//background: #DDDDDD;
		border-radius: 50px;
		font-size: 26rpx;

	}

	button[size=mini] {
		display: inline-block;
		line-height: 1.7;
		font-size: 26rpx;
		padding: 0 1em;
		color: white;
		border: none;

	}

	.tips {
		line-height: 10px;
		padding: 20px 0;
	}

	.uni-popup__wrapper-box {
		width: 65%;

	}

	.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
		background: none;

	}

	.close {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		line-height: 50px;
		background: white;
		color: gray;
		position: absolute;
		right: -6px;
		top: -6px;
	}




	.marquee_container {
		background-color: #FFCA37;
		height: 50rpx;
		line-height: 44rpx;
		position: relative;
		width: 100%;
		margin-top: 0rpx;
	}

	.marquee_container:hover {
		/* 不起作用 */
		animation-play-state: paused;
	}

	.marquee_text {
		color: #870000;
		font-size: 28rpx;
		display: inline-block;
		white-space: nowrap;
		animation-name: around;
		animation-duration: 10s;
		/*过渡时间*/
		animation-iteration-count: infinite;
		animation-timing-function: linear;

		.headerimg {
			width: 7%;
			height: 7%;
			border-radius: 50%;
			vertical-align: middle;
		}
	}

	.volume {
		width: 30rpx;
		background: #FFCA37;

		.volumeimg {
			width: 8%;
			height: 8%;
			vertical-align: middle;
			z-index: 99;
			position: absolute;
			left: 40rpx;
			top: 6rpx;

		}
	}

	.checkbg {
		background: url(http://img.soodii.com/7286e80e68784c7caef0f05890f1da22.jpg);
		background-size: 100% 100%;
		height: 220rpx;
		width: 100%;
	}

	.reward {
		background: url(http://img.soodii.com/1777c30ef023410a9be40fb32c1a05f5.PNG);
		background-size: 100% 100%;
		height: 380rpx;
		width: 100%;
		padding-top: 60rpx;

		.rewardbg {
			border-radius: 8px;
			padding-top: 110rpx;
		}

		.scroll-view_H {
			display: flex;
			white-space: nowrap;
			border-radius: 8px;
			width: 92%;
			margin: 0 auto;
			color: #9B1F1F;
			background: #FFFFFF;
			line-height: 75rpx;


			.scroll-view-item_H {
				height: 190rpx;
				width: 280rpx;
				display: inline-block;
				padding-top: 25rpx;
				padding-left: 14rpx;
				padding-right: 10rpx;

			}

			.jf {
				width: 100%;
				margin: 0 auto;
				position: relative;

				img {
					width: 100%;
					position: relative;
				}

				.wz {
					position: absolute;
					left: 32rpx;
					top: 5rpx;
				}

				.days {
					font-size: 22rpx;


				}

				.counts {
					font-size: 32rpx;

				}

				.received {
					position: absolute;
					left: 0;
					top: 0;
					background: rgba(0, 0, 0, .3);
					width: 100%;
					height: 89%;
					border-radius: 7px;

					view {
						box-shadow: white 0px 0px 10px;
						border-radius: 50%;
						width: 100rpx;
						height: 100rpx;
						color: white;
						font-size: 26rpx;
						text-align: center;
						line-height: 100px;
						margin: 38rpx auto;

					}
				}

			}
		}

	}

	.tablebg {
		width: 100%;
		background: #FF3838;
		padding-bottom: 40rpx;
	}

	.tabledata {
		width: 92%;
		margin: 0 auto;
		background: rgba(255, 179, 73, 0.28);
		border-radius: 12px;
		color: $fontcolor;
		margin-top: 30rpx;
		padding-bottom: 20rpx;

		.tabletitle {
			display: flex;
			margin: 0 auto;
			width: 100%;
			font-size: 26rpx;
			text-align: center;

			text {
				flex: 1;
				width: 20%;
				padding: 24rpx 0;

				img {
					width: 100%;
					border-radius: 50%;
				}
			}
		}

		.tablelist {
			padding-top: 10rpx;
			margin: 0 auto;
			text-align: center;
			padding-left: 38rpx;

			.ltem {
				display: flex;
				font-size: 22rpx;
				margin: 0 auto;
				width: 100%;
				text-align: center;

				text {
					flex: 1;
					width: 20%;
					line-height: 54rpx;
					text-align: left;
				}

				.name {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					width: 30%;
					line-height: 54rpx;
					text-align: left;
					img{
						border-radius: 50%;
					}
				}

			}


		}

		.border {
			height: 1px;
			background: white;
			width: 90%;
			margin: 0 auto;
			opacity: .5;
		}

		.img {
			width: 16%;
			height: 16%;
			vertical-align: middle;
		}

	}

	.border {
		width: 100%;
		height: 8rpx;
		background: #FFCA37;
	}

	.dw {
		position: relative;
		color: #fffff;

		.checkbtn {
			width: 200rpx;
			height: 200rpx;
			line-height: 200rpx;
			border: 5px solid #FFCA37;
			background-image: linear-gradient(180deg, #FFD441 0%, #FF9400 100%);
			color: white;
			font-size: 50rpx;
			text-align: center;
			position: absolute;
			left: 36%;
			bottom: -97rpx;
			border-radius: 50%;
			letter-spacing: 8rpx;
			z-index: 99;
		}

		.flexbox {
			color: $fontcolor;
			width: 92%;
			margin: 0 auto;
			text-align: center;
			padding-top: 10rpx;
			line-height: 60rpx;

			.exchangebtn {
				background: rgba(0, 0, 0, .3);
				border-radius: 34.2px;
				width: 100rpx;
				font-size: $font24;
				padding: 10rpx 30rpx;

			}

			.ljqd {
				font-size: $font24;
			}

			.count {
				color: #FFCA37;
				display: inline-block;
			}

		}
	}

	.calendar {
		padding-top: 82rpx;
		position: relative;
	}

	.checkrules {
		position: absolute;
		right: 0;
		top: 28rpx;
		background: #FFD6A0;
		color: #906020;
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		font-size: 22rpx;
		padding: 10rpx 30rpx;
	}

	.uni-calendar__wrapper .uni-calenda__content .uni-calendar__panel {
		display: none;
	}

	.uni-calendar__wrapper .uni-calenda__content .uni-calendar__header .uni-calendar__week {
		color: gray;
	}
	.uni-calender__body-date-week .uni-calender__date .uni-calender__data-circle {
background: white;
}
</style>
