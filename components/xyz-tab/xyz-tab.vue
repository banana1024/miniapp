<template>
	<view class="tab">
		<scroll-view scroll-x style="height: 80rpx;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="tab_main" :class="tabLen ? 'flex_around' : ''">
				<view style="display: inline-block;" :class="index == tabIdx ? 'tab_active' : ''" v-for="(item, index) in tabList" :key="index" @click="tabSelect(index)">
					{{ item.label }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabList: {
			type: Array,
			default: []
		},
		tabActiveIdx: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			tabIdx: 0,
			scrollLeft: 0
		};
	},
	computed: {
		tabLen() {
			return this.tabList.length > 5 ? false : true;
		}
	},
	watch: {
		tabActiveIdx(newValue, oldValue) {
			this.tabSelect(newValue);
		}
	},
	methods: {
		tabSelect(idx) {
			this.tabIdx = idx;
			this.scrollLeft = idx * 30;
			this.$emit('tabSelect', idx);
		}
	}
};
</script>
<style>
.flex_around {
	display: flex;
	justify-content: space-around;
}

	.tab_main {
		font-size: 28upx;
		color: #2E2E2E;
		/* height: 15upx; */
		line-height: 0upx;
		width: 70%;
		margin: 0 auto;
		font-weight: 600;
	}
	.tab_main view {
		padding: 0 20upx;
		height: 15upx;
		line-height: 0upx;
		margin-top: 40px;
		font-size: 28upx;
	}
	.tab_active {
		font-size: 28upx;
		margin-top: 92rpx;
		height: 15upx;
		color: #2E2E2E;
		border-top: 1upx solid #ddd;
		border-image: -webkit-linear-gradient(138deg, #FA910F 0%, #D81A37 100%);
		border-image: -moz-linear-gradient(138deg, #FA910F 0%, #D81A37 100%);
		border-image: -o-linear-gradient(138deg, #FA910F 0%, #D81A37 100%);
		background-image: linear-gradient(138deg, #FA910F 0%, #D81A37 100%);
	}
	.flex_around{
		height: 40px;
	}
</style>
