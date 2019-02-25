import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';

const state = {
	dlsListData: {},
	dlsListDataLoading: true,
	dlsListDataExcel: {}
};

const getters = {
	dlsListData: state => state.dlsListData,
	dlsListDataLoading: state => state.dlsListDataLoading,
	dlsListDataExcel: state => state.dlsListDataExcel
};

const mutations = {
	setDlsListData(state, data){
		state.dlsListData = data;
	},
	setDlsListDataLoading(state, data){
		state.dlsListDataLoading = data;
	},
	setDlsListDataExcel(state, data){
		state.dlsListDataExcel=data
	},
};

const actions = {
	getDlsListData({commit}, params){
		if(params.dataType === 1){
			commit('setDlsListDataLoading', true);
			commit('setDlsListData', {});
		}
		
		Api.request(URL.PointAgentListUrl, params).then(res => {
			const data = res.data;
			if(params.dataType === 1){
				commit('setDlsListDataLoading', false);
				commit('setDlsListData', data);
			}

			if(params.dataType === 2){
				commit('setDlsListDataExcel', data.list)
				params.cellpack();
			}
		}).catch(err => {
			commit('setDlsListDataLoading', false);
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}
