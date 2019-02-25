
let routeInfoMap = {
   'cruxData': { url: '/cruxData', name: '' },
   'Gktj': { url: '/gktj', name: '' },
   'Qyfb': { url: '/qyfb', name: '' },
   
    'pointIndex': { url: '/pointIndex', name: '' }, 
    'pointHistory': { url: '/pointHistory', name: '' },
    
    'dlstj': { url: '/dlstj', name: '' },
    'dlsList': { url: '/dlsList', name: '' },
    'qyList': { url: '/qyList', name: '' },
    'userList': { url: '/userList', name: '' },
   
    'radar': { url: '/radar', name: '' },
    'program': { url: '/program', name: '' },
    'radarActive': { url: '/radarActive', name: '' },
    
    'down': { url: '/down', name: '' }
}


function formatData(list) {
  if (list && list.length > 0) {
    return list.map(res => {
      let item = routeInfoMap[res.module_name] || {};
      // console.log('routeInfoMap', item);
      res.path = item.url || '';
      res.name = res.module_description;
      if (res.child && res.child.length > 0) {
        res.children = formatData(res.child);
      }
      return res;
    });
  }
}

// 接口映射
export const interfaceMapBtns = {
  'profile_numerical': '/api/profile/numerical',
  'profile_trend': '/api/profile/trend',
  'profile_point': '/api/profile/point',
  'profile_record': '/api/profile/record',
  'profile_region': '/api/profile/region',
  'company_lists': '/api/company/lists',
  'Point_getAgent': '/api/Point/getAgent',
  'Point_getAgentList': '/api/Point/getAgentList',
  'Point_AgentList': '/api/Point/AgentList'
};

// 按钮映射接口是否有权限操作
export const interfaceKey = function(val) {
  return 1 //status;
}

export default {
  mapMenuList(data) {
    let menuList = [];
    menuList = formatData(data);
    return menuList;
  }
};
