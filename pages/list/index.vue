<template>
	<div id="list" class='list'>
		<div class="headline width100">
			<div class="dis-flex flex-wra-now">
				<div class="titleData " v-for="(list,item) in secondaryList" :key='item'>{{list.name}}</div>
			</div>
		</div>
		
		
		
		<div class="info">
			{{title}}
		</div>
		
		<!-- <uni-transition :mode-class="['fade']" class="gobackTop" @click="gobackTop" :show="showTop">
			<i class='iconfont'>&#xe600;</i>
		</uni-transition> -->
	</div>
</template>

<script>
	// import uniTransition from "@/components/uni-transition/uni-transition.vue"
	export default {
		data() {
			return {
				title: '',
				secondaryList:[{
					id:0,
					key:0,
					name:"所有",
					url:""
				},{
					id:1,
					key:1,
					name:"吃的",
					url:""
				},{
					id:2,
					key:2,
					name:"喝的",
					url:""
				}],
				showTop:false
			}
		},
		onLoad:function (option){
			console.log(option);
			this.title = option.info
		},
		onPageScroll: function(res) {
			this.showTop = res.scrollTop >= 500 ? true : false
		},
		components:{
			// uniTransition
		},
		methods: {
			gobackTop(){
				uni.pageScrollTo({
				    scrollTop: 0,  //距离页面顶部的距离
				    duration: 240 //滚动动画的时长，默认300ms，单位 ms
				});
			}
		}
	}
</script>
	
<style>
	.headline{
		height: 200rpx;
		overflow: scroll;
	}
	.headline .titleData{
		width: 400rpx;
		height: 200rpx;
		flex-shrink: 0;
	}
	.info{
		height: 4500rpx;
	}
	.gobackTop{
		position:fixed;
		right: 70rpx;
		bottom: 150rpx;
		width: 80rpx;
		height: 82rpx;
		z-index: 1000;
	}
	.gobackTop i{
		font-size: 80rpx;
		color: #606369;
	}
</style>
