import Vue from 'vue'
import App from './App'
import store from './store'//引入vuex
import axios from 'axios'
import {time} from './common/js/commonFunction.js'
import uView from "./uview-ui";
Vue.use(uView);

Vue.config.productionTip = false;

// 挂载方法
Date.prototype.Time = time;
Vue.prototype.$store = store;
Vue.prototype.axios = axios;





App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()



