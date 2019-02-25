
/*请求配置*/
let apiEndpoint ='';
let apiEndpoint2 ='';
let apiEndpoint3 ='';
let apiAgent='';

let host = window.location.host;
//生产
if (host === "big-data-platform.aijiatui.com") {
  // apiEndpoint ='https://data-platform.aijiatui.com/api/';
  apiEndpoint2 ="https://big-data-platform.aijiatui.com/api/";
  apiAgent=`https://business.aijiatui.com/`;    //企业二维码接口
}else if (host === "test-big-data-platform.aijiatui.com"){            
   apiEndpoint2= 'https://test-big-data-platform.aijiatui.com/api/'        //测试环境
   apiAgent= `https://checkout.aijiatui.com/`;
}else{
   // apiEndpoint= 'https://dev-cms.aijiatui.com/api/';    //开发环境
    apiEndpoint= 'https://cmstest.aijiatui.com/api/' ;    //开发环境
    apiEndpoint2= 'https://big-data-platform.aijiatui.com/api/' ;    //只有生产有数据，先调用生产环境域名
   //  apiEndpoint2= 'http://data-platform/api/' ;    //开发环境
    apiEndpoint3= 'https://test-big-data-platform.aijiatui.com/api/' ;    //开发环境 
    apiAgent= `https://retest-platform.aijiatui.com/`;
}
//整体数据
export const AreaDataUrl = `${apiEndpoint2}overall_data/regional-list`;//区域分布列表
export const regionalExport = `${apiEndpoint2}overall_data/regional-export`;//区域分布导出
export const userTrendsTop = `${apiEndpoint2}overall_data/userTrends-top`;//用户趋势头部数据
export const userTrendsMain = `${apiEndpoint2}overall_data/userTrends-main`; //用户趋势数据
export const userTrendsExport = `${apiEndpoint2}overall_data/userTrends-export`; //用户趋势导出

export const keyIndicatorsTop = `${apiEndpoint2}overall_data/keyIndicators-top`; //关键指标头部数据
export const keyIndicatorsMain = `${apiEndpoint2}overall_data/keyIndicators-main`; //关键指标数据main
export const keyIndicatorsExport = `${apiEndpoint2}overall_data/keyIndicators-export`; //关键指标数据导出


//产品试用分析
//行业列表
export const categoryListUrl = `${apiEndpoint2}product/industry`
//运营商列表
export const profileAgentListUrl = `${apiEndpoint2}product/operator`
//企业名称列表
export const profileCompanyListUrl = `${apiEndpoint2}product/company`

//推点
export const statisticsTop = `${apiEndpoint2}point/statistics-top`;//推点统计头部
export const statisticsMain = `${apiEndpoint2}point/statistics-main`;//推点统计列表
export const statisticsExport = `${apiEndpoint2}point/statistics-export`;//推点统计列表导出
export const pointPutRecord = `${apiEndpoint2}point/point-put-record`;//推点统计推点投放记录
export const pointPutRecordExport = `${apiEndpoint2}point/point-put-record-export`;//推点统计推点投放记录导出
export const pointConsumeRecord = `${apiEndpoint2}point/point-consume-record`;//推点统计推点消耗记录
export const pointConsumeRecordExport = `${apiEndpoint2}point/point-consume-record-export`;//推点统计推点消耗记录导出
export const pointTransferRecord = `${apiEndpoint2}point/point-transfer-record`;//推点统计渠道间转账记录
export const pointTransferRecordExport = `${apiEndpoint2}point/point-transfer-record-export`;//推点统计渠道间转账导出

//代理商
export const CompanyListUrl = `${apiEndpoint2}agent_enterprisels/company-list`;//企业列表
export const companyQrcodeUrl = `${apiEndpoint2}agent_enterprisels/company-qrCode`;//企业列表二维码
export const userList = `${apiEndpoint2}agent_enterprisels/user-list`;//用户列表
export const userExport = `${apiEndpoint2}agent_enterprisels/user-export`;//用户列表
export const userQrCode = `${apiEndpoint2}agent_enterprisels/user-qrCode`;//用户二维码
export const RegionDataUrl = `${apiEndpoint2}agent_enterprisels/region`;//地区筛选


export const agentStatisticsTop = `${apiEndpoint2}agent_enterprisels/agent-statistics-top`;//代理商与企业 / 代理商统计top
export const agentStatisticsOverallMain = `${apiEndpoint2}agent_enterprisels/agent-statistics-overall-main`;//代理商与企业 / 代理商统计 整体数据(列表，折线图)
export const agentStatisticsOverallMainExport = `${apiEndpoint2}agent_enterprisels/agent-statistics-overall-export`;//代理商与企业 / 整体数据-导出
export const agentStatisticsOperatorMain = `${apiEndpoint2}agent_enterprisels/agent-statistics-operator-main`;//代理商与企业 / 代理商统计 按运营商统计（列表，折线图）
export const agentStatisticsOperatorMainExport = `${apiEndpoint2}agent_enterprisels/agent-statistics-operator-export`;//代理商与企业 / 代理商统计 按运营商统计导出
export const PointAgentUrl = `${apiEndpoint}Point/getAgent`;
export const PointGetAgentListUrl = `${apiEndpoint}Point/getAgentList`; //代理商统计页面里面的列表

export const PointAgentListUrl = `${apiEndpoint2}agent_enterprisels/agent-list-agent`; //代理商列表
export const agentListAgentExport = `${apiEndpoint2}agent_enterprisels/agent-list-agent-export`; //代理商列表导出

 //雷达产品
  export const radarAnalyzeUrl = `${apiEndpoint2}product/radar-list`;//雷达页面分析
  export const radarDetailUrl = `${apiEndpoint2}product/radar-detail`;//雷达页面分析详情
  export const appletAnalyzeUrl = `${apiEndpoint2}product/miniprogram-list`;//小程序页面分析
  export const appletDetailUrl = `${apiEndpoint2}product/miniprogram-detail`;//小程序页面分析详情
  export const radarActiveList = `${apiEndpoint2}product/radar-active-list`;//雷达活跃分析页面
  export const radarActiveExport = `${apiEndpoint2}product/radar-active-export`;//雷达活跃分析导出
  export const radarExport = `${apiEndpoint2}product/radar-export`;//雷达页面分析导出
  export const radarDetailExport = `${apiEndpoint2}product/radar-detail-export`;//雷达页面分析详情导出
  export const miniprogramExport = `${apiEndpoint2}product/miniprogram-export`;//小程序页面导出
  export const miniprogramDetailExport = `${apiEndpoint2}product/miniprogram-detail-export`;//小程序页面详情导出


 //数据下载
  export const taskListUrl = `${apiEndpoint2}download/list`;
  export const taskDataUrl = `${apiEndpoint2}download/download`;//下载
  // export const taskindexListUrl = `${apiEndpoint}down/indexList`;
  export const addTaskUrl = `${apiEndpoint2}download/create-by-condition`;
  export const delTaskUrl = `${apiEndpoint2}download/delete`;//删除

 //登录用户信息	
  export const getUserInfoUrl = `${apiEndpoint2}user/get-user-info`;
  export const getUserPermissionUrl = `${apiEndpoint2}user/get-user-permission`;
  // export const getUserInfoUrl = `${apiEndpoint3}user/get-user-info`;
  // export const getUserPermissionUrl = `${apiEndpoint3}user/get-user-permission`;

