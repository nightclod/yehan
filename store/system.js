
export default{
    state: {
		taskbarHight:0
	},
	getters:{//数据的计算 过滤 分拣
		taskbarHight:state=>state.taskbarHight
	},
    mutations: {
		TaskbarHight(state,data){
			state.taskbarHight = data;
		}
	},
    actions: {
		getTaskbarHight({commit}){
			if(this.getters.taskbarHight === 0){
				commit('TaskbarHight',uni.getSystemInfoSync().statusBarHeight);
			}
		}
		
	}
}