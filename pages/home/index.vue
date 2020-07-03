<template>
	<div id='home' class='home'>
		<div class="home_title">
			<div class="taskbar" :style="'height:'+taskbarHight+'px'"></div>
			<div class="navigation">
				<div class="site">
					<div class="icon">
						<i class='iconfont icon-dingwei'></i>
					</div>
					<div class="siteInfo">{{currentAddress}}</div>
					<div class="gt"> &gt; </div>
				</div>
			</div>
		</div>
		<div class="home_main" :style="'margin-top:'+ (Number(taskbarHight) + 44) +'px;'">
			<div class="seek">
				<i class='iconfont icon-sousuo'></i>
				<p>好吃烧烤摊，20起送</p>
			</div>
			<div class="product">
				<swiper class="swiper" @change="change" >
					<swiper-item v-for="(list,num) in proTitleListTier" :index="num" :key="num">
						<u-grid :col="5" @click="click" :border="false">
							<u-grid-item v-for="(item, index) in list" :index="index" :key="index">
								<u-icon :name="item" :size="46"></u-icon>
								<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
				<view class="indicator-dots">
					<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
					</view>
					<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
					</view>
					<view class="indicator-dots-item" :class="[current == 2 ? 'indicator-dots-active' : '']">
					</view>
				</view>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex';
	import SlideTitle from './slide-title.vue';
	export default {
		name:'home',
		data() {
			return {
				time : "",
				current: 0,
				list: ['integral', 'kefu-ermai', 'coupon', 'gift', 'scan', 'pause-circle', 'wifi', 'email', 'list']
			}
		},
		onReady:function (){
			this.init();
		},
		components:{
			SlideTitle
		},
		computed:{
			...mapGetters(["proTitleList","currentAddress","taskbarHight"]),
			proTitleListTier:()=>{
				let k = Math.ceil(this.proTitleList.length / 10);
				let data = [];
				for(let i=0;i<k;i++){
					let num = i === (k-1) ? (this.proTitleList.length - 1) : (i * 10 + 9)
					data.push(this.proTitleList.slice((i * 10),num))
				}
				return data
			}
		},
		methods: {
			...mapActions(["getProTitleList","getCurrentAddress","getTaskbarHight"]),
			init(cd){
				cd ? this.getCurrentAddress(true) :this.getCurrentAddress();
				this.getTaskbarHight();
				// this.time = new Date().Time("yyyy-MM-dd hh:mm:ss");
				// this.$refs[SlideTitle].getListData(cd).then(res=>{
				// 	console.log("成功")
				// 	cd && cd();
				// }).catch(err=>{
				// 	console.log("失败");
				// 	cd && cd();
				// })
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>
<style lang="scss">
	.home{
		background: linear-gradient(left, #fec44d, #fee04d);
	}
	.home_title{
		width: 100%;
		background: linear-gradient(left, #fec44d, #fee04d);
		position: fixed;
		top: 0;
		z-index: 1000;
		.navigation{
			height: 44px;
			.site{
				display: flex;
				height: 44px;
				line-height: 44px;
				width: 540rpx;
				.icon{
					height: 44px;
					margin-left: 30rpx;
					margin-right: 10rpx;
					width: 40rpx;
					i{
						font-size: 40rpx;
					}
				}
				.siteInfo{
					font-size: 32rpx;
					color: #33312e;
					white-space:nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.gt{
					width: 20rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.home_main{
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		background-color: #fcfcfd;
		padding-top: 30rpx;
		.seek{
			margin: 0 20rpx;
			background-color: #f1f1f2;
			border-radius: 50rpx;
			width: 710rpx;
			height: 66rpx;
			display: flex;
			line-height: 66rpx;
			color: #868788;
			i{
				margin-left: 30rpx;
			}
			p{
				margin:0 10rpx;
				white-space:nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.product{
			background-color: #fff;
			background-color: #aaa;
			width: 703rpx;
			margin: 22rpx 23.5rpx;
			border-radius: 20rpx;
			height: 324rpx;
			.swiper {
				height: 288rpx;
				.u-grid-item{
					background-color: rgba(0,0,0,0) !important;
				}
				.u-grid-item-box{
					padding: 0;
				}
			}
			.indicator-dots {
				margin-top: 17rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.indicator-dots-item {
					background-color: $u-tips-color;
					height: 12rpx;
					width: 12rpx;
					border-radius: 12rpx;
					margin: 0 3px;
				}
				.indicator-dots-active {
					background-color: $u-type-primary;
				}
			}
		}
	}
</style>
