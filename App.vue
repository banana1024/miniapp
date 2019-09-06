<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.setStorageSync("source", 6);
			var that = this;
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					that.saveClientType(1);
					break;
				case 'ios':
					that.saveClientType(2);
					break;
				default:
					that.saveClientType(0);;
					break;
			}
			uni.getProvider({
				service: "oauth",
				success: function(res) {
					console.log(res.provider);
					that.saveProvider(res.provider.join(","));
				}
			})

		},
		onShow: function(options) {
			console.log('App Show');
			console.log(options);
			this.saveScene(options.scene);
			console.log(this.scene)
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...mapMutations({
				'saveScene': 'saveScene',
				'saveClientType': 'saveClientType',
				'saveProvider': 'saveProvider'
			}),
		},
		computed: {
			...mapState({
				'scene': state => state.scene,
			}),
		},
	}
</script>


<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";

	.center {
		width: 100%;
		margin: 0 auto;
		text-align: center;
	}

	.fr {
		float: right;
	}

	.fl {
		float: left;
	}

	.textleft {
		text-align: left;
	}

	.textright {
		text-align: right;
	}

	.clear::after {
		height: 0;
		display: block;
		visibility: hidden;
		content: '';
		clear: both;
	}
</style>
