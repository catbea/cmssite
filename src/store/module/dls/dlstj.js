import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';
const state = {
	dlsBaseData: {},
	dlsBaseDataLoading: false,
	dlTjData: {},
	dlTjDataLoading: false,
	dlTjDataChart: {},
	dlTjDataChartLoading: false,
	dlTjDataExcel: []
};

const getters = {
	dlsBaseData: state => state.dlsBaseData,
	dlsBaseDataLoading: state => state.dlsBaseDataLoading,
	dlTjData: state => state.dlTjData,
	dlTjDataLoading: state => state.dlTjDataLoading,
	dlTjDataChart: state => state.dlTjDataChart,
	dlTjDataChartLoading: state => state.dlTjDataChartLoading,
	dlTjDataExcel: state => state.dlTjDataExcel
};

const mutations = {
	setDlsBaseData(state, data){
		state.dlsBaseData = data;
	},
	setDlsBaseDataLoading(state, data){
		state.dlsBaseDataLoading = data;
	},
	setDlTjData(state, data){
		state.dlTjData = data;
	},
	setDlTjDataLoading(state, data){
		state.dlTjDataLoading = data;
	},
	setDlTjDataChart(state, data){
		const opt = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			legend: {
				data: ['新增企业数' ,'新增二级代理','新增总代理'],
			},
			xAxis: [{
				boundaryGap: false,
				type: 'category',
				data: [],
				axisLabel:{
					rotate: 30,
					interval: 'auto'
				},
			}],
			yAxis: [{
				type: 'value',
			}],
			series: [{
				name: '新增企业数',
				type: 'line',
				data: [],
			}, {
				name:'新增二级代理',
				type: 'line',
				data: []
			}, {
				name:'新增总代理',
				type: 'line',
				data: []
			}]
		};

		for (let i in data) {
			opt.xAxis[0].data[i] = data[i].date;
			opt.series[0].data[i] = data[i].newcompany
			opt.series[1].data[i] = data[i].newagent;
			opt.series[2].data[i] = data[i].newyunying;
		}

		state.dlTjDataChart = opt;
	},
	setDlTjDataChartLoading(state, data){
		state.dlTjDataChartLoading = data;
	},
	setDlTjDataExcel(state, data){
		state.dlTjDataExcel = data;
	}
};

const actions = {
	getDlsBaseData({commit}){
		commit('setDlsBaseDataLoading', true);
		Api.request(URL.PointAgentUrl, {}).then(res => {
			commit('setDlsBaseDataLoading', false);
			commit('setDlsBaseData',res.data)
		}).catch(err => {
			commit('setDlsBaseDataLoading', false);
		});
	},
	getDlTjData({commit}, params){
		if(params.dataType === 1){
			commit('setDlTjDataLoading', true);
			commit('setDlTjData', {});
		}

		if(params.dataType === 2) commit('setDlTjDataChartLoading', true);

		Api.request(URL.PointGetAgentListUrl, params).then(res =>{
			const data = res.data;

			if(params.dataType === 1){
				commit('setDlTjDataLoading', false);
				const list = data.list;
				commit('setDlTjData', data);
			}

			if(params.dataType === 2){
				commit('setDlTjDataChartLoading', false);
				commit('setDlTjDataChart', (data.list || []).reverse());
			}

			if(params.dataType === 3){
				commit('setDlTjDataExcel', data.list);
				params.cellpack();
			}
		}).catch(err => {
			if(params.dataType === 1) commit('setDlTjDataLoading', true);
			if(params.dataType === 2) commit('setDlTjDataChartLoading', true);
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}
