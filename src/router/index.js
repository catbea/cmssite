import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '/index',
		component: () => import('../view/index/index'),
		redirect: '/cruxData',
		children: [
		//整体数据
		{
			path: '/cruxData',
			component:() => import('../view/data/cruxData'),
			meta: {keepalive: false}
		},{
			path: '/gktj',
			component:() => import('../view/data/gktj'),
			meta: {keepalive: false}
		},{
			path: '/industry',
			component: () => import('../view/data/industry'),
			meta: {keepalive: false}
		},
		{
			path: '/qyfb',
			component:() => import('../view/data/qyfb'),
			meta: {keepalive: false}
		},
		//推点统计
		{
			path: '/pointIndex',
			component:() => import('../view/point/tdStatistics'),
			meta: {keepalive: false}
		}, {
			path: '/pointHistory',
			component: () => import('../view/point/pointHistory'),
			meta: {keepalive: false},
			redirect: '/recharge',
			children:[
				{
					path: '/recharge',
					component:() => import('../view/point/Recharge'),
					meta: {keepalive:false}
				},
				{
					path: '/consume',
					component:() => import('../view/point/consume'),
					meta: {keepalive: false}
				},
				{
					path: '/channel',
					component:() => import('../view/point/channel'),
					meta: {keepalive: false}
				},
			]
		},
		//代理商与企业
		 {
			path: '/dlstj',
			component: () => import('../view/dls/dlstj'),
			meta: {keepalive: false}
		}, {
			path: '/dlsList',
			component: () => import('../view/dls/dlsList'),
			meta: {keepalive: false}
		},
		{
			path: '/qyList',
			component: () => import('../view/dls/qyList'),
			meta: {keepalive: false}
		},
		{
			path: '/userList',
			component: () => import('../view/dls/userList'),
			meta: {keepalive: false}
		},
		// //未知
		// {
		// 	path: '/qyDetail',
		// 	component: () => import('../view/survey/qyDetail'),
		// 	meta: {keepalive: false}
		// },

       //产品使用分析
		{
			path: '/radar',
			component: () => import('../view/product/radar'),
			meta: {keepalive: true}
		}, {
			path: '/radarDetail',
			component: () => import('../view/product/radarDetail'),
			meta: {keepalive: false}
		}, {
			path: '/program',
			component: () => import('../view/product/program'),
			meta: {keepalive: true}
		},{
			path: '/programDetail',
			component: () => import('../view/product/programDetail'),
			meta: {keepalive: false}
		},{
			path: '/radarActive',
			component: () => import('../view/product/radarActive'),
			meta: {keepalive: false}
		},
		//数据下载
		{
			path: '/down',
			component: () => import('../view/down/index'),
			meta: {keepalive: false}
		}, {
			path: '/downTask',
			component: () => import('../view/down/downTask'),
			meta: {keepalive:false}
		}, ]
	}, {
		path: '/login',
		component: () => import('../view/login/index')
	}, {
		path: '*', redirect: '/index'
	}]
});

router.beforeEach((to, from, next) => {
	let url = window.location.href;
	let reg = /[?](\S*)#/; // 判断存在
	if (reg.test(url)) { // 目前这个逻辑不会进去了
		let params = (url.match(reg)[1]).replace(/[?]/g, '');
		url = url.replace(reg, '#');
		url = url.indexOf('?') > 0 ? (url + '&' + params) : (url + '?' + params);
		window.location.href = url;
	} else {
		next()
	}
})

export default router;
