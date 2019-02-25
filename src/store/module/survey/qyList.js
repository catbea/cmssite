import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';

const state = {
	companyList: [],
	companyListLoading: false,
};

const getters = {
	companyList: state => state.companyList,
	companyListLoading: state => state.companyListLoading,
	companyListExcel: state => state.companyListExcel,
};

const mutations = {
	setCompanyList(state, data){
		state.companyList = data;
	},
	setCompanyListLoading(state, data){
		state.companyListLoading = data;
	},
	 setCompanyCode(state, data){
		state.companyCode = data;
	}
};

const actions = {
	getCompanyList({commit}, params){
		 commit('setCompanyListLoading', true);
		Api.request(URL.CompanyListUrl, params).then(res => {
			commit('setCompanyListLoading', false);
			let zt = ['审核中', '正常', '不通过', '停用'];
			let data = res.data;
            let list=res.data.list;  
            // list.forEach(item => {
            	// item.status = zt[item.status];
            	// item.software_version= item.software_version==0?'企业版':'门店版'
            	// item.software_status= item.software_status==0?'已授权':'未授权'
            	// item.use_mall = item.use_mall ==0?'未启用':'已启用'
            // });
             data.list=list;
			// if(params.dataType === 1){
				commit('setCompanyList', data);
			// }
			// if(params.dataType === 2){
				// params.cellpack(data.list);
			// }
		}).catch(err => {
			commit('setCompanyListLoading', false);
		});
	},
	 getCompanyCode({commit}, params){
		Api.request(URL.companyQrcodeUrl, params).then(res => {
			 params.cellpack(res)
		}) 
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}
