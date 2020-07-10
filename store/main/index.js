import axios from "axios"

export default{
    state:{
		proTitleList:[]
	},
	getters:{//数据的计算 过滤 分拣
		proTitleList:state=>state.proTitleList
	},
    mutations: {
		ProTitleList(state,proTitleList){
			state.proTitleList = proTitleList;
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
				commit('ProTitleList',[{id:0,name:"美食",pic:"../../static/img/snacks.jpg"},
				{id:1,name:"超市便利",pic:"../../static/img/supermarket.jpg"},
				{id:2,name:"蔬菜水果",pic:"../../static/img/fruits.jpg"},
				{id:3,name:"送药上门",pic:"../../static/img/drug.jpg"},
				{id:4,name:"跑腿代购",pic:"../../static/img/convenience.jpg"},
				{id:5,name:"品质午餐",pic:"../../static/img/snacks.jpg"},
				{id:6,name:"津贴联盟",pic:"../../static/img/petsupplies.jpg"},
				{id:7,name:"甜点饮品",pic:"../../static/img/supermarket.jpg"},
				{id:8,name:"超值联盟",pic:"../../static/img/fruits.jpg"},
				{id:9,name:"快食简餐",pic:"../../static/img/convenience.jpg"},
				{id:10,name:"家常菜",pic:"../../static/img/flower.jpg"},
				{id:11,name:"美团专送",pic:"../../static/img/cosmetics.jpg"},
				{id:12,name:"饺子馆",pic:"../../static/img/snacks.jpg"},
				{id:13,name:"无辣不欢",pic:"../../static/img/snacks.jpg"},
				{id:14,name:"全部分类",pic:"../../static/img/convenience.jpg"}]);
				resolve();
			})
		}
	}
}