<template>
	<div id='home' class='home'>
		<div :style="'height:' + (Math.round(Number(taskbarHight * 750) / windowWidth) + 90) + 'rpx;'">
			<div class="home_title" :style="'background:'+ (sticky ? ';' : '#fefefe;')">
				<div class="taskbar" :style="'height:'+taskbarHight+'px'"></div>
				<div class="navigation">
					<div class="site" v-if="sticky">
						<div class="icon">
							<i class='iconfont icon-dingwei'></i>
						</div>
						<div class="siteInfo">{{currentAddress}}</div>
						<div class="gt">
							<u-icon name="arrow-right" size="20"></u-icon>
						</div>
					</div>
					<div class="seek" v-else>
						<i class='iconfont icon-sousuo'></i>
						<p>好吃烧烤摊，20起送</p>
					</div>
				</div>
			</div>
		</div>
		<div class="home_main" >
			<div class="seek">
				<i class='iconfont icon-sousuo'></i>
				<p>好吃烧烤摊，20起送</p>
			</div>
			<div class="product">
				<swiper class="swiper" @change="change" >
					<swiper-item v-for="(list,num) in proTitleListTier" :index="num" :key="num">
						<u-grid :col="5"  :border="false">
							<u-grid-item v-for="(item, index) in list" :index="index" :key="index" @click="goList(item.name)">
								<image class="pic" :src="item.pic" mode=""></image>
								<b>{{ item.name }}</b>
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
				<view class="indicator-dots">
					<view class="indicator-dots-item" 
						v-for="(list,num) in proTitleListTier" 
						:index="num" :key="num" 
						:class="[current == num ? 'indicator-dots-active' : '']">
					</view>
				</view>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		name:'home',
		data() {
			return {
				time : "",
				current: 0,
				sticky:true
			}
		},
		onReady:function (){
			this.init();
		},
		components:{
		},
		computed:{
			...mapGetters(["proTitleList","currentAddress","taskbarHight","windowWidth"]),
			proTitleListTier:(vm)=>{
				let k = Math.ceil(vm.proTitleList.length / 10);
				let data = [];
				for(let i=0;i<k;i++){
					let num = i === (k-1) ? (vm.proTitleList.length) : (i * 10 + 10)
					data.push(vm.proTitleList.slice((i * 10),num))
				}
				return data
			}
		},
		methods: {
			...mapActions(["getProTitleList","getCurrentAddress","getSystemInfo","authorizeSite"]),
			init(cd){
				this.authorizeSite(()=>{
					this.getCurrentAddress(cd ? true : false);
				})
				this.getSystemInfo();
				this.getProTitleList().then(res=>{
					cd && cd();
				}).catch(err=>{
					cd && cd();
				})
			},
			change(e) {
				this.current = e.detail.current;
			},
			goList(data){
				uni.navigateTo({
				    url: '../list/index?info='+data
				});
			}
			
			
			
			// this.time = new Date().Time("yyyy-MM-dd hh:mm:ss");
		},
		mounted() {
			
		}
	}
</script>
<style lang="scss">
	.home{
		background: linear-gradient(left, #fec44d, #fee04d);
	}
	.home_title{
		transition:all .1s;
		width: 100%;
		background: linear-gradient(left, #fec44d, #fee04d);
		background-color: #fed04d;
		position: fixed;
		top: 0;
		z-index: 1000;
		.navigation{
			height: 90rpx;
			.site{
				display: flex;
				height: 44px;
				line-height: 44px;
				width: 70%;
				.icon{
					height: 44px;
					margin-left: 30rpx;
					margin-right: 10rpx;
					width: 48rpx;
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
			.seek{
				margin: 14rpx 20rpx 0;
				background-color: #f1f1f2;
				border-radius: 50rpx;
				width: 68%;
				height: 60rpx;
				display: flex;
				line-height: 60rpx;
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
		}
			
	}
	.home_main{
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		background: linear-gradient(to bottom, #fff, #f5f5f6 344rpx, #f5f5f6);
		padding-top: 30rpx;
		height: 3000rpx;
		margin-top: 0;
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
			width: 703rpx;
			margin: 22rpx 23.5rpx;
			border-radius: 20rpx;
			height: 324rpx;
			.swiper {
				height: 288rpx;
				.u-grid-item{
					background-color: rgba(0,0,0,0) !important;
					.u-grid-item-box{
						padding-top: 24rpx;
						padding-bottom: 0;
					}
					.pic {
						width: 87rpx;
						height: 87rpx;
					}
					b {
						font-size: 22rpx;
						height: 22rpx;
						line-height: 22rpx;
					}
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
