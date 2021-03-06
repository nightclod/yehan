import Vue from 'vue'
import Vuex from 'vuex'
import system from './system.js'
import main from './main/index.js'
import mine from './mine/index.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
		system,
		main,
		mine
	}
})
export default store
