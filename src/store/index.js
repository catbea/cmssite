import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Login from './module/userInf/logo'

import gktj from  './module/survey/gktj'
import TdStatistics from  './module/survey/tdStatistics'
import qyfb from  './module/survey/qyfb'
import qyList from  './module/survey/qyList'
import userList from  './module/survey/userList'

import dlstj from './module/dls/dlstj'
import dlsList from './module/dls/dlsList'
import data from './module/data/index'
import point from './module/point/index'
import product from './module/product/index'
import down from './module/down/index'
const store = new Vuex.Store({
	modules: {
		Login,
		TdStatistics,
		qyList,
		dlstj,
		userList,
		dlsList,
		data,
		point,
		product,
		down,
	},
	strict: true
});

export default store;
