import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';

const state = {
	 radarList:[],
	 radarDetail:[],
	 appletAnalyze:[],
	 appletDetail:[],
	 radarActiveList:[],//雷达活跃分析
};

const getters = {
	radarList: state => state.radarList,
	radarDetail: state => state.radarDetail,
	appletAnalyze: state => state.appletAnalyze,
	appletDetail: state => state.appletDetail,
	radarActiveList: state => state.radarActiveList,
};

const mutations = {
	setRadarList(state, data){
		state.radarList=data
	},
	 setRadarDetail(state, data){
		state.radarDetail=data
	},
	 setAppletAnalyze(state, data){
		state.appletAnalyze=data
	},
	 setAppletDetail(state, data){
		state.appletDetail=data
	},
	setRadarActiveList(state, data){
		state.radarActiveList=data
	}	 
};

const actions = {
	getRadarList({commit},params){  
		Api.request(URL.radarAnalyzeUrl, params).then(res => {
			commit('setRadarList',res.data)
		});
	},
	getRadarDetail({commit},params){  
		Api.request(URL.radarDetailUrl, params).then(res => {
			if(!params.page_size){
				params.cellpack(res.data)
				 return
			}; 
			commit('setRadarDetail',res.data)
		});
	},
	getAppletAnalyze({commit},params){  
		Api.request(URL.appletAnalyzeUrl, params).then(res => {
			let list=res.data;
			if(list.length){
				 list.forEach(item => {
				item.avg_exit=Utils.toPercent(item.avg_exit);
				item.exit_num=parseInt(item.exit_num) 
			   })
			}
			commit('setAppletAnalyze',list)
		});
	},
	getAppletDetail({commit},params){  
		Api.request(URL.appletDetailUrl, params).then(res => {
			let data=res.data; 
			if(data.length>0)
            data[0].avg_exit=Utils.toPercent(data[0].avg_exit)
			commit('setAppletDetail', data)
		});
	},
	getRadarActiveList({commit},params){  
		Api.request(URL.radarActiveList, params).then(res => {
			let data=res.data; 
			if(data.length>0)
            data[0].avg_exit=Utils.toPercent(data[0].avg_exit)
			commit('setRadarActiveList', data)
		});
	},
	 
	  
};

export default {
	state,
	getters,
	mutations,
	actions
}
