webpackJsonp([10],{"09aI":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("4YfN"),s=a.n(r),n=a("HVJf"),i=a("Vl9C"),o=a("mkpk"),l=a("0uLg"),u=a("0xDb"),c=a("P9l9"),m=u.a.getTime(7),h=(m.start_time,m.end_time,{components:{Industry:i.a,GetTime:l.a,openVersion:o.a},data:function(){return{input10:"",openVersion:"",currentPage:1,firstArgent:"",timeout:null,queryParams:{company_name:this.$route.query.company_name,industry_id:this.$route.query.industry_id,operator_id:this.$route.query.operator_id,software_version:this.$route.query.software_version,small_starttime:this.$route.query.small_starttime,small_endtime:this.$route.query.small_endtime,company_id:this.$route.query.company_id,product_id:this.$route.query.product_id,logdate_start:this.$route.query.logdate_start,logdate_end:this.$route.query.logdate_end,rank:"2",order:"2",page:1,page_size:10,urladdress:this.$route.query.url}}},mounted:function(){this.getSearchAgentList({type:1}),this.getSearchCompanyList(),this.getData()},methods:s()({},Object(n.b)(["getSearchAgentList","getSearchCompanyList","getAppletDetail"]),Object(n.d)(["setSearchAgentList","setSearchCompanyList"]),{resetPage:function(){this.currentPage=1,this.queryParams.page=1},getData:function(){var t=this.$route.query;this.queryParams.urladdress=t.url,this.getAppletDetail(this.queryParams)},handleSizeChange:function(t){this.queryParams.page_size=t,this.resetPage(),this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.queryParams.page=t,this.getData()},search:function(){this.resetPage(),this.getData()},getVersion:function(t){this.queryParams.software_version=t},getCategory:function(t){this.queryParams.industry_id=-1==t?"":t},queryFistAgent:function(t,e){this.querySearchAsync(t,e,this.operatorList,1)},queryCompanyName:function(t,e){this.querySearchAsync(t,e,this.searchCompanyList,2)},querySearchAsync:function(t,e,a,r){""!=t&&(t=""),1===r&&(this.queryParams.operator_id=""),2===r&&(this.queryParams.company_id="",this.queryParams.company_name="");var s=t?a.filter(this.createStateFilter(t)):a;clearTimeout(this.timeout),this.timeout=setTimeout(function(){e(s)},1e3*Math.random())},createStateFilter:function(e){return function(t){return-1!==t.value.toLowerCase().indexOf(e.toLowerCase())}},fistAgentHandleSelect:function(t){this.queryParams.sole_agent=t.uid||""},CompanyNameHandleSelect:function(t){this.queryParams.company_id=t.company_id||"",this.queryParams.company_name=t.company_name||""},onChangeDateRange:function(t){var e=u.a.getTime(t);this.onChangeTimeRange(e)},onChangeTimeRange:function(t){this.queryParams.logdate_start=t.start_time,this.queryParams.logdate_end=t.end_time},onChangeTimeRangeLine:function(t){this.queryParams.small_starttime=t.start_time,this.queryParams.small_endtime=t.end_time},exportExcel:function(){location.href=c.x+"?"+u.a.jsonToUrlFmt(this.queryParams)}}),computed:s()({},Object(n.c)(["operatorList","searchCompanyList","appletDetail"])),beforeDestroy:function(){this.setSearchAgentList(""),this.setSearchCompanyList("")}}),p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"radar"}},[a("h2",{staticClass:"page-title"},[e._v("\n      \t\t小程序页面分析\n      \t\t"),a("span",[e._v(e._s(e.queryParams.urladdress))])]),e._v(" "),a("div",{staticClass:"searchBoxHint"},[a("el-form",{ref:"form",attrs:{size:"small","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"时间筛选"}},[a("GetTime",{attrs:{defalutTime:!0},on:{getTime:e.onChangeDateRange,changeTime:e.onChangeTimeRange}})],1),e._v(" "),a("div",[a("el-form-item",[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("查询")])],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"tab"},[a("div",{staticClass:"data-table-func"},[a("el-button",{staticClass:"dcsh",attrs:{type:"button"},on:{click:e.exportExcel}},[e._v("导出")])],1),e._v(" "),a("div",{staticClass:"data-table"},[a("el-table",{attrs:{data:e.appletDetail.list,border:"","max-height":"630"}},[a("el-table-column",{attrs:{prop:"event_data",label:"日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"PV",label:"访问量（PV）"}}),e._v(" "),a("el-table-column",{attrs:{prop:"UV",label:"访问人数（UV）",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"avg_staytime",label:"平均停留时长(s)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"exit_sum",label:"退出页面次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"exit_rates",label:"退出率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"share_sum",label:"分享次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"entry_page",label:"入口页次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"jump_page",label:"跳出次数"}})],1)],1),e._v(" "),a("div",{staticClass:"pager"},[a("el-pagination",{attrs:{layout:"prev, pager, next, total, sizes","current-page":e.currentPage,"page-sizes":[10,20,50,100],"page-size":10,total:e.appletDetail.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)])])},staticRenderFns:[]};var d=a("C7Lr")(h,p,!1,function(t){a("IyOz")},null,null);e.default=d.exports},IyOz:function(t,e){}});