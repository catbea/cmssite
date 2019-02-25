import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';


const state = {
	qyfbData:{},
	qyfbDataLoading: false,
	qyfbChart:{},
	qyfbChartLoading: false,
	qyfbDataExcel:[]
};

const getters = {
	qyfbData: state => state.qyfbData,
	qyfbDataLoading: state => state.qyfbDataLoading,
	qyfbChart: state => state.qyfbChart,
	qyfbChartLoading: state => state.qyfbChartLoading,
	qyfbDataExcel: state => state.qyfbDataExcel
};

const mutations = {
	setQyfbData(state, data){
		state.qyfbData = data;
	},
	setQyfbDataLoading(state, data){
		state.qyfbDataLoading = data;
	},
	setqyfbChart(state, options){
		state.qyfbChart = {
			title: {
				text: options.title,
				subtext: 'Data from ' + Utils.getToday(),
				x:'center'
			},
			tooltip: {
				trigger: 'item'
			},
			visualMap: {
				x: 'left',
				y: 'center',
				splitList: options.splitList,
				text:['高', '低'],
				color: ['#d94e5d', '#eac736', '#50a3ba']
			},
			toolbox: {
				show: true,
				orient : 'vertical',
				x: 'right',
				y: 'center',
				feature : {
					mark: {
						show: true
					},
					saveAsImage: {
						show: false
					}
				}
			},
			series : [{
				name: options.name,
				type: 'map',
				map: 'china',
				roam: false,
				itemStyle:{
					normal:{
						label:{
							show: true,
							textStyle: {
								
							}
						}
					},
					emphasis: {
						label: {
							show: true
						}
					}
				},
				data: options.data
			}]
		};
	},
	setqyfbChartLoading(state, data){
		state.qyfbChartLoading = data;
	},
	setQyfbDataExcel(state, data){
		state.qyfbDataExcel = data;
	}
};

const actions = {
	getQyfbData({commit}, params){
		if(params.dataType === 1) commit('setQyfbDataLoading', true);
		
		Api.request(URL.AreaDataUrl, params).then(res => {
			commit('setQyfbDataLoading', false);

			const data = res.data;
			const list = [];

			for(let i in data.list){ 
				data.list[i].qxzb = Utils.p2int(data.list[i].company,data.company);
				data.list[i].p_company = Utils.p2int(data.list[i].company,data.list[i].p_company);
				data.list[i].p_radar = Utils.p2int(data.list[i].radar,data.list[i].p_radar);
				data.list[i].ldzb = Utils.p2int(data.list[i].radar,data.radar);
			}

			if(params.dataType === 1){
				commit('setQyfbData', data);
			}

			if(params.dataType === 2){
				commit('setQyfbDataExcel',data.list);
				params.cellpack();
			}
		}).catch(err => {
			commit('setQyfbDataLoading', false);
		});
	}, 
	getqyfbChart({commit}, params){
		commit('setqyfbChartLoading', true);

		Api.request(URL.AreaDataUrl, params).then(res =>{
			commit('setqyfbChartLoading', false);

			const list = res.data.list;
			const lx = params.lx;
			const names = ['企业数', 'AI雷达数'];
			const titles = ['开通企业数区域分布图', '开通AI雷达数区域分布图'];
			const valueKeys = ['company', 'radar']; // 需要展示的字段（区分按企业与按雷达）
			const colorLevel = 8; // 颜色层级
			const levelSize = 1 / colorLevel; // 层级大小
			let maxValue = 1; // 以最大值为1展示 企业数最多的省份颜色最亮，其他依次递减

			// 获取需要展示在图表中的数据
			const data = list.map(item => {
				const name = item.title.replace(/省|市/g, '');
				const value = item[ valueKeys[ lx - 1 ] ];
				maxValue = Math.max(maxValue, value);
				return { name, value };
			});

			// 颜色层级
			const splitList = Array(colorLevel).fill().map((item, index) => ({
				start: Math.ceil(maxValue * (index * levelSize)),
				end: Math.ceil(maxValue * ((index + 1) * levelSize))
			})).reverse();
			
			commit('setqyfbChart', {
				data,
				splitList,
				title: titles[ lx - 1 ],
				name: names[ lx - 1 ]
			});
		}).catch(err => {
			commit('setqyfbChartLoading', false);
		});
	} 
};

export default {
	state,
	getters,
	mutations,
	actions
}
