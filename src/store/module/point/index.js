import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';

const type = ['充值','转账','系统发放','系统回收','企业开户','续费','增加人员','企业注销返还','开通增值服务','增加门店数','增加人数和门店数','授信','核心代理商开户','代理商开户','代理商推荐奖励','消耗推点奖励','异地开户服务费','异地续费服务费']

const state = {
	  recharge:{},
	  searchAgentList:[],//代理商
	  towAgentList:[],//核心代理商 |开户机构
	  operatorList:[],//运营商列表
	  allAgentList:[],//全部代理|消耗主体|支出主体，0 包括 1运营商，2=核心代理商，3=代理商

	  searchCompanyList:[],//企业列表
	  consumeList:{},//推点消耗记录
	  pointTransferList:{},//推点消耗记录
};

const getters = {
	recharge: state => state.recharge,
	searchAgentList: state => state.searchAgentList,
	towAgentList: state => state.towAgentList,
	searchCompanyList: state => state.searchCompanyList,
	consumeList: state => state.consumeList,
	pointTransferList: state => state.pointTransferList,
	allAgentList: state => state.allAgentList,
	operatorList: state => state.operatorList,
};

const mutations = {
	setRecharge(state, data){
		state.recharge=data
	},
	setSearchAgentList(state, data){
		state.searchAgentList=data
	},
	setTowAgentList(state, data){
		state.towAgentList=data
	},
	setSearchCompanyList(state, data){
		state.searchCompanyList=data
	},
	setConsumeList(state, data){
		state.consumeList=data
	},
	setPointTransferList(state, data){
		state.pointTransferList=data
	},
	setAllAgentList(state, data){
		state.allAgentList=data
	},
	setOperatorList(state, data){
		state.operatorList=data
	}
	 
};

const actions = {
	getRecharge({commit},params){  
		Api.request(URL.pointPutRecord, params).then(res => {
			// if(!params.page_size){
			// 	params.cellpack(res.data.list)
			// 	 return
			// }
			commit('setRecharge',res.data)
		});
	},
	getConsumeList({commit},params ){  
		Api.request(URL.pointConsumeRecord, params).then(res => {
			// let list=res.data.list;
			// let status=['','','','系统扣除','开户','续费','增加人员','企业注销返还','开通增值服务','增加门店数','增加人数和门店数']
			// list.forEach( item =>{
			// 	item.is_remote=item.is_remote!=0?'非异地':'异地';
			// 	item.rank=status[item.rank]; 
			// })
			// res.data.list=list; 
			// if(!params.page_size){
			// 	params.cellpack(list)
			// 	 return
			// }
			commit('setConsumeList',res.data)
		});
	},
	getSearchAgentList({commit},params){  
		Api.request(URL.profileAgentListUrl, params).then(res => {
			let list=res.data;
			list.forEach(item =>{
				item.value=item.name;
				item.uid = item.uid;
			});
			if(params.type==0){
				commit('setAllAgentList',list)
			 }
			 else if(params.type==1){
			 	commit('setOperatorList',list)
			 }
			 else if(params.type==2){
			 	commit('setTowAgentList',list)
			 }
			 else if(params.type==3){
			 	commit('setSearchAgentList',list)
			 }
			
		});
	},
	getSearchCompanyList({commit},params){  
		Api.request(URL.profileCompanyListUrl,{}).then(res => {
			let list=res.data;
			list.forEach(item =>{
				item.value=item.company_name
				item.id=item.id
			});
			 	commit('setSearchCompanyList',list);
			 	if(params&&params.cellpack){ 
			 		 params.cellpack(list)
			 	} 
		});
	},
	getPointTransferList({commit},params){  
		Api.request(URL.pointTransferRecord,params).then(res => {
			commit('setPointTransferList',res.data);
		});
	},
	  
};

export default {
	state,
	getters,
	mutations,
	actions
}
