import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';

const state = {
	provinceData: [], //省市区
	categoryList:[],//行业
	tdData: {},
	tdDataLoading: false,
	recordData: {},
	recordDataLoading: false,
	recordChart: null,
	recordChartLoading: false,
	recordDataExcel: {},
	versionList:[]
};

const getters = {
	provinceData: state => state.provinceData,
	categoryList: state => state.categoryList,
	tdData: state => state.tdData,
	tdDataLoading: state => state.tdDataLoading,
	recordData: state => state.recordData,
	recordDataLoading: state => state.recordDataLoading,
	recordChart: state => state.recordChart,
	recordChartLoading: state => state.recordChartLoading,
	recordDataExcel: state => state.recordDataExcel,
	versionList:state => state.versionList
};

const mutations = {
	setProvinceData(state, data){
		state.provinceData = data;
	},
	setCategoryList(state, data){
		state.categoryList = data;
	},
	setVersionList(state, data){
		state.versionList = data;
	},
	setTdData(state, data){
		state.tdData = data;
	},
	setTdDataLoading(state, data){
		state.tdDataLoading = data;
	},
	setRecordData(state, data){
		state.recordData = data;
	},
	setRecordDataLoading(state, data){
		state.recordDataLoading = data;
	},
	setRecordChart(state, data){
		const options = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ['推点消耗' ,'推点充值','开通企业数'],
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
				name: '推点消耗',
				type: 'line',
				data: [],
			}, {
				name:'推点充值',
				type: 'line',
				data: []
			}, {
				name:'开通企业数',
				type: 'line',
				data: []
			}]
		};

		for (let i in data) {
			options.xAxis[0].data[i] = data[i].time;
			options.series[0].data[i] = data[i].expend;
			options.series[1].data[i] = data[i].recharge;
			options.series[2].data[i] = data[i].total;
		}

		state.recordChart = options;
	},
	setRecordChartLoading(state, data){
		state.recordChartLoading = data;
	},
	setRecordDataExcel(state, data){
		state.recordDataExcel = data;
	}
};

const actions = {
	//推点每日参数
	getTdData({commit}){
		// commit('setTdDataLoading', true);
		// Api.request(URL.PointStatBasedataUrl, {}).then(res => {
		// 	commit('setTdData', res.data)
		// 	commit('setTdDataLoading', false);
		// }).catch(err => {
		// 	commit('setTdDataLoading', false);
		// });
	},
	//推点统计
	getRecordData({commit}, params){
		// if(params.dataType === 1) commit('setRecordDataLoading', true);
		// if(params.dataType === 2) commit('setRecordChartLoading', true);

		// Api.request(URL.PointStatDataUrl, params).then(res =>{
		// 	const data = res.data;
		// 	// 表格数据
		// 	if(params.dataType === 1){
		// 		commit('setRecordDataLoading', false);
		// 		commit('setRecordData', res.data);
		// 	}

		// 	// 图表数据
		// 	if(params.dataType === 2){
		// 		commit('setRecordChartLoading', false);
		// 		commit('setRecordChart', (res.data.list || []).reverse());
		// 	}

		// 	// 导出
		// 	if(params.dataType === 3){
		// 		commit('setRecordDataExcel', data.list);
		// 		params.cellpack();
		// 	}
		// }).catch(err => {
		// 	if(params.dataType === 1) commit('setRecordDataLoading', false);
		// 	if(params.dataType === 2) commit('setRecordChartLoading', false);
		// });
	},
	//省市联动
	getProvinceData({commit},params){ 
		Api.request(URL.RegionDataUrl,params).then((res) =>{
			const data = Array.isArray(res.data) ? res.data : [];
			
			data.unshift({
				id: -1,
				pid: -1,
				title: '全部'
			});
			// if(params.id == ""){
			// 	commit('setProvinceData', data);
			// 	// return ;
			// }
			if(params.id === ""){
				data.forEach(item => {
					if(item.id !== -1){
						item.citys = [];
					}
				});
				commit('setProvinceData', data);
				return;
			}

			const province = JSON.parse(JSON.stringify(state.provinceData));
			
			const citys = data.map(item => ({ title: item.title, id: item.id }));
			province.forEach(item => {
				if(params.id === item.id){
					item.citys = citys;
				}
			});
			commit('setProvinceData', province); 
		});
	},
	 //行业联动
	getCategoryList({commit},params){ 
		Api.request(URL.categoryListUrl,params).then((res) =>{
			const data = Array.isArray(res.data) ? res.data : [];

			if(params.id ===''){
				 data.unshift({
					id: -1,
					pid: -1,
					title: '全部'
				});
				data.forEach(item => {
					if(item.id !== -1){
						item.citys = [];
					}
				});
				commit('setCategoryList', data);
				return;
			}

			const province = JSON.parse(JSON.stringify(state.categoryList));
			const citys = data.map(item => ({ title: item.title, id: item.id }));

			province.forEach(item => {
				if(params.id === item.id){
					item.citys = citys;
				}
			});

			commit('setCategoryList', province); 
		});
	},
	//开通版本
	getVersionList({commit},params){
		let defalut = [{"label":"全部","value":""},{"label":"企业版","value":"0"},{"label":"门店版","value":"2"},]
		commit('setVersionList', defalut); 
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}
