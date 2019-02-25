import * as Api from '../../../api/index';
import * as  URL from '../../../api/api';
import Utils from '../../../utils';

const state = {
	 taskLis:{},
	 taskindexList:{},
	 companyField:[],
	 activeField:[],
	 shopField:[],
	 couponField:[],
};

const getters = {
	taskLis: state => state.taskLis,
	taskindexList: state => state.taskindexList,
	companyField: state => state.companyField,
	activeField: state => state.activeField,
	shopField: state => state.shopField,
	couponField: state => state.couponField,
};

const mutations = {
	setTaskLis(state, data){
		state.taskLis=data
	},
	 setCompanyField(state, data){
		state.companyField=data
	},
	 setActiveField(state, data){
		state.activeField=data
	},
	 setShopField(state, data){
		state.shopField=data
	},
	 setCouponField(state, data){
		state.couponField=data
	},
   
};

const actions = {
	getTaskLis({commit},params){
		Api.request(URL.taskListUrl, params).then(res => {
			  let list=res.data.data;
			  let particle_size=['','日','周','月'];
			  let down_status=['生成中','未下载','已下载'];
			  let status=['正常','删除'];
			  list.forEach(item =>{
			  	  item.time_size=particle_size[item.time_size];
			  	  item.down_status=down_status[item.status];
			  	  item.handle =status[item.status]
			  });
              commit('setTaskLis',res.data);
		}) 
	},

  delTask({commit},params){  
		Api.request(URL.delTaskUrl, params).then(res => {
			 if( params.cellpack)   params.cellpack(res)
		});
	},	
  taskData({commit},params){  
	     let str=URL.taskDataUrl+'?project_name='+params.project_name;   
	     location.href =str;
	},
//    getTaskindexList({commit},params){  
// 		Api.request(URL.taskindexListUrl, params).then(res => {
// 			let list=res.data;
// 			let arr1=[],arr2=[],arr3=[],arr4=[];
//             list.forEach(item => {
//             	if(item.type==1) arr1.push(item);
//             	if(item.type==2) arr2.push(item);
//             	if(item.type==3) arr3.push(item);
//             	if(item.type==4) arr4.push(item); 
//             } ); 
//              commit('setCompanyField',arr1);
//              commit('setActiveField',arr2);
//              commit('setShopField',arr3);
//              commit('setCouponField',arr4); 
            
// 		});
// 	},  
	addTask({commit},params){  
		Api.request(URL.addTaskUrl,params,'post').then(res => {
			 if( params.cellpack())   params.cellpack(res)
		});
	},  
};

export default {
	state,
	getters,
	mutations,
	actions
}
 
       
