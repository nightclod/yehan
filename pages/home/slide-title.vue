<template>
	<div id='slide_title' class='slide_title'>
		
			
			
			<!-- <div class='product'>
				<div class='module dis-flex jus-con-sa'>
					<div @click = 'golist("supermarket")'>
						<image src="../../static/supermarket.jpg" mode=""></image>
						<p>超市</p>
					</div>
					<div @click='golist("convenience")'>
						<image src="../../static/convenience.jpg" mode=""></image>
						<p>便利店</p>
					</div>
					<div @click='golist("drug")'>
						<image src="../../static/drug.jpg" mode=""></image>
						<p>药品</p>
					</div>
					<div @click='golist("fruits")'>
						<image src="../../static/fruits.jpg" mode=""></image>
						<p>水果</p>
					</div> 
				</div>
			</div> 

		</div>-->
		
	</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		name:'slide-title',
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters(["proTitleList"])
		},
		methods: {
			...mapActions(["getProTitleList"]),
			getListData(cd){
				this.getProTitleList({id:1,page:1}).then(res=>{
					console.log("成功")
					cd && cd();
				}).catch(err=>{
					console.log("失败");
					cd && cd();
				})
			},
			golist(data){
				uni.navigateTo({
					url:'../list/index?info=' + data,
					success() {
						console.log('进入我的页面')
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.product{
			background-color: #fff;
			width: 703rpx;
			margin: 22rpx 23.5rpx;
		}
	.pandect{
		margin: 20rpx 20rpx;
	}
	.module{
		margin-bottom: 20rpx;
		text-align: center;
	}
	.module div{
		height: 120rpx;
		width: 100rpx;
	}
	.module image{
		width: 80rpx;
		height: 80rpx;
		display: inline-block;
	}
	.icon {
	  width: 1em;
	  height: 1em;
	  vertical-align: -0.15em;
	  fill: currentColor;
	  overflow: hidden;
	}
</style>
