<template>
	<div id="main" class="dis-flex flex-dir-col">
		<div class="main">
			<home ref="home" v-if="pageType == 'home' ? true : false"></home>
			<category ref="category" v-if="pageType == 'category' ? true : false"></category>
			<mine ref="mine" v-if="pageType == 'mine' ? true : false"></mine>
		</div>
		<div id="menu" class="menu">
			<div @click="home">  
				<div class="main_icon">
					<icon v-if="keyi==1" icon="shouye" size="40"></icon>
					<i v-else class='iconfont icon-shouye'></i>
				</div>
				<p :class="keyi==1?'typei':''">首页</p>
			</div>
			<div @click="category">
				<div class="main_icon">
					<icon v-if="keyi==2" icon="jilu" size="40"></icon>
					<i v-else class='iconfont icon-jilu'></i>
				</div>
				<p :class="keyi==2?'typei':''">分类</p>
			</div>
			<div @click="mine">
				<div class="main_icon">
					<icon v-if="keyi==3" icon="wode" size="40"></icon>
					<i v-else class='iconfont icon-wode'></i>
				</div>
				<p :class="keyi==3?'typei':''">我的</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Home from '../home/index.vue'
	import Category from '../category/index.vue'
	import Mine from '../mine/index.vue'
	import {mapActions,mapGetters} from 'vuex';
	export default {
		data() {
			return {
				keyi: 1,
				pageType:'home'
			}
		},
		onLoad:function(option){
			if(option.index){
				this.keyi = parseInt(option.index);
				if(this.keyi == 1){
					this.pageType = 'home';
					uni.setNavigationBarTitle({
					    title: '首页'
					});
				}else if(this.keyi == 2){
					this.pageType = 'category';
					uni.setNavigationBarTitle({
					    title: '分类'
					});
				}else if(this.keyi == 3){
					this.pageType = 'mine';
					uni.setNavigationBarTitle({
					    title: '我的'
					});
				}
			}
		},
		onPageScroll: function(res) {//监听滚动
			if(this.keyi === 1){
				this.$refs['home'].sticky = res.scrollTop > 53 ? false : true;
			}
		},
		onPullDownRefresh() {
			if(this.keyi === 1){
				this.$refs['home'].init(()=>{
					uni.stopPullDownRefresh();
				});
			}else if(this.keyi === 2){
				this.$refs['category'].init(()=>{
					uni.stopPullDownRefresh();
				});
			}else if(this.keyi === 3){
				this.$refs['mine'].init(()=>{
					uni.stopPullDownRefresh();
				});
			}
		},
		components:{
			Home,
			Category,
			Mine
		},
		computed:{
			...mapGetters(["userId"])
		},
		methods: {
			...mapActions(["getSystemInfo","logtypechange"]),
			home(){
				if(this.keyi == 1){return}
				this.keyi = 1;
				this.pageType = 'home';
				uni.setNavigationBarTitle({
				    title: '首页'
				});
			},
			category(){
				if(this.keyi == 2){return}
				this.keyi = 2;
				this.pageType = 'category';
				uni.setNavigationBarTitle({
				    title: '分类'
				});
			},
			mine(){
				if(this.keyi == 3){return}
				this.keyi = 3;
				this.pageType = 'mine';
				uni.setNavigationBarTitle({
				    title: '我的'
				});
			}
		},
		mounted() {
			this.getSystemInfo();
			if(this.userId === ""){
				uni.getStorage({
					key: 'yehan_user_info',
					success: (res)=>{
						let data = JSON.parse(res.data);
						if(data.id !== ""){
							this.logtypechange(data.id);
						}
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	.main{overflow: scroll;}
	.menu{
		position: fixed;
		height: 104rpx;
		width: 100%;
		bottom: 0;
		display: flex;
		text-align: center;
		background-color: #fafafa;
		> div{
			padding-top: 16rpx;
			height: 88rpx;
			width: 250rpx;
			.main_icon{
				height: 50rpx !important;
			}
			i{
				color: #575859;
				font-size: 40rpx;
			}
			p{
				height: 20rpx;
				line-height: 20rpx;
				color: #9d9d9d;
				font-size: 20rpx;
			}
			.typei{
				color: #464646;
			}
		}
	}
</style>
