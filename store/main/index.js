import axios from "axios"
import QQMapWX from '@/common/js/qqmap-wx-jssdk.min.js'
var qqmapsdk = new QQMapWX({
    key: 'K5MBZ-4IQLX-UKV4H-ZM4WA-GO5W2-FJFR6' // 必填
});

export default{
    state:{
		proTitleList:[],
		currentAddress:"地址"
	},
	getters:{//数据的计算 过滤 分拣
		currentAddress:state=>state.currentAddress,
		proTitleList:state=>state.proTitleList
	},
    mutations: {
		ProTitleList(state,proTitleList){
			state.proTitleList = proTitleList;
		},
		CurrentAddress(state,{currentAddress}){
			state.currentAddress = currentAddress;
		}
	},
    actions: {
		getProTitleList({commit}){
			return new Promise((resolve, reject) => {
				// axios.get('',{
				// 	params:{
				// 		id : params.id,
				// 		page : params.page
				// 	}
				// }).then(res=>{
				// 	commit('list',res.data.items);
				// 	resolve();
				// }).catch(err=>{
				// 	reject();
				// })
				commit('ProTitleList',[{id:0,name:"美食",pic:"./../123.jpg"},
				{id:1,name:"超市便利",pic:"./../123.jpg"},
				{id:2,name:"蔬菜水果",pic:"./../123.jpg"},
				{id:3,name:"送药上门",pic:"./../123.jpg"},
				{id:4,name:"跑腿代购",pic:"./../123.jpg"},
				{id:5,name:"品质午餐",pic:"./../123.jpg"},
				{id:6,name:"津贴联盟",pic:"./../123.jpg"},
				{id:7,name:"甜点饮品",pic:"./../123.jpg"},
				{id:8,name:"超值联盟",pic:"./../123.jpg"},
				{id:9,name:"快食简餐",pic:"./../123.jpg"},
				{id:10,name:"家常菜",pic:"./../123.jpg"},
				{id:11,name:"美团专送",pic:"./../123.jpg"},
				{id:12,name:"饺子馆",pic:"./../123.jpg"},
				{id:13,name:"无辣不欢",pic:"./../123.jpg"},
				{id:14,name:"全部分类",pic:"./../123.jpg"}]);
				resolve();
			})
		},
		getCurrentAddress({commit},refresh){
			if(refresh || (this.getters.currentAddress === "地址")){
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
						qqmapsdk.reverseGeocoder({
							success: function(res) {
								commit("CurrentAddress",{currentAddress:res.result.address});
							},
							fail: function(error) {
								uni.showModal({
									title: '提示',
									content: error,
								});
							}
						})
				    },
					fail() {
						uni.showModal({
							title: '提示',
							content: "你拒绝了授权，无法获得周边信息",
						});
					}
				})	
			}
		}
	}
}