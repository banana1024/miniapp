<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(row,index) in address" :key="index" @tap="select(row.id)">
					<view class="left">
						<view class="head">
							{{row.head}}
						</view>
					</view>
					<view class="center">
						<view class="name-tel">
							<view class="name">{{row.name}}</view>
							<view class="tel">{{row.phoneNumber}}</view>
							<view class="default" v-if="row.defaultStatus == 1">
								默认
							</view>
						</view>
						<view class="address">
							{{row.province}}-{{row.city}}-{{row.region}} {{row.detailAddress}}
						</view>
					</view>
					<view class="right">
						<view class="icon bianji" @tap.stop="edit(row)">
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
		<view class="addWx">
		<view class="btn" @tap="getWxAddress()">
			<view class="icon tianjia"></view>微信地址
		</view>
		</view>
	</view>
</template>
<script>
	import {
		getAddressByUserId,
		addWeChatAddress
	} from '@/common/vmeitime-http/'
	export default {
		data() {
			return {
				isSelect:false,
				addressList:[],
				address:[]
			};
		},
		onShow() {
			this.getAddressList()
			uni.getStorage({
				key:'delAddress',
				success: (e) => {
					let len = this.addressList.length;
					if(e.data.hasOwnProperty('id')){
						for(let i=0;i<len;i++){
							if(this.addressList[i].id==e.data.id){
								this.addressList.splice(i,1);
								break;
							}
						}
					}
					uni.removeStorage({
						key:'delAddress'
					})
				}
			})
			uni.getStorage({
				key:'saveAddress',
				success: (e) => {
					let len = this.addressList.length;
					if(e.data.hasOwnProperty('id')){
						for(let i=0;i<len;i++){
							if(this.addressList[i].id==e.data.id){
								this.addressList.splice(i,1,e.data);
								break;
							}
						}
					}else{
						let lastid = this.addressList[len-1];
						lastid++;
						e.data.id = lastid;
						this.addressList.push(e.data);
					}
					uni.removeStorage({
						key:'saveAddress'
					})
				}
			})
		},
		onLoad(e) {
			if(e.type=='select'){
				this.isSelect = true;
			}
			
		},
		methods:{
			edit(row){
				uni.navigateTo({
					url:"edit/edit?type=edit&id="+row.id
				})
				
			},
			add(){
				uni.navigateTo({
					url:"edit/edit?type=add"
				})
			},
			select(id){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if(!this.isSelect){
					return ;
				}
				uni.setStorage({
					key:'addressId',
					data:id,
					success() {
						uni.navigateBack();
					}
				})
			},
			//获取地址列表
			getAddressList(){
				var that = this;
				getAddressByUserId().then((res) => {
					console.log('request success', res)
					if (res.data.code == 200) {
						that.address = res.data.data;
						that.address.forEach(function(value, index, array) {
							value.head = value.name.substring(0, 1)
						});
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			getWxAddress(){
				var that = this;
				uni.authorize({
				    scope: 'scope.address',
				    success() {
				        uni.chooseAddress({
				          success(res) {
				            console.log(res.userName)
				            console.log(res.postalCode)
				            console.log(res.provinceName)
				            console.log(res.cityName)
				            console.log(res.countyName)
				            console.log(res.detailInfo)
				            console.log(res.nationalCode)
				            console.log(res.telNumber)
							var param = new Object();
							param.city = res.cityName;
							param.name = res.userName;
							param.phoneNumber = res.telNumber;
							param.detailAddress = res.detailInfo;
							param.postCode = res.postalCode;
							param.province = res.provinceName;
							param.region = res.countyName;
							addWeChatAddress(param).then((result) => {
								if (result.data.code == 200) {
									that.getAddressList()
								}
							}).catch((err) => {
								console.log('request fail', err);
							})
				          }
				        })
				    },
					fail() {
						console.log("失败")
						
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
view{
	display: flex;
}
	.icon {
		// &.bianji {
		// 	&:before{content:"\e61b";}
		// }
		// &.tianjia {
		// 	&:before{content:"\e81a";}
		// }
	}
	.add{
		position: fixed;
		bottom: 0;
		width: 50%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.addWx{
		position: fixed;
		bottom: 0;
		right:10px;
		width: 50%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.list{
		flex-wrap: wrap;
		.row{
			width: 96%;
			padding: 20upx 2%;
			.left{
				width: 90upx;
				flex-shrink: 0;
				align-items: center;
				.head{
					width: 70upx;
					height: 70upx;
					background:linear-gradient(to right,#ccc,#aaa);
					color: #fff;
					justify-content: center;
					align-items: center;
					border-radius: 60upx;
					font-size: 35upx;
				}
			}
			.center{
				width: 100%;
				flex-wrap: wrap;
				.name-tel{
					width: 100%;
					align-items: baseline;
					.name{
						font-size: 34upx;
					}
					.tel{
						margin-left: 30upx;
						font-size: 24upx;
						color: #777;
					}
					.default{

						font-size: 22upx;
						
						background-color: #f06c7a;
						color: #fff;
						padding: 0 18upx;
						border-radius: 24upx;
						margin-left: 20upx;
					}
				}
				.address{
					width: 100%;
					font-size: 24upx;
					align-items: baseline;
					color: #777;
				}
			}
			.right{
				flex-shrink: 0;
				align-items: center;
				margin-left: 20upx;
				.icon{
					justify-content: center;
					align-items: center;
					width: 80upx;
					height: 60upx;
					border-left: solid 1upx #aaa;
					font-size: 40upx;
					color: #777;
				}
			}
		}
	}
</style>
