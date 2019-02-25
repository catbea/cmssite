import * as Api from '../../../api/index';
import * as  URL from '../../../api/api';
import Utils from '../../../utils';

const state = {
	 countIndex:{},
	 countIndexMain:{},
};

const getters = {
	countIndex: state => state.countIndex,
	countIndexMain: state => state.countIndexMain,
};

const mutations = {
	setCountIndex(state, data){
		state.countIndex=data
	},
	setCountIndexMain(state, data){
		state.countIndexMain=data
	}
	 
};

const actions = {
	getCountIndex({commit},params){
		Api.request(URL.keyIndicatorsTop, params).then(res => {
			  params.cellpack(res.data);
			  console.log("......",res.data);
              commit('setCountIndex',res.data);
		}) 
	},
	getCountIndexMain({commit},params){
		Api.request(URL.keyIndicatorsMain, params).then(res => {
			  params.cellpack(res.data);
              commit('setCountIndexMain',res.data);
		}) 
	},
	  
};

export default {
	state,
	getters,
	mutations,
	actions
}
