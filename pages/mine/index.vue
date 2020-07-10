<template>
	<div class="mine">
		<div :style="'height:' + (Math.round(Number(taskbarHight * 750) / windowWidth) + 286) + 'rpx;'">
			<div class="mine_title">
				<div class="taskbar" :style="'height:'+taskbarHight+'px'"></div>
				<div class="navigation">我的</div>
				<div class="headinfo dis-flex" >
					<div class="name Primary-text">
						<div lang="zh_CN" class="title" @click="log">{{namedata}}</div>
						<div class="secondary">{{phonedata}}</div>
					</div>
					<div class="headdiv"><img class="headimg" @click="log" :src="picdata" alt=""></div>
				</div>
			</div>
		</div>
		<div class="mine_list" :style="'height:' + windowHeight + 'px;'">
			<div class="list">
				<div class="item">
					<u>
						<u-icon name="star" size="35"></u-icon>
					</u>
					<div class="data">
						<div>我的关注</div>
					</div>
					<b>
						<u-icon name="arrow-right" size="28"></u-icon>
					</b>
				</div>
				<div class="item">
					<u>
						<u-icon name="kefu-ermai" size="35"></u-icon>
					</u>
					<div class="data">
						<div>客服中心</div>
					</div>
					<b>
						<u-icon name="arrow-right" size="28"></u-icon>
					</b>
				</div>
				<div class="item">
					<u>
						<u-icon name="coupon" size="35"></u-icon>
					</u>
					<div class="data">
						<div>发票助手</div>
					</div>
					<b>
						<u-icon name="arrow-right" size="28"></u-icon>
					</b>
				</div>
			</div>
			<div v-if="userId" class="logout" @click="logout">退出登录</div>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		name:'mine',
		data() {
			return {
				
			}
		},
		onReady:function (){
			if(this.userId !== ""){
				if(!(this.name && this.phone && this.picture)){
					this.getUserData(this.userId);
				}
			}else{
				this.emptyUserData();
			}
		},
		components:{
			
		},
		computed:{
			...mapGetters(["taskbarHight","windowWidth","windowHeight","userId","phone","name","picture"]),
			namedata:(vm)=>{
				let data = vm.name === "" ? "点击登录~" : vm.name;
				return data
			},
			picdata:(vm)=>{
				let data = vm.picture === "" ? "../../static/img/name.jpg" : vm.picture;
				return data
			},
			phonedata:(vm)=>{
				let data = vm.phone === "" ? "<(￣︶￣)↗[GO!]" : vm.phone;
				return data
			}
		},
		methods: {
			...mapActions(["getUserData","emptyUserData"]),
			init(cd){
				this.getUserData(this.userId).then(res=>{
					cd && cd()
				}).catch(err=>{
					uni.showToast({
					    title: err,
					    icon:"none",
					});
					cd && cd()
				});
			},
			log(){
				if(this.userId === ""){
					uni.navigateTo({
						url: '../login/index?'
					});
				}
			},
			logout(){
				uni.showModal({
				    title: '确定退出？',
				    content: '退出后无法购买商品以及查看订单',
				    success: (res)=>{
				        if (res.confirm) {
							uni.setStorage({
							    key: 'yehan_user_info',
							    data: JSON.stringify({
									id:""
								})
							});
							this.emptyUserData();
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			load(data){
				data ? this.$refs.loading.open() : this.$refs.loading.close();
			}
		}
	}
</script>
<style lang="scss">
	.mine_title{
		width: 100%;
		background-color: #ffd161;
		position: fixed;
		top: 0;
		z-index: 1000;
		.navigation{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 36rpx;
		}
		.headinfo{
			margin: 20rpx 0;
			.headdiv{
				width: 29%;
				height: 160rpx;
				.headimg{
					width: 160rpx;
					height: 160rpx;
					border-radius: 80rpx;
				}
			}
			.name{
				width: 70%;
				.title{
					margin-left: 50rpx;
					display: inline;
					font-size: 48rpx;
					font-weight: 400;
					line-height: 100rpx;
				}
				.secondary{
					margin-left: 50rpx;
					font-size: 30rpx;
				}
			}
		}
	}
	
	.mine_list{
		background-color: #f4f4f4;
		padding-top: 20rpx;
		.list{
			.item{
				height: 88rpx;
				margin-bottom: 2rpx;
				background-color: #fff;
				display: flex;
				u{
					color: #a7a8a9;
					width: 80rpx;
					height: 100%;
					text-align: center;
					line-height: 88rpx;
				}
				.data{
					display: flex;
					color: #333;
					font-size: 28rpx;
					line-height: 88rpx;
					flex: 1;
				}
				b{
					color: #bcbcbc;
					line-height: 88rpx;
					width: 80rpx;
					height: 100%;
					text-align: center;

					float: right;
				}
			}
		}
		.logout{
			margin-top: 20rpx;
			background-color: #fff;
			color: #333;
			width: 100%;
			text-align: center;
			line-height: 88rpx;
			height: 88rpx;
			font-size: 32rpx;
		}
	}
</style>
