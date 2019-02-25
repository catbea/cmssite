import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';

const state = {
    userListData: []    
};

const getters = {
    userListData: state => state.userListData,
}

const mutations = {
    setUserListData(state,data){
        state.userListData = data;
    }
} 

const actions = {
    getUserListData({commit},params){
        Api.request(URL.userList, params).then(res => {
			commit('setUserListData', res.data);
		}).catch(err => {

		});
    },
    getUserCode({commit}, params){
		Api.request(URL.userQrCode, params).then(res => {
			 params.cellpack(res)
		}) 
    }
}
export default {
	state,
	getters,
	mutations,
	actions
}