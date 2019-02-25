import * as Api from '../../../api/index';
import Utils from '../../../utils';
import * as  URL from '../../../api/api';
import authControl from '../../../utils/authCtrl';

let permList = JSON.parse(sessionStorage.getItem('permList'));

const state = {
	 
	permList: permList || [],
	menuList: []
};

const getters = {
	 
	permList: state => state.permList,
	menuList: state => state.menuList
};

const mutations = {
 
	setPermList(state, data) {
		state.permList = data
	},
	setMenuList(state, data) {
		state.menuList = authControl.mapMenuList(data)
	}
};

const actions = {
	//获取用户信息
	getUserInfo({commit}, params) { 
		Api.request(URL.getUserInfoUrl, params).then(res => {
			if (params && params.cellpack) params.cellpack(res)
		});
	},
	//获取用户权限信息
	getUserPermission({commit}, params) { 
		Api.request(URL.getUserPermissionUrl, params).then(res => {
			if (params && params.cellpack) params.cellpack(res)
		});
	},
	//更新权限列表
	updatedPermList({commit}, params) {
		return new Promise((resolve, reject) => {
			if (params) {
				try {
					commit('setPermList', params);
					resolve(params);
				} catch (error) {
					reject(error);
				}
			}
		});
	},
	//更新菜单列表
	updatedMenuList({commit}, params) {
		return new Promise((resolve, reject) => {
			if (params) {
				try {
					commit('setMenuList', params);
					resolve(params);
				} catch (error) {
					reject(error);
				}
			}
		});
	},
};
export default {
	state,
	getters,
	mutations,
	actions
}
