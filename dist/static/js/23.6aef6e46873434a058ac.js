webpackJsonp([23],{MXt8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("4YfN"),s=a.n(r),o=a("HVJf"),l=a("gyMJ"),n=a("P9l9"),i=a("0xDb"),c={components:{GetRegion:a("iv0z").a},data:function(){return{firstArgent:"",lable:"运营商名称",currentPage:1,grade:1,queryParams:{city:"",province:"",usege_status:"",agent_id:"",type:1,order:"",sort:"",dataType:1,page_size:10,page:1},placeholderText:"请输入运营商名称",props:{value:"label",children:"cities"},dlsListData:{},dlsListDataLoading:!0,dlsListDataExcel:{}}},created:function(){this.getDlsListData(this.queryParams),this.getSearchAgentList({type:1}),this.getSearchAgentList({type:2}),this.getSearchAgentList({type:3})},methods:s()({},Object(o.b)(["getSearchAgentList"]),Object(o.d)(["setSearchAgentList"]),{getDlsListData:function(){var a=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.dlsListDataLoading=!0,Object(l.b)(n.c,t).then(function(t){var e=t.data;a.dlsListDataLoading=!1,a.dlsListData=e}).catch(function(t){a.dlsListDataLoading=!1})},resetPage:function(){this.currentPage=1,this.queryParams.page=1,this.getDlsListData(this.queryParams)},onChangeType:function(t){this.firstArgent="",this.grade=t,this.queryParams.type=t,this.fistAgentHandleSelect(""),this.currentPage=1,this.queryParams.page=1,this.queryParams.order="",this.queryParams.sort="",this.placeholderText=1==t?"请输入运营商名称":2==t?"请输入核心代理商名称":"请输入代理商名称",this.lable=1==t?"运营商名称":2==t?"核心代理商":"代理商名称",this.getDlsListData(this.queryParams)},queryFistAgent:function(t,e){1==this.queryParams.type?this.querySearchAsync(t,e,this.operatorList):2==this.queryParams.type?this.querySearchAsync(t,e,this.towAgentList):3==this.queryParams.type&&this.querySearchAsync(t,e,this.searchAgentList)},querySearchAsync:function(t,e,a){var r=t?a.filter(this.createStateFilter(t)):a;clearTimeout(this.timeout),this.timeout=setTimeout(function(){e(r)},1e3*Math.random())},createStateFilter:function(e){return function(t){return-1!==t.value.toLowerCase().indexOf(e.toLowerCase())}},fistAgentHandleSelect:function(t){this.queryParams.agent_id=t.uid||""},region:function(t){this.queryParams.city=t.city,this.queryParams.province=t.province},statusChange:function(t){this.currentPage=1,this.queryParams.usege_status=t},sortChange:function(t){t.order?(this.queryParams.order="descending"==t.order?"desc":"asc",this.queryParams.sort=t.prop):(this.queryParams.order="",this.queryParams.sort=""),this.resetPage()},handleSizeChange:function(t){this.queryParams.page_size=t,this.resetPage()},handleCurrentChange:function(t){this.currentPage=t,this.queryParams.page=t,this.getDlsListData(this.queryParams)},search:function(){this.resetPage()},exportExcel:function(){console.log(this.queryParams),location.href=n.h+"?"+i.a.jsonToUrlFmt(this.queryParams)}}),computed:s()({},Object(o.c)(["operatorList","towAgentList","searchAgentList"])),watch:{firstArgent:function(t){!t&&this.fistAgentHandleSelect("")}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"dlsList"}},[a("h2",{staticClass:"page-title"},[e._v("\n      代理商列表\n      "),a("el-popover",{attrs:{trigger:"hover",placement:"right"}},[a("div",[a("p",[a("strong",[e._v("运营商")])]),e._v(" "),a("p",[a("strong",[e._v("核心代理商数量：")]),e._v("归属该运营商下核心代理商的总数（状态为正常）")]),e._v(" "),a("p",[a("strong",[e._v("代理商数量：")]),e._v("归属该运营商下核心代理商的总数（状态为正常）")]),e._v(" "),a("p",[a("strong",[e._v("服务企业数：")]),e._v("归属该运营商服务的企业总数（包含正常状态，及停用等非正常状态企业）")]),e._v(" "),a("p",[a("strong",[e._v("开户企业数：")]),e._v("由该运营商开户的企业总数（包含正常状态，及停用等非正常状态企业）")]),e._v(" "),a("p",[a("strong",[e._v("自身消耗推点：")]),e._v("自身推点实际消耗总数（不包含渠道间的转账）\n        ")]),a("p",[a("strong",[e._v("下级消耗推点：")]),e._v("该运营商的下级（下级核代，下级代理）实际消耗推点总数（不包含渠道间的转账）")]),e._v(" "),a("p",[a("strong",[e._v("推点余额：")]),e._v("该运营商推点账号中剩余推点数")]),e._v(" "),a("p",[a("strong",[e._v("核心代理商")])]),e._v(" "),a("p",[a("strong",[e._v("归属运营商：")]),e._v("该核心代理商所归属的运营商")]),e._v(" "),a("p",[a("strong",[e._v("下级代理商数量：")]),e._v("归属该核心代理商下的代理商总数（状态为正常）")]),e._v(" "),a("p",[a("strong",[e._v("开户企业数：")]),e._v("由该代理商开户的企业总数（包含正常状态，及停用等非正常状态企业）")]),e._v(" "),a("p",[a("strong",[e._v("自身消耗推点：")]),e._v("自身推点实际消耗总数（不包含渠道间的转账）")]),e._v(" "),a("p",[a("strong",[e._v("下级消耗推点：")]),e._v("下级代理商实际消耗推点总数（不包含渠道间的转账）")]),e._v(" "),a("p",[a("strong",[e._v("推点余额：")]),e._v("该核心代理商推点账号中剩余推点数")]),e._v(" "),a("p",[a("strong",[e._v("代理商")])]),e._v(" "),a("p",[a("strong",[e._v("归属核代：")]),e._v("该代理商所归属的核心代理商，如果直属运营商，此处为空")]),e._v(" "),a("p",[a("strong",[e._v("归属运营商：")]),e._v("该代理商所归属的运营商")]),e._v(" "),a("p",[a("strong",[e._v("开户企业数：")]),e._v("由该代理商开户的企业总数（包含正常状态，及停用等非正常状态企业）")]),e._v(" "),a("p",[a("strong",[e._v("消耗推点：")]),e._v("自身推点实际消耗总数（不包含渠道间的转账）")]),e._v(" "),a("p",[a("strong",[e._v("推点余额：")]),e._v("该代理商推点账号中剩余推点数")])]),e._v(" "),a("i",{staticClass:"el-icon-question",attrs:{slot:"reference"},slot:"reference"})])],1),e._v(" "),a("div",{staticClass:"sxTab"},[a("el-form",{ref:"form",attrs:{size:"small","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"对象类型"}},[a("el-radio-group",{attrs:{size:"medium"},on:{change:e.onChangeType},model:{value:e.grade,callback:function(t){e.grade=t},expression:"grade"}},[a("el-radio-button",{attrs:{label:"1"}},[e._v("运营商")]),e._v(" "),a("el-radio-button",{attrs:{label:"2"}},[e._v("核心代理商")]),e._v(" "),a("el-radio-button",{attrs:{label:"3"}},[e._v("代理商")])],1)],1),e._v(" "),a("div",{staticStyle:{width:"550px"}},[a("el-form-item",{attrs:{label:e.lable}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.queryFistAgent,placeholder:"请输入所属运营商",clearable:""},on:{select:e.fistAgentHandleSelect},model:{value:e.firstArgent,callback:function(t){e.firstArgent=t},expression:"firstArgent"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.search(t)}}},[e._v("搜索")])],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"data-table-func"},[a("button",{staticClass:"dcsh",attrs:{type:"button"},on:{click:e.exportExcel}},[e._v("导出")])]),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.dlsListDataLoading,expression:"dlsListDataLoading"}],staticClass:"data-table"},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.queryParams.type,expression:"queryParams.type== 1"}]},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dlsListData.list,border:"",sortable:"custom","default-sort":{prop:"",order:"descending"},"max-height":"630"},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{prop:"org_id",label:"运营商名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"org_area",label:"服务区域"},scopedSlots:e._u([{key:"default",fn:function(t){return[[a("span",{staticStyle:{"margin-right":"10px",display:"-webkit-box",overflow:"hidden","text-overflow":"ellipsis","-webkit-line-clamp":"2","-webkit-box-orient":"vertical"}},[e._v(e._s(t.row.org_area))]),e._v(" "),t.row.org_area?a("el-popover",{attrs:{width:"500",trigger:"hover",placement:"right"}},[a("div",{staticClass:"city-popover"},[e._v("\n                    "+e._s(t.row.org_area)+"\n                  ")]),e._v(" "),a("i",{staticClass:"el-icon-info",staticStyle:{position:"absolute",top:"0%",width:"100%",left:"0",height:"100%"},attrs:{slot:"reference"},slot:"reference"})]):e._e()]]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"core_agent_num",sortable:"core_agent_num",label:"核心代理商数量",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"agent_num",label:"代理商数量",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"company_servered_num",sortable:"company_servered_num",label:"服务企业数",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operator_company_num",sortable:"operator_company_num",label:"开户企业数",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_consumed",sortable:"td_consumed",label:"自身消耗推点"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_consumed_by_lower_level",sortable:"td_consumed_by_lower_level",label:"下级推点消耗"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_balance",sortable:"td_balance",label:"推点余额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"org_opened_date",sortable:"org_opened_date",label:"开户日期",width:"120"}})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.queryParams.type,expression:"queryParams.type== 2"}]},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dlsListData.list,border:"",sortable:"custom","default-sort":{prop:"",order:"descending"},"max-height":"630"},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{prop:"org_id",label:"核代名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ascription_operator",label:"归属运营商"}}),e._v(" "),a("el-table-column",{attrs:{prop:"core_agent_agent_num",sortable:"core_agent_agent_num",label:"下级代理商数量",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"core_agent_company_num",sortable:"core_agent_company_num",label:"开户企业数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_consumed",sortable:"td_consumed",label:"自身消耗推点"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_consumed_by_lower_level",sortable:"td_consumed_by_lower_level",label:"下级消耗推点"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_balance",sortable:"td_balance",label:"推点余额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"org_opened_date",sortable:"org_opened_date",label:"开户日期"}})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:3==e.queryParams.type,expression:"queryParams.type== 3"}]},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dlsListData.list,border:"",sortable:"custom","default-sort":{prop:"",order:"descending"},"max-height":"630"},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{prop:"org_id",label:"代理商名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ascription_core_agent",label:"归属核代"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ascription_operator",label:"归属运营商"}}),e._v(" "),a("el-table-column",{attrs:{prop:"agent_company_num",sortable:"agent_company_num",label:"开户企业数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_consumed",sortable:"td_consumed",label:"消耗推点"}}),e._v(" "),a("el-table-column",{attrs:{prop:"td_balance",sortable:"td_balance",label:"推点余额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"org_opened_date",sortable:"org_opened_date",label:"开户日期"}})],1)],1)]),e._v(" "),a("div",{staticClass:"pager"},[a("el-pagination",{attrs:{layout:"prev, pager, next, total, sizes","current-page":e.currentPage,"page-sizes":[10,20,50,100],"page-size":10,total:e.dlsListData.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},staticRenderFns:[]};var p=a("C7Lr")(c,_,!1,function(t){a("hQsi")},"data-v-0eb524da",null);e.default=p.exports},hQsi:function(t,e){}});