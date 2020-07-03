<template>
	<div id='category'>
		<div class="gradek">
			<div class="grade Primary-text">
				<div class='gradet dis-flex flex-wra-now'>
					<div class="gradeList" 
						v-for='(list,index) in gradeInfo' 
						:key='index' 
						:style="index==0?'border:none':''"
						:class='gradetnum == index ? "gradetait" : ""'
						@click='chgradet(index)'>
						{{list.name}}
					</div>
				</div>
			</div>
		</div>
		<div class='info dis-flex  Primary-text'>
			<div class='clas'>
				<div class='classList'
					v-for='(list,index) in classInfo'
					:key='index' 
					:class='classnum == index ? "classact" : ""'
					@click='chclass(index)'>
					{{list.name}}
				</div>
			</div>
			<div class="subject dis-flex flex-wra-wra ali-con-fs" >
				<div class='subjectList'
					v-for='(list,index) in subjectInfo'
					:key='index'>
					<div class='subjectdata' @click='chsubject(index)'>
						{{list.name}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { gradeInfo } from '../../common/js/commonData.js'
	export default {
		name:'category',
		data() {
			return {
				title: 'fenlei',
				gradeInfo: gradeInfo,
				gradetnum:0,
				classInfo:[],
				classnum:0,
				subjectInfo:[],
				subjectnum:0
			}
		},
		onLoad:function (){
			
		},
		components:{
			
		},
		methods: {
			chgradet(index){
				this.gradetnum= index;
				this.classInfo = this.gradeInfo[index].info || [];
				this.classnum = 0;
				this.chclass(0);
			},
			chclass(index){
				this.classnum= index;
				this.subjectInfo = this.classInfo[index] ? (this.classInfo[index].subject ||　[]) : [];	
				this.subjectnum = 0;
				this.chsubject(0);
			},
			chsubject(index){
				this.subjectnum = index;
				console.log(this.gradetnum,this.classnum,this.subjectnum);
			}

		},
		mounted(){
			this.chgradet(0);
		}
	}
</script>
<style lang="scss">
	.gradek{
		height: 160rpx;
		overflow: hidden;
	}
	.grade{
		width: 100%;
		height: 180rpx;
		overflow: scroll;
		.gradet{
			font-size: 30rpx;
			.gradeList{
				width: 200rpx;
				height: 160rpx;
				flex-shrink:0;
				text-align: center;
				line-height: 160rpx;
				background:transparent;
				border-left:1px transparent solid;
				border-image:linear-gradient(to top,#fff,#ddd,#fff) 1 10;
			}
			.gradetait{
				color: #409EFF;
				font-size: 35rpx;
			}
		}
	}
	.info{
		margin-top: 20rpx;
		border-top: solid 1rpx #ddd;
		.clas{
			width: 20%;
			border-right: solid 1rpx #ddd;
			.classList{
				height:140rpx ;
				border-bottom: solid 1rpx #ddd;
				font-size: 30rpx;
				line-height: 140rpx;
				text-align: center;
			}
			.classact{
				color: #409EFF;
				font-size: 35rpx;
			}
		}
		.subject{
			width: 79%;
			.subjectList{
				width: 33.3%;
				height: 102rpx;
				margin-top: 80rpx;
				.subjectdata{
					height: 100rpx;
					width: 100rpx;
					margin: 0 auto;
					border: solid 1px #eee;
					border-radius: 10rpx;
					line-height: 100rpx;
					text-align: center;
					font-size: 40rpx;
				}
			}
		}
	}
</style>
