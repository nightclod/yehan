<template>
	<div class="mine">
		<div class="headinfo dis-flex">
			<div class="name Primary-text">
				<div lang="zh_CN" class="title" @click="log">{{name}}</div>
				<div class="secondary Secondary-text">{{secondary}}</div>
			</div>
			<div class="headdiv"><img class="headimg" @click="log" :src="headurl" alt=""></div>
		</div>
		<uni-popup ref="login" type="bottom">
			<button class="login Primary-text Bg-w"  open-type="getUserInfo" lang="zh_CN" @click="login">登 录</button>
		</uni-popup>
		<uni-popup ref="logout" type="bottom">
			<div class='logout Primary-text Bg-w' @click="logout">退出登录</div>
		</uni-popup>
		<uni-popup ref="loading" maskClick='false' type="center">
			<div class='loading'>loading...</div>
		</uni-popup>
	</div>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name:'mine',
		data() {
			return {
				name:"点击登录~",
				headurl:"../../static/img/name.jpg",
				secondary:"你的名字，学习",
				loginfo:false,
				userinfo:{}
			}
		},
		onReady:function (){
			let that = this;
			uni.getStorage({
			    key: 'user_info',
			    success: function (res) {
			    	that.name = res.data.nickName;
			    	that.headurl = res.data.avatarUrl;
					that.loginfo = true;
			    },
			    fail: (err) => {
			    	console.log(err);
			    	that.loginfo = false;
			    }
			});
		},
		components:{
			uniPopup
		},
		methods: {
			log(){
				if(this.loginfo){
					this.$refs.logout.open();
				}else{
					this.$refs.login.open();
				}
			},
			login(){//登录
				let that = this;
				that.$refs.login.close();
				this.load(true);
				uni.getUserInfo({//获取用户信息
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes);
						that.userinfo = {
							encryptedData:infoRes.encryptedData,
							iv:infoRes.iv
						};
						that.verifySession((data)=>{
							if(data){
								that.name = infoRes.userInfo.nickName;
								that.headurl = infoRes.userInfo.avatarUrl;
								that.loginfo = true;
								that.load(false);
								uni.setStorage({
									key: 'user_info',
									data: infoRes.userInfo
								});
							}
						})
					},
					fail:(err)=>{
						that.$refs.login.close();
						that.load(false);
						console.log(err,'失败，调用设置页')
					}
				})
			},
			verifySession(cd){//判断是否过期
				let that = this; 
				uni.checkSession({
					success: () => {
						console.log('未失效');
						cd && cd(true);
					},
					fail:()=>{
						console.log('已失效');
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								wx.cloud.init();
								wx.cloud.callFunction({
									name: 'login',
									data: {
										"code": loginRes.code,
										"info": that.userinfo
									},
									success: res => {
										console.log('连接成功，状态不确定');
										cd && cd(true);
									},
									fail: err => {
										console.log('连接失败')
									}
								})
								
							},
							fail: (err) => {
								console.log(err,'失败，调用设置页')
							}
						});	
					}
				});
				//测试
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						wx.cloud.init();
						wx.cloud.callFunction({
							name: 'login',
							data: {
								"code": loginRes.code,
								"info": that.userinfo
							},
							success: res => {
								console.log(res,'连接成功，状态不确定');
								cd && cd(true);
							},
							fail: err => {
								console.log('连接失败')
							}
						})
						
					},
					fail: (err) => {
						console.log(err,'失败，调用设置页')
					}
				});	
				
				
				
				
				
				
			},
			logout(){
				let that = this;
				uni.removeStorage({
				    key: 'user_info',
				    success: function (res) {
						that.$refs.logout.close();
						that.name = '点击登录~';
						that.headurl = '../../static/img/name.jpg';
						that.loginfo = false;
				    },
					fail:(err)=>{
						that.loginfo = true;
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
	.headinfo{
		margin-top: 35rpx;
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
				font-size: 70rpx;
				font-weight: 400;
				line-height: 100rpx;
			}
			.secondary{
				margin-left: 50rpx;
				font-size: 30rpx;
			}
		}
	}
	.login{
		width: 100%;
		height: 120rpx;
		border-radius: 0;
		text-align: center;
		line-height: 120rpx;
		font-size: 40rpx;
		font-weight: 500;
		
	}
	.logout{
		width: 100%;
		height: 120rpx;
		font-size: 40rpx;
		text-align: center;
		line-height: 120rpx;
		font-weight: 500;
	}
</style>
