<template>
	<view class="box" @click="tips">
		<uni-popup ref="popup" type="center" custom="true" style="position: relative;">
			<view style="line-height: 32px;margin-bottom: 30px;" >
				
					<view class="tipsbg1">
					请到公众号菜单栏签到哦！
						<view class="iknow" @click="closePopup">
							我知道了
						</view>
					</view>
				
				</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
			},
		data() {
			return {
				
			}
		},
		methods: {
			tips(){
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			}
			
		},
		onLoad() {
			uni.redirectTo({
			    url: '../index/index'
			});
		}
	}
</script>

<style>
	.iknow{
				color: #1AAD19;
				line-height:52rpx;
				border-top: 1px solid #ccc;
				background: white;
				font-size: 28rpx;
				text-align: center;
				margin-top: 20px;
	
			}
	.tipsbg1 {
			background: white;
			width:100%;
			height:100px;
		
			font-size: 24rpx;
			border-radius: 6px;
			line-height: 40rpx;
			text-align: center;
			padding: 15px;
	}

.box{
	width: 100%;
	height: 1550rpx;
	background: url(http://img.soodii.com/7aa577ba63cd42e7a8a26c23bd528304.jpg);
	background-size: 100% 100%;
}
</style>
