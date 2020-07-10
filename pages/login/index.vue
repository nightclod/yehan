<template>
	<div id="login" class='login'>
		<image class="logo" src="../../static/img/logo.jpeg" mode=""></image>
		<button class="wx_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNum" withCredentials="true">微信一键登录</button>
		<div class="phone_btn" @click="phoneshow = !phoneshow">手机号登录/注册</div>
		<div></div>
		<u-popup v-model="show" 
			mode="center" 
			border-radius="14"
			:mask-close-able="fasle" >
			<div class="user">
				<div class="userinfo">
					请完成授权信息以继续使用
				</div>
				<button class="userbtn" open-type="getUserInfo" @click="getuserinfo">微信授权用户信息</button>
			</div>
		</u-popup>
		<u-popup v-model="phoneshow"
			mode="center" 
			border-radius="14">
			<div class="phone">
				<div class="phonein">
					<u-input v-model="phone" type="number" border="true" placeholder="输入手机号"/>
				</div>
				<button class="phonebtn" @click="phoneLogin">手机号登录</button>
			</div>
		</u-popup>
		<u-toast ref="uToast" />
	</div>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		data() {
			return {
				show:false,
				phoneshow:false,
				phone:"",
				userInfo:{}
			}
		},
		components:{
			
		},
		computed:{
			...mapGetters([])
		},
		methods: {
			...mapActions(["logtypechange"]),
			
			init(){
				uni.authorize({
					scope: 'scope.userInfo',
					success: () => {
						this.getuserinfo();
					},
					fail: (err) => {
						console.log(err)
						this.show = true;
					}
				})
			},
			getuserinfo(){
				uni.getUserInfo({//获取用户信息
					provider: 'weixin',
					success: infoRes => {
						this.userInfo = {
							avatarUrl:infoRes.userInfo.avatarUrl,
							nickName:infoRes.userInfo.nickName
						};
						this.show = false;
					},
					fail:(err)=>{
						this.show = true;
					}
				})
			},
			getPhoneNum(res){//微信登录
				let phoneiv = res.detail.iv ? res.detail.iv : "",
					phone = res.detail.encryptedData ? res.detail.encryptedData : "";
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				uni.login({
					provider: 'weixin',
					success: (loginRes)=>{
						wx.cloud.init();
						wx.cloud.callFunction({
							name: 'login',
							data: {
								"phone": "",
								"code": loginRes.code,
								"phoneiv": phoneiv,
								"phonedata": phone,
								"wxdata": this.userInfo
							},
							success: res => {
								if(res.result.code == 200){
									uni.hideLoading();
									this.logtypechange(res.result.id);
									uni.reLaunch({
									    url: '../main/index?index=1'
									});
								}else{
									uni.hideLoading();
									this.$refs.uToast.show({
										title: res.result.msg,
										type: 'error', 
										position: 'bottom',
										icon: false
									})
								}
							},
							fail: err => {
								uni.hideLoading();
								this.$refs.uToast.show({
									title: err,
									type: 'error', 
									position: 'bottom',
									icon: false
								})
							}
						})
					},
					fail: (err) => {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: '获取code码失败',
							type: 'error', 
							position: 'bottom',
							icon: false
						})
					}
				});	
			},
			phoneLogin(){//手机号登录
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				wx.cloud.init();
				wx.cloud.callFunction({
					name: 'login',
					data: {
						"phone": this.phone,
						"code": "",
						"phoneiv": "",
						"phonedata": ""
					},
					success: res => {
						if(res.result.code == 200){
							this.logtypechange(res.result.id);
							uni.hideLoading();
							uni.reLaunch({
							    url: '../main/index?index=1'
							});
						}else{
							uni.hideLoading();
							this.$refs.uToast.show({
								title: res.result.msg,
								type: 'error', 
								position: 'bottom',
								icon: false
							})
						}
					},
					fail: err => {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: err,
							type: 'error', 
							position: 'bottom',
							icon: false
						})
					}
				})
			}
		},
		mounted() {
			this.getuserinfo()
		}
	}
</script>
	
<style lang="scss">
	.logo{
		width: 240rpx;
		height: 240rpx;
		margin: 200rpx auto 0;
	}
	.wx_btn{
		margin: 100rpx auto 0;
		width: 680rpx;
		text-align: center;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		color: #222;
		background: linear-gradient(left, #ffd000,#ffbd00);
		border-radius: 10rpx;
	}
	.phone_btn{
		margin: 30rpx auto 0;
		text-align: center;
		font-size: 28rpx;
		line-height: 40rpx;
		height: 40rpx;
		width: 600rpx;
		color: #5e719a;
	}
	.user{
		width: 650rpx;
		height: 300rpx;
		.userinfo{
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 28rpx;
			color: #555;
		}
		.userbtn{
			width: 600rpx;
			background-color: #07c160;
			border: none;
			color: #fff;
		}
	}
	.phone{
		width: 650rpx;
		height: 250rpx;
		padding-top: 50rpx;
		.phonein{
			height: 80rpx;
			width: 600rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			color: #000;
			margin: 0 auto;
		}
		.phonebtn{
			margin-top: 40rpx;
			width: 600rpx;
			background-color: #07c160;
			border: none;
			color: #fff;
		}
	}
</style>
