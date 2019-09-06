<template>
	<view style="width:100%;">
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/img/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<block v-if="address != null && address != ''">
				<view class="tel-name" >
					<view class="name">
						{{address.name}}
					</view>
					<view class="tel">
						{{address.phoneNumber}}
					</view>
				</view>
				<view class="addres">
					{{address.province}}-{{address.city}}-{{address.region}}
					{{address.detailAddress}}
				</view>
				</block>
				<block v-else>
					<view style="font-size: 30rpx;line-height: 80rpx;">请选择地址</view>
				</block>
				
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
		<!-- 	 <view class="row" v-for="(row,index) in buylist" :key="index"> -->
			<view class="row">
				<view class="goods-info" v-if="orderMsg.product">
					<view class="img">
						<image :src="orderMsg.product.pic"></image>
					</view>
					<view class="info">
						<view class="title">{{orderMsg.product.name}}</view>
						<view class="spec">数量:1</view>
						<view class="price-number">
							<view class="price">￥{{orderMsg.pointsNum}} 积分</view>
							<view class="number">
								
							</view>
						</view>
					</view>
				</view>
			</view> 
		</view>
		<!-- 提示-备注 -->
		<view class="order">
			<!-- <view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</view> 
			</view>-->
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view class="detail">
			<!-- <view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice|toFixed}}
				</view>
			</view> -->
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{orderMsg.expressPrice|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					积分
				</view>
				<view class="content">
					{{orderMsg.pointsNum|toFixed}}
				</view>
			</view>
		</view>
		<view class="blck">
			
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{orderMsg.payAmount|toFixed}}</view></view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {confirmOrder,submitOrder,unifiedOrder} from '@/common/vmeitime-http/'
	export default {
		data() {
			return {
				buylist:[],		//订单列表
				goodsPrice:0.0,	//商品合计价格
				sumPrice:0.0,	//用户付款价格
				freight:12.00,	//运费
				note:'',		//备注
				int:1200,		//抵扣积分
				deduction:0,	//抵扣价格
				productId:{name:""} //商品id
				,addressId:""  //地址id
				,orderMsg:"",
				address:"",
				confirmOrderFlag:true
			};
		},
		onLoad(e) {
			this.productId = e.productId;
			
		},
		onShow() {
			//页面显示时，加载订单信息
			
			var that = this;
			uni.getStorage({
				key: 'addressId',
				success: function (res) {
					that.addressId = res.data;
					//获取确认订单信息
					that.getConfirmOrderMsg();
				},
				fail:function(res){
					that.getConfirmOrderMsg();
				}
			});
		},
		onHide() {
			
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			clearOrder(){
				uni.removeStorage({
					key: 'buylist',
					success: (res)=>{
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			toPay(){
				var that = this;
				if(!that.confirmOrderFlag){
					uni.showToast({title:'请勿重复提交',icon:'none'});
					return;
				}
				that.confirmOrderFlag = false;
				//商品列表
				if(that.address == null || that.address == ''){
					uni.showToast({title:'地址不能为空',icon:'none'});
					return;
				}
				if(that.productId == null || that.productId == ''){
					uni.showToast({title:'订单信息有误，请重新购买',icon:'none'});
					return;
				}
				uni.showLoading({
					title:'正在提交订单...'
				})
				submitOrder({
					'orderNote':that.note,
					'addressId':that.addressId,
					'productId':that.productId
				}).then((res) => {
					console.log('request success', res)
					if (res.data.code == 200) {
						console.log(res.data.data);
						if(res.data.data.orderStatus == 0){
							that.handlePay(res.data.data.orderId);
						}else{
							uni.redirectTo({
								url:"../pay/success"
							})
						}
					}
					uni.showToast({title:res.data.message,icon:'none'});
					uni.hideLoading();
					that.confirmOrderFlag = true;
				}).catch((err) => {
					console.log('request fail', err);
					uni.hideLoading();
					that.confirmOrderFlag = true;
				})
				
			},
			//调用支付
			handlePay(orderId){
				unifiedOrder({
					'orderId':orderId
				}).then((res) => {
					console.log('request success', res)
					if (res.data.code == 200) {
						console.log(res.data.data);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.data.timeStamp,
							nonceStr: res.data.data.nonceStr,
							package: res.data.data.packageValue,
							signType: res.data.data.signType,
							paySign: res.data.data.paySign,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
								uni.redirectTo({
									url:"../pay/success"
								})
							},
							fail: function (err) {
								uni.redirectTo({
									url:"../myOrder/myOrder?tbIndex=1"
								})
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
				
			},
			//选择收货地址
			selectAddress(){
				uni.navigateTo({
					url:'../address/address?type=select'
				})
			},
			getConfirmOrderMsg(){
				var that = this;
				confirmOrder({
					productId:that.productId,
					addressId:that.addressId
				}).then((res) => {
					console.log('request success', res)
					if (res.data.code == 200) {
						console.log(res.data.data);
						that.orderMsg = res.data.data;
						that.address = res.data.data.umsMemberReceiveAddress;
						if(res.data.data.umsMemberReceiveAddress != null && res.data.data.umsMemberReceiveAddress != ''){
							that.addressId = res.data.data.umsMemberReceiveAddress.id;
						}
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
			}
		}
	}
</script>

<style lang="scss">
.addr{
	width: 86%;
	padding: 20upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	display: flex;
	.icon{
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		vertical-align: middle;
		image{
			width: 40upx;
			height: 40upx;
		}
	}
	.tel-name{
		width: 100%;
		display: flex;
		font-size: 32upx;
		.tel{
			margin-left: 40upx;
		}
	}
	.addres{
		width: 100%;
		font-size: 26upx;
		color: #999;
	}
}
.buy-list{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 30upx 0;
		.goods-info{
			width: 100%;
			display: flex;
			.img{
				width: 22vw;
				height: 22vw;
				border-radius: 10upx;
				overflow: hidden;
				flex-shrink: 0;
				margin-right: 10upx;
				image{
					width: 22vw;
					height: 22vw;
				}
			}
			.info{
				width: 100%;
				height: 22vw;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				position: relative;
				.title{
					width: 100%;
					font-size: 28upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					// text-align: justify;
					overflow: hidden;
				}
				.spec{
					font-size: 22upx;
					background-color: #f3f3f3;
					color: #a7a7a7;
					height: 40upx;
					display: flex;
					align-items: center;
					padding: 0 10upx;
					border-radius: 20upx;
					margin-bottom: 20vw;
				}
				.price-number{
					position: absolute;
					width: 100%;
					bottom: 0upx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					font-size: 28upx;
					height: 40upx;
					.price{
						color: #f06c7a;
					}
					.number{
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
	}
}
.order{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 20upx 0;
		height: 40upx;
		display: flex;
		.left{
			font-size: 28upx;
		}
		.right{
			margin-left: 40upx;
			font-size: 26upx;
			color: #999;
			input{
				font-size: 26upx;
				color: #999;
			}
		}
	}
}
.blck{
	width: 100%;
	height: 100upx;
}
.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		
		.settlement{
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 60upx;
				background-color:#FF3B1E;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}
.detail{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		height: 60upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nominal{
			font-size: 28upx;
		}
		.content{
			font-size: 26upx;
			color: #f06c7a;
		}
	}
}
</style>
