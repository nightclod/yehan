import axios from "axios"

export default{
    state:{
		phone:"",
		name:"",
		picture:"",
		userId:""
	},
	getters:{
		phone:state=>state.phone,
		name:state=>state.name,
		picture:state=>state.picture,
		userId:state=>state.userId
	},
    mutations: {
		Phone(state,phone){
			state.phone = phone;
		},
		Name(state,name){
			state.name = name;
		},
		Picture(state,picture){
			state.picture = picture;
		},
		LogType(state,data){
			state.userId = data;
		}
	},
    actions: {
		getPhoneData({commit},id){
			
		},
		getNameData({commit},id){
			
		},
		getUserData({commit},id){
			return new Promise((resolve, reject) => {
				if(id === ""){
					resolve();
				}
				wx.cloud.init();
				wx.cloud.callFunction({
					name: 'mine',
					data: {
						"id": id,
					},
					success: res => {
						if(res.result.code == 200){
							commit('Phone',res.result.data.phone);
							commit('Name',res.result.data.name);
							commit('Picture',res.result.data.picture);
							resolve();
						}else if(res.result.code == 202){
							commit('Phone',"");
							commit('Name',"");
							commit('Picture',"");
							commit('LogType',"");
							uni.setStorage({
								key: 'yehan_user_info',
								data: JSON.stringify({
									id:""
								})
							});
							resolve();
						}
					},
					fail: err => {
						reject(err);
						uni.showToast({
							title: err,
							icon:"none"
						});
					}
				})
				
			})
		},
		emptyUserData({commit}){
			commit('Phone',"");
			commit('Name',"");
			commit('Picture',"");
			commit('LogType',"");
		},
		logtypechange({commit},data){//更变登录状态
			uni.setStorage({
			    key: 'yehan_user_info',
			    data: JSON.stringify({
					id:data
				})
			});
			commit("LogType",data);
		}
	}
}