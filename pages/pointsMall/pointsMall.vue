<template>
	<view>

		<view class="pointbg">
			<view class="clear box">
				<!-- #ifdef MP-WEIXIN || MP-BAIDU -->
				<button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="mpGetUserInfo" plain size="mini" style="height:110rpx;padding: 0 0;width:110rpx;border:0;"
				 class="fl">
					<img :src="memberMsg.headImg ? memberMsg.headImg : '../../static/img/login.png'" alt="" mode="widthFix">
				</button>
				<!-- #endif -->
				<view class="fl" style="width:45%;margin-left:10px;">
					<text style="font-size: 22rpx;">当前积分\n</text>
					<view class="dis" style="font-size:42rpx">{{memberMsg.integral}} </view><span>\t\t\t\t<img src="../../static/img/qianbi.png" alt=""
						 mode="widthFix" style="width:10%;"></span>
				</view>
				<view @click="order">
					<img src="../../static/img/order.png" alt="" mode="widthFix" style="width: 20%;padding:40rpx 5rpx;" class="fr">
				</view>
			</view>
		</view>
		<tabList :tabList="tablist" @tabSelect="select"></tabList>
		<view>
			<view class="uni-product-list" v-if="tabSelect == 0">
				<view class="uni-product" v-for="(product,index) in productList" :key="index" @click="toGoodsProduct(product.id)">
					<view class="image-view">
						<image v-if="renderImage" class="uni-product-image" :src="product.pic" mode="widthFix"></image>
						<view class="soldout" v-if="hidden">
							<view>已售罄</view>
						</view>
					</view>
					<view class="uni-product-title">{{product.name}}</view>
					<view class="uni-product-price">
						<!-- <text class="uni-product-price-favour">￥{{product.originalPrice}}</text> -->
						<text class="uni-product-price-original">{{product.pointsNumber}}积分</text>
						<text class="uni-product-tip">已兑换{{product.saleNum}}</text>
					</view>
				</view>
			</view>
			
			<view class="uni-product-list" v-if="tabSelect == 1">
				<view class="uni-product" v-for="(product,index) in userOrderList" :key="index">
					<view class="image-view">
						<image v-if="renderImage" class="uni-product-image" :src="product.productPic" mode="widthFix"></image>
						<view class="soldout" v-if="hidden">
							<view>已售罄</view>
						</view>
					</view>
					<view class="uni-product-title">{{product.productName}}</view>
					<view class="uni-product-price">
						<!-- <text class="uni-product-price-favour">￥{{product.originalPrice}}</text> -->
						<text class="uni-product-price-original">{{product.useIntegration}}积分</text>
						<text class="uni-product-tip"></text>
					</view>
				</view>
			</view>

		</view>
		<view class="fixedtips" v-if="msgViewHidden">
			<img :src="msg.headImg" alt="" mode="widthFix" style="width:10%">
			{{msg.nickname}}已兑换商品一件
		</view>



	</view>
</template>

<script>
	import tabList from "@/components/xyz-tab/xyz-tab.vue"
	import {
		getMemberMsg,
		userinfo,
		getProductPageList,
		getUserOrders
	} from '@/common/vmeitime-http/'
	import {onloadSaveAjax} from '@/common/util.js'
	export default {
		components: {
			tabList
		},
		data() {
			return {
				title: 'product-list',
				productList: [],
				renderImage: false,
				tablist: [{
						label: "商品兑换"
					}, {

						label: "兑换记录"

					}


				],
				userOrderList:[],//兑换列表
				tabSelect: 0,
				memberMsg:'',//用户信息
				productListPageSize:8,
				productListPageNum:1,
				userOrderListPageNum:1,
				userOrderListPageSize:8,
				msgViewHidden:false,
				msg:''
			}
		},
		methods: {
			loadData(action = 'add') {
				const data = [{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
						title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
						favourPrice: '8888积分',
						tip: '已兑换1000'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
						favourPrice: 3399,
						tip: '已兑换1056'
					}

				];

				if (action === 'refresh') {
					this.productList = [];
				}

				data.forEach(item => {
					this.productList.push(item);
				});
			},
			select(e) {
				console.log(e)
				this.tabSelect = e;
				if(e == 0){
					let param = new Object();
					param.pageSize = this.productListPageSize;
					param.pageNum = this.productListPageNum;
					this.productList = [];
					this.getProductPageListFun(param);
				}else if(e == 1){
					let param = new Object();
					//param.pageSize = this.userOrderListPageSize;
					//param.pageNum = this.userOrderListPageNum;
					this.getUserOrdersFun(param); 
				}
			},
			order() {
				uni.navigateTo({
					url: '/pages/myOrder/myOrder?tbIndex=0',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			mpGetUserInfo(result) {
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				var param = new Object();
				param.signature = result.detail.signature;
				param.rawData = result.detail.rawData;
				param.encryptedData = result.detail.encryptedData;
				param.iv = result.detail.iv;
				userinfo(param).then(res => {
					if(res.data.code == 200){
						this.getMemberMsgFun();
					}
				})
			},
			//获取用户信息
			getMemberMsgFun(){
				getMemberMsg().then(res => {
					if(res.data.code == 200){
						this.memberMsg = res.data.data;
					}
				})
			},
			//商品兑换列表
			getProductPageListFun(param){
				getProductPageList(param).then(res => {
					if(res.data.code == 200){
						this.productListPageNum = res.data.data.pageNum;
						this.productListPageSize = res.data.data.pageSize;
						res.data.data.list.forEach(item => {
							this.productList.push(item);
						})
					}
				})
			},
			getUserOrdersFun(param){
				getUserOrders(param).then(res => {
					if(res.data.code == 200){
						this.userOrderList = res.data.data;
					}
				})
			},
			toGoodsProduct(id){
				uni.navigateTo({
					url: '/pages/product/product?goodsId='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},

		onLoad(options) {
			onloadSaveAjax(options);
			if(options.source != null && options.source != ''){
				uni.setStorageSync("source", options.source);
			}
			let param = new Object();
			param.pageSize = this.productListPageSize;
			param.pageNum = this.productListPageNum;
			this.getProductPageListFun(param);
			setTimeout(() => {
				this.renderImage = true;
			}, 300);
			
			uni.connectSocket({
			  url: 'wss://m.soodii.com/hyb-wx-api/websocket',
			  header: {
			      'content-type': 'application/json'
			  },
			});
			
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
			});
			var that = this;
			that.msgViewHidden = false;
			uni.onSocketMessage(function (res) {
			  console.log('收到服务器内容：' + res.data);
			  that.msgViewHidden = true;
			  that.msg = JSON.parse(res.data);
			  setTimeout(function(){
				  that.msgViewHidden = false;
			  },3000)
			});
		},
		onShow(){
			this.getMemberMsgFun();
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
			if(this.tabSelect == 0){
				let param = new Object();
				param.pageSize = this.productListPageSize;
				param.pageNum = this.productListPageNum + 1;
				this.getProductPageListFun(param);
			}else if(this.tabSelect == 1){
				/* let param = new Object();
				param.pageSize = this.userOrderListPageSize;
				param.pageNum = this.userOrderListPageNum + 1;
				this.getUserOrdersFun(param); */
			}
			
		}
	}
</script>

<style lang="scss">
	.fixedtips {
		width: 50%;
		border-radius: 20px;
		color: white;
		font-size: 24rpx;
		position: fixed;
		left: 32rpx;
		background: rgba(16, 16, 16, 0.50);
		padding-left: 10rpx;
		line-height: 40rpx;

		img {
			vertical-align: middle;
			padding-right: 8rpx;
			border-radius: 50%;
		}
	}

	.box {
		width: 95%;
		margin: 0rpx auto;
		padding-top: 50rpx;

		img {
			vertical-align: middle;
			width: 100%;
			padding: 0rpx 0rpx;
			border-radius: 50%;
		}
	}

	.pointbg {
		background: url(http://img.soodii.com/a27d5b0e8fb2456bbe0e74a799def49e.jpg);
		background-size: 100% 100%;
		height: 220rpx;
		width: 100%;
		color: white;

	}

	.dis {
		display: inline-block;
	}

	.uni-product-list {
		display: flex;
		width: 93%;
		margin: 0 auto;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.uni-product {
		/* padding: 20upx; */
		display: flex;
		flex-direction: column;
		border: 1px solid #DCDFE6;
		border-radius: 8px;
		margin: 8px;
		padding: 10rpx;
		width: 44%;
	}

	.image-view {
		width: 100%;
		margin: 3upx 0;
		position: relative;

		.soldout {
			position: absolute;
			left: 0;
			top: 0;
			// width: 100%;
			background: rgba(16, 16, 16, 0.50);
			color: white;
			width: 100%;
			height: 300px;
			line-height: 300px;
			text-align: center;

			view {
				border: 1px solid white;
				border-radius: 100%;
				width: 150px;
				height: 150px;
				line-height: 150px;
				text-align: center;
				position: absolute;
				left: 26%;
				top: 22%;


			}
		}
	}

	.uni-product-image {
		width: 100%;
	}

	.uni-product-title {
		width: 100%;
		height: 35px;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 22rpx;
	}

	.uni-product-price {
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.uni-product-price-original {
		font-size: 24rpx;
		color: #FF3B1E;
		font-family: PingFangSC-Medium;
	}

	.uni-product-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.uni-product-tip {
		position: absolute;
		right: 10upx;
		color: #606266;
		padding: 0 10upx;
		font-size: 20rpx;
		top: 6rpx;
	}
</style>
