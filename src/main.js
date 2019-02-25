import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
	error: require('../static/img/icon_empty.png'),
	loading: require('../static/img/icon_empty.png'),
});

import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts;

import chinaJson from 'echarts/map/json/china.json';

// 修正部分地图名称位置偏移
chinaJson.features.forEach(item => {
	// console.log(item.id, item.properties.cp, item.properties.name);
	if(item.id === "630000") item.properties.cp = [96.778916, 35.623178]; // 青海
	if(item.id === "130000") item.properties.cp = [115.502461, 38.045474]; // 河北
	if(item.id === "370000") item.properties.cp = [118.000923, 36.675807]; // 山东
	if(item.id === "320000") item.properties.cp = [120.067413, 32.041544]; // 江苏
	if(item.id === "330000") item.properties.cp = [120.153576, 29.287459]; // 浙江
	if(item.id === "350000") item.properties.cp = [117.806239, 26.075302]; // 福建
	if(item.id === "430000") item.properties.cp = [111.482279, 27.19409]; // 湖南
	if(item.id === "640000") item.properties.cp = [106.278179, 37.46637]; // 宁夏
});

//import 'echarts/map/js/china.js';
echarts.registerMap('china', chinaJson);
Vue.use(ElementUI);
 
import './filter';

import store from './store';
const vue = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});

export default vue;
