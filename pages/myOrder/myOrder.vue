<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="list.length==0">
					<image src="../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type" v-if="row.status == 0">等待付款</view>
					<view  class="type" v-else-if="row.status == 1">等待商家发货</view>
					<view class="type" v-else-if="row.status == 2">商家已发货</view>
					<view class="type" v-else-if="row.status == 3">订单已完成</view>
					<view class="order-info">
						<view class="left">
							<image :src="row.productPic"></image>
						</view>
						<view class="right">
							<view class="name">
								{{row.productName}}
							</view>
							<!-- <view class="spec">{{row.spec}}</view> -->
							<view class="price-number">
								<view class="price">{{row.productIntegral}}积分</view>
								x<view class="number">{{row.productQuantity}}</view>
							</view>
						</view>
						
					</view>
					<view class="detail">
						<view class="number">共{{row.productQuantity}}件商品</view><view class="sum">合计<view class="price">{{row.useIntegration}}积分</view></view><view class="nominal" v-if="row.freightAmount">(运费 ￥{{row.freightAmount}})</view>
					</view>
					<view class="btns">
						<button open-type="contact" size="mini" style="background: none;border-radius: 25px;border: 0;width:200px;margin: 0 0;">
						<view class="default">联系客服</view></button>
						<block v-if="row.status== 0">
						
							<view class="default" @tap="cancelOrder(row)">取消订单</view>
							<view class="pay" @tap="handlePay(row.id)">付款</view>
						</block>
						<!-- <block v-if="row.status==1"><view class="default" @tap="remindDeliver(row)">提醒发货</view></block> -->
						<block v-if="row.status==2"><view class="default" @tap="showLogistics(row)">查看物流</view><view class="pay" @click="confirmOrder(row.id)">确认收货</view></block>
						<!-- <block v-if="row.status==3"><view class="default">评价</view><view class="default">再次购买</view></block> -->
						<!-- <block v-if="row.type=='completed'"><view class="default">再次购买</view></block>
						<block v-if="row.type=='refunds'"><view class="default">查看进度</view></block>
						<block v-if="row.type=='cancelled'"><view class="default">已取消</view></block> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getMemberOrderList,
		closeUnpaidOrderById,
		confirmOrderById,
		unifiedOrder
	} from '@/common/vmeitime-http/'
	export default {
		data() {
			return {
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['全部','待付款','待发货','待收货','已完成'],
				list:[],
				tabbarIndex:0
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex);
			//this.list = this.orderList[tbIndex];
			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			var param = new Object();
			param.status = tbIndex - 1;
			this.getMemberOrderListFun(param);
		},
		onPageScroll(e){
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				var param = new Object();
				param.status = tbIndex - 1;
				this.getMemberOrderListFun(param);
			},
			showLogistics(row){
				uni.navigateTo({
					url: '/pages/logistics/logistics?id='+row.id+"&img="+row.productPic+"&name="+row.productName,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
			},
			remindDeliver(row){
				uni.showToast({
					title:'已提醒商家发货'
				})
			},
			cancelOrder(row){
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res)=>{
						if (res.confirm) {
							console.log('用户点击确定');
							var param = new Object();
							param.id = row.id;
							var that = this;
							closeUnpaidOrderById(param).then(res => {
								if(res.data.code == 200){
									console.log(res);
									uni.showToast({
									    title: '取消成功',
									    duration: 2000,
										icon:'none'
									});
									that.list = that.list.filter(res => {
										return res.id != row.id;
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//调用支付
			handlePay(orderId){
				let that = this;
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
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
				
			},
			confirmOrder(id){
				var that = this;
				var param = new Object();
				param.id = id;
				confirmOrderById(param).then(res => {
					if(res.data.code == 200){
						console.log(res);
						uni.showToast({
						    title: '操作成功',
						    duration: 2000,
							icon:'none'
						});
						that.list = that.list.filter(res => {
							return res.id != id;
						})
					}
				})
			},
			doCancelOrder(ordersn){
				let typeNum = this.orderList.length;
				for(let i=0;i<typeNum;i++){
					let list = this.orderList[i];
					let orderNum = list.length;
					if(orderNum>0 && list[0].type=='unpaid'){
						for(let j=0;j<orderNum;j++){
							if(this.orderList[i][j].ordersn == ordersn){
								this.orderList[i][j].type = 'cancelled';
								break;
							}
						}
					}
					
				}
			},
			//获取订单列表
			getMemberOrderListFun(param){
				getMemberOrderList(param).then(res => {
					if(res.data.code == 200){
						console.log(res);
						this.list = res.data.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
button::after{
		width:auto;
		height:auto;
	}
page{
	background-color: #f3f3f3;
}
.topTabBar{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #f8f8f8;
	height: 80upx;
	display: flex;
	justify-content: space-around;
	.grid{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 4upx #f06c7a;
			}
		}
		
	}
}
.order-list{
	margin-top: 80upx;
	padding-top: 20upx;
	width: 100%;
	.list{
		width: 94%;
		margin: 0 auto;
		.onorder{
			width: 100%;
			height: 50vw;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			.text{
				width: 100%;
				height: 60upx;
				font-size: 28upx;
				color: #444;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.row{
			width: calc(100% - 40upx);
			padding: 10upx 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
			.type{
				font-size: 26upx;
				color: #ec652f;
				height: 50upx;
				display: flex;
				align-items: center;
			}
			.order-info{
				width: 100%;
				display: flex;
				.left{
					flex-shrink: 0;
					width: 25vw;
					height: 25vw;
					image{
						width: 25vw;
						height: 25vw;
						border-radius: 10upx;
					}
				}
				.right{
					width: 100%;
					margin-left: 10upx;
					position: relative;
					.name{
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.spec{
						color: #a7a7a7;
						font-size: 22upx;

					}
					.price-number{
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						font-size: 22upx;
						color: #333;
						display: flex;
						align-items: flex-end;
						.price{
							font-size: 24upx;
							margin-right: 5upx;
						}
						
					}
				}
			}
			.detail{
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				height: 60upx;
				font-size: 26upx;
				.sum{
					padding: 0 8upx;
					display: flex;
					align-items: flex-end;
					.price{
						font-size: 30upx;
					}
				}
				
			}
			.btns{
				height:70upx;
				line-height: 93px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				view{
					min-width: 100upx;
					height:40upx;
					padding: 0 20upx;
					border-radius: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24upx;
					margin-left: 20upx;
				}
				.default{
					border: solid 1upx #ccc;
					color: #666;
				}
				.pay{
					border: solid 1upx #ec652f;
					color: #ec652f;
				}
			}
		}
	}
}
</style>
