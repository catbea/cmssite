import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';


const state = {
	baseData:[],
	loadingBaseData: false,
	trendData:[],
	loadingTableData: false,
	TrendChar:null,
	loadingChartData: false,
	trendDataExcel:[]
};

const getters = {
	baseData: state => state.baseData,
	loadingBaseData: state => state.loadingBaseData,
	TrendChar: state => state.TrendChar,
	loadingChartData: state => state.loadingChartData,
	trendData: state => state.trendData,
	loadingTableData: state => state.loadingTableData,
	trendDataExcel: state => state.trendDataExcel
};

const mutations = {
	setBaseData(state, data){
		state.baseData = data;
	},
	setBaseLoading(state, data){
		state.loadingBaseData = data;
	},
	setTrendData(state, data){
		state.trendData = data;
	},
	setTableLoading(state, data){
		state.loadingChartData = data;
	},
	setTrendChar(state, datas){
		let data = datas.data;
		let title = {};

		if(datas.type == 1) title = {'t1':'企业总数', t2:'新增企业数'};

		if(datas.type == 2) title = {'t1':'雷达总数', t2:'新增雷达数'};

		if(datas.type == 3) title = {'t1':'客户总数', t2:'新增客户数'};

		let opt = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				// data: [title.t1, title.t2]
				data: [title.t2]
			},
			xAxis: [{
				boundaryGap: false,
				type: 'category',
				data: [],
				axisLabel: {
					rotate: 30,
					interval: 'auto'
				}
			}],
			yAxis: [
				{
					type: 'value',
				}
			],
			series: [{
			// 	name: title.t1,
			// 	type: 'line',
			// 	data: [],
			// }, {
				name:title.t2,
				type: 'line',
				data: []
			}]
		};

		for (let i in data) {
			opt.xAxis[0].data[i] = data[i].time;
			// opt.series[0].data[i] = data[i].amount;
			opt.series[0].data[i] = data[i].added;
		}

		state.TrendChar = opt;
	},
	setChartLoading(state, data){
		state.loadingTableData = data;
	},
	setTrendDataExcel(state, data){
		state.trendDataExcel = data;
	}
};

const actions = {
	getBaseData({commit}){
		commit('setBaseLoading', true);
		Api.request(URL.userTrendsTop, {}).then(res => {
			commit('setBaseData', res.data);
			commit('setBaseLoading', false);
		}).catch(err => {
			commit('setBaseLoading', false);
		});
	},
	getTrendData({commit}, params){
		if(params.dataType === 1) commit('setTableLoading', true);
		if(params.dataType === 2) commit('setChartLoading', true);
		Api.request(URL.userTrendsMain, params).then(res => {
			const data = res.data;
			// 表格数据
			if(params.dataType === 1){
				commit('setTableLoading', false);
				commit('setTrendData', data);
			}

			// 图表数据
			if(params.dataType === 2){
				commit('setChartLoading', false);
				commit('setTrendChar', {
					data: data.lists.reverse(),
					type: params.type
				});
			}

			// 导出
			if(params.dataType === 3){
				commit('setTrendDataExcel', data);
				params.cellpack();
			}
		}).catch(err => {
			if(params.dataType === 1) commit('setTableLoading', false);
			if(params.dataType === 2) commit('setChartLoading', false);
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}
