{"source":"webpackJsonp([14],{UQke:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var l=a(\"4YfN\"),s=a.n(l),o=a(\"iv0z\"),r=a(\"0uLg\"),n=a(\"Vl9C\"),i=a(\"HVJf\"),c=a(\"0xDb\"),p=a(\"P9l9\"),_=c.a.getTime(14),m=(_.start_time,_.end_time),u={components:{GetRegion:o.a,GetTime:r.a,Industry:n.a},data:function(){return{firstArgent:\"\",twoArgent:\"\",companyName:\"\",showMoreSelect:!0,dyColumnVisible:!1,defaultTime:\"\",columnForm:{type:[]},codeDialogData:{visible:!1,codeTitle:\"\",codeImg:\"\"},currentPage:1,queryParams:{open_start_date:\"2018-01-01\",open_end_date:m,industry_id:\"\",operator_id:\"\",owner_id:\"\",status:\"\",company_id:\"\",order:\"\",sort:\"\",city:\"\",province:\"\",software_status:\"\",expire_start_date:\"\",expire_end_date:\"\",page:1,page_size:10,is_page:!0,type:\"3\"}}},created:function(){this.getCompanyList(this.queryParams),this.getSearchAgentList({type:0}),this.getSearchCompanyList()},methods:s()({},Object(i.b)([\"getCompanyList\",\"getCompanyCode\",\"getSearchAgentList\",\"getSearchCompanyList\"]),Object(i.d)([\"setSearchAgentList\",\"setSearchCompanyList\"]),{rest:function(){this.currentPage=1,this.queryParams.page=1,this.getCompanyList(this.queryParams)},queryFistAgent:function(e,t){this.querySearchAsync(e,t,this.allAgentList)},queryTwoArgent:function(e,t){this.querySearchAsync(e,t,this.allAgentList)},queryCompanyName:function(e,t){this.querySearchAsync(e,t,this.searchCompanyList)},fistAgentHandleSelect:function(e){this.queryParams.operator_id=e.uid||\"\"},twoArgentHandleSelect:function(e){this.queryParams.owner_id=\"\"|e.uid},CompanyNameHandleSelect:function(e){this.queryParams.company_id=e.company_id||\"\",this.companyName=e.company_name||\"\"},querySearchAsync:function(e,t,a){var l=e?a.filter(this.createStateFilter(e)):a;clearTimeout(this.timeout),this.timeout=setTimeout(function(){t(l)},1e3*Math.random())},createStateFilter:function(t){return function(e){return-1!==e.value.toLowerCase().indexOf(t.toLowerCase())}},onChangeOpenTime:function(e){this.queryParams.open_start_date=e.start_time,this.queryParams.open_end_date=e.end_time},onChangeEndTime:function(e){this.queryParams.expire_start_date=e.start_time,this.queryParams.expire_end_date=e.end_time},categoryChange:function(e){this.queryParams.industry_id=-1==e?\"\":e},xstatusChange:function(e){this.queryParams.software_status=e},handleClose:function(){this.codeDialogData={visible:!1,codeTitle:\"\",codeImg:\"\"}},statusChange:function(e){this.queryParams.software_status=e},region:function(e){this.queryParams.city=e.city,this.queryParams.province=e.province},search:function(){this.queryParams.is_page=!0,this.rest()},handleSizeChange:function(e){this.queryParams.page_size=e,this.rest()},handleCurrentChange:function(e){this.currentPage=e,this.queryParams.page=e,this.getCompanyList(this.queryParams)},sortChange:function(e){e.order?(this.queryParams.order=\"descending\"==e.order?\"desc\":\"asc\",this.queryParams.sort=e.prop):(this.queryParams.order=\"\",this.queryParams.sort=\"\"),this.rest()},exportExcel:function(){this.queryParams.is_page=!1,location.href=p.b+\"?\"+c.a.jsonToUrlFmt(this.queryParams)},lookCode:function(t){var a=this;this.getCompanyCode({company_id:t.company_id,cellpack:function(e){console.log(e),a.codeDialogData.visible=!0,a.codeDialogData.codeTitle=t.company_name||\"深圳加推科技\",a.codeDialogData.codeImg=e.data}})},columnChange:function(e){console.log(e)},changeShowSelect:function(){this.showMoreSelect=!this.showMoreSelect},resetForm:function(e){this.$refs.form.resetFields()}}),computed:s()({},Object(i.c)([\"companyList\",\"companyListLoading\",\"allAgentList\",\"searchCompanyList\"])),watch:{firstArgent:function(e){!e&&this.fistAgentHandleSelect(\"\")},twoArgent:function(e){!e&&this.twoArgentHandleSelect(\"\")},companyName:function(e){!e&&this.CompanyNameHandleSelect(\"\")}}},d={render:function(){var a=this,e=a.$createElement,l=a._self._c||e;return l(\"div\",{staticClass:\"qyList\"},[l(\"h2\",{staticClass:\"page-title\"},[a._v(\"\\n      企业列表\\n      \"),l(\"el-popover\",{attrs:{trigger:\"hover\",placement:\"right\",width:\"760\"}},[l(\"div\",[l(\"p\",[l(\"strong\",[a._v(\"开通AI雷达数：\")]),a._v(\"企业购买开通的AI雷达数量\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"启用AI雷达数：\")]),a._v(\"企业在企管后台开启了的AI雷达数量\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"雷达启用率：\")]),a._v(\"雷达启用率=启用AI雷达数量/开通AI雷达数\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"客户总数（去重）：\")]),a._v(\"统计企业名片小程序累计获客数（同一客户访问相同企业的不同名片，不重复计算）\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"人均客户数：\")]),a._v(\"平均每个启用AI雷达的客户数=客户总数/启用AI雷达数\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"小程序总PV：\")]),a._v(\"统计企业名片小程序累计总访问PV\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"被转发次数：\")]),a._v(\"统计企业名片小程序累计总被转发次数\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"客户跟进次数：\")]),a._v(\"统计企业所有AI雷达用户累计在AI雷达跟进客户的次数\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"支付成功订单数：\")]),a._v(\"统计企业商城累计成功支付订单数\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"成交金额：\")]),a._v(\"统计企业商城累计成功支付订单包含的金额\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"所属运营商：\")]),a._v(\"服务该企业的运营商\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"开户机构：\")]),a._v(\"企业归属的直接代理商，一般为为企业开户的代理商。身份可以是代理，核心代理商也可以是运营商，也可以是加推总账号\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"开户日期：\")]),a._v(\"企业账号开通的日期\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"到期日期：\")]),a._v(\"企业账号到期日期\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"使用状态：\")]),a._v(\"包含正常，审核中，不通过，停用\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"开通版本：\")]),a._v(\"代理商后台为企业开通的版本，分为企业版及门店版\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"小程序首次发布日期：\")]),a._v(\"企业首次发布小程序的日期。（19年1月8日系统重构，19年1月8日及之前首次发布的小程序日期都统一记录为2019-01-09）\")]),a._v(\" \"),l(\"p\",[l(\"strong\",[a._v(\"启用商城：\")]),a._v(\"企业启用商城的状态。数据来源于企业企管后台。\")])]),a._v(\" \"),l(\"i\",{staticClass:\"el-icon-question\",attrs:{slot:\"reference\"},slot:\"reference\"})])],1),a._v(\" \"),l(\"div\",{staticClass:\"sxTab\"},[l(\"el-form\",{ref:\"form\",attrs:{size:\"small\",\"label-position\":\"left\",\"label-width\":\"120px\"}},[l(\"div\",[l(\"el-row\",{attrs:{gutter:20}},[l(\"el-col\",{attrs:{span:8}},[l(\"el-form-item\",{attrs:{label:\"开户日期\"}},[l(\"GetTime\",{attrs:{fixedTime:!0,showDay:!1},on:{changeTime:a.onChangeOpenTime}})],1)],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-form-item\",{attrs:{label:\"使用状态\"}},[l(\"el-select\",{on:{change:a.statusChange},model:{value:a.queryParams.software_status,callback:function(e){a.$set(a.queryParams,\"software_status\",e)},expression:\"queryParams.software_status\"}},[l(\"el-option\",{attrs:{label:\"全部\",value:\"\"}}),a._v(\" \"),l(\"el-option\",{attrs:{label:\"正常\",value:\"1\"}}),a._v(\" \"),l(\"el-option\",{attrs:{label:\"审核中\",value:\"0\"}}),a._v(\" \"),l(\"el-option\",{attrs:{label:\"不通过\",value:\"2\"}}),a._v(\" \"),l(\"el-option\",{attrs:{label:\"停用\",value:\"3\"}})],1)],1)],1),a._v(\" \"),l(\"el-col\",{staticClass:\"hy\",attrs:{span:8}},[l(\"Industry\",{attrs:{labelWidth:\"120px\"},on:{getCategory:a.categoryChange}})],1)],1),a._v(\" \"),l(\"el-row\",{attrs:{gutter:20}},[l(\"el-col\",{attrs:{span:8}},[l(\"el-form-item\",{attrs:{label:\"所属运营商\"}},[l(\"el-autocomplete\",{staticClass:\"inline-input\",attrs:{\"fetch-suggestions\":a.queryFistAgent,placeholder:\"请输入所属运营商\",clearable:\"\"},on:{select:a.fistAgentHandleSelect},model:{value:a.firstArgent,callback:function(e){a.firstArgent=e},expression:\"firstArgent\"}})],1)],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-form-item\",{attrs:{label:\"开户机构\"}},[l(\"el-autocomplete\",{staticClass:\"inline-input\",attrs:{\"fetch-suggestions\":a.queryTwoArgent,placeholder:\"请输入开户机构\",clearable:\"\"},on:{select:a.twoArgentHandleSelect},model:{value:a.twoArgent,callback:function(e){a.twoArgent=e},expression:\"twoArgent\"}})],1)],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-form-item\",{attrs:{label:\"企业名称\"}},[l(\"el-autocomplete\",{staticClass:\"inline-input\",attrs:{\"fetch-suggestions\":a.queryCompanyName,placeholder:\"请输入企业名称\",clearable:\"\"},on:{select:a.CompanyNameHandleSelect},model:{value:a.companyName,callback:function(e){a.companyName=e},expression:\"companyName\"}})],1)],1)],1),a._v(\" \"),l(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.showMoreSelect,expression:\"showMoreSelect\"}]},[l(\"el-row\",{attrs:{gutter:20}},[l(\"el-col\",{attrs:{span:8}},[l(\"GetRegion\",{attrs:{provincesCity:!0,labelWidth:\"120px\"},on:{region:a.region}})],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-form-item\",{attrs:{label:\"到期日期\"}},[l(\"GetTime\",{attrs:{isSelectFuture:!0,defalutTime:!0,showDay:!1},on:{changeTime:a.onChangeEndTime}})],1)],1)],1)],1),a._v(\" \"),l(\"el-form-item\",[l(\"el-button\",{attrs:{type:\"primary\"},nativeOn:{click:function(e){return a.search(e)}}},[a._v(\"查询\")])],1)],1)])],1),a._v(\" \"),l(\"div\",{staticClass:\"data-table-func clearfix\"},[l(\"div\",{staticClass:\"info-total\"},[a._v(\"企业数：\"),l(\"span\",[a._v(a._s(a._f(\"numberWithCommas\")(a.companyList.total)))]),a._v(\"家\")]),a._v(\" \"),l(\"div\",{staticClass:\"clearfix\",staticStyle:{\"margin-top\":\"10px\"}},[a._e(),a._v(\" \"),l(\"button\",{staticClass:\"dcsh pull-right\",attrs:{type:\"button\"},on:{click:a.exportExcel}},[a._v(\"导出\")])])]),a._v(\" \"),l(\"div\",{directives:[{name:\"loading\",rawName:\"v-loading\",value:a.companyListLoading,expression:\"companyListLoading\"}],staticClass:\"data-table\"},[l(\"el-table\",{staticStyle:{width:\"100%\"},attrs:{data:a.companyList.list,border:\"\",sortable:\"custom\",\"default-sort\":{prop:\"\",order:\"descending\"},\"max-height\":\"630\"},on:{\"sort-change\":a.sortChange}},[l(\"el-table-column\",{attrs:{fixed:\"\",prop:\"company_name\",width:\"200\",label:\"企业名称\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"ai_radar_purchased_num\",sortable:\"ai_radar_purchased_num\",label:\"开通AI雷达数\",width:\"130\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"ai_radar_opened_num\",sortable:\"ai_radar_opened_num\",label:\"启用AI雷达数\",width:\"130\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"rate_ai_radar_opened\",width:\"130\",label:\"雷达启用率\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"small_program_user_num\",sortable:\"small_program_user_num\",width:\"130\",label:\"客户总数\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"rate_small_program_use\",width:\"130\",label:\"人均客户数\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"small_program_pv\",sortable:\"small_program_pv\",width:\"130\",label:\"小程序总PV\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"card_tranfered_num\",sortable:\"card_tranfered_num\",label:\"被转发次数\",width:\"150\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"follow_up_num\",sortable:\"follow_up_num\",width:\"130\",label:\"客户跟进次数\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"order_payed_num\",sortable:\"order_payed_num\",width:\"130\",label:\"支付成功订单数\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"order_payed_money\",sortable:\"order_payed_money\",width:\"130\",label:\"成交金额\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"city\",width:\"130\",label:\"地区\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{width:\"130\",label:\"行业\"},scopedSlots:a._u([{key:\"default\",fn:function(e){return[l(\"span\",[a._v(a._s(e.row.first_industry)+\"/\"+a._s(e.row.second_industry))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"operator_id\",width:\"130\",label:\"所属运营商\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"owner_id\",width:\"130\",label:\"开户机构\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"open_date\",width:\"130\",label:\"开户日期\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"expire_date\",width:\"130\",label:\"到期日期\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"software_status\",label:\"使用状态\",width:\"120\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"software_version\",label:\"开通版本\",width:\"120\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"small_program_online_date\",label:\"小程序首次发布日期\",width:\"120\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{prop:\"enable_mall\",label:\"启用商城\",width:\"120\"}}),a._v(\" \"),l(\"el-table-column\",{attrs:{fixed:\"right\",label:\"操作\",width:\"120\"},scopedSlots:a._u([{key:\"default\",fn:function(e){var t=e.row;return[l(\"span\",{staticClass:\"text-code\",on:{click:function(e){a.lookCode(t)}}},[a._v(\"二维码 \")])]}}])})],1)],1),a._v(\" \"),l(\"div\",{staticClass:\"pager\"},[l(\"el-pagination\",{attrs:{layout:\"prev, pager, next, total, sizes\",\"current-page\":a.currentPage,\"page-sizes\":[10,20,50,100],\"page-size\":10,total:a.companyList.total},on:{\"size-change\":a.handleSizeChange,\"current-change\":a.handleCurrentChange}})],1),a._v(\" \"),l(\"el-dialog\",{attrs:{title:\"自定义列表头\",visible:a.dyColumnVisible,width:\"500px\"},on:{\"update:visible\":function(e){a.dyColumnVisible=e}}},[l(\"el-form\",{ref:\"columnForm\",staticClass:\"dialog\",attrs:{model:a.columnForm,\"label-width\":\"80px\",\"label-position\":\"top\"}},[l(\"el-form-item\",{attrs:{label:\"企业基本信息\"}},[l(\"el-checkbox-group\",{on:{change:a.columnChange},model:{value:a.columnForm.type,callback:function(e){a.$set(a.columnForm,\"type\",e)},expression:\"columnForm.type\"}},[l(\"el-row\",{attrs:{gutter:20}},[l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"1\",name:\"type2\"}},[a._v(\"企业名称\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"2\",name:\"type2\"}},[a._v(\"地区\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"3\",name:\"type2\"}},[a._v(\"行业\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"3\",name:\"type2\"}},[a._v(\"开户机构\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"4\",name:\"type1\"}},[a._v(\"开户日期\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"5\",name:\"type3\"}},[a._v(\"到期日期\")])],1)],1),a._v(\" \"),l(\"el-row\",{attrs:{gutter:20,label:\"AI雷达开通数\"}},[l(\"el-col\",{staticStyle:{\"font-size\":\"14px\",\"margin-top\":\"20px\"},attrs:{span:20}},[a._v(\"启用及使用情况信息 \")]),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"6\"}},[a._v(\"AI雷达开通数\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"7\"}},[a._v(\"AI雷达启用数\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"8\"}},[a._v(\"小程序授权状态\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"9\"}},[a._v(\"小程序用户数\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"10\",name:\"type\"}},[a._v(\"小程序转发数\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"11\",name:\"type1\"}},[a._v(\"是否启用商城\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"12\",name:\"type2\"}},[a._v(\"商城下单数\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"13\",name:\"type\"}},[a._v(\"成交金额\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"14\",name:\"type\"}},[a._v(\"支付订单数\")])],1),a._v(\" \"),l(\"el-col\",{attrs:{span:8}},[l(\"el-checkbox\",{attrs:{label:\"15\",name:\"type\"}},[a._v(\"客户跟进次数\")])],1)],1)],1)],1)],1),a._v(\" \"),l(\"div\",{staticClass:\"dialog-footer\",staticStyle:{\"text-align\":\"center\"},attrs:{slot:\"footer\"},slot:\"footer\"},[l(\"el-button\",{attrs:{size:\"medium\",type:\"primary\"},on:{click:function(e){a.dyColumnVisible=!1}}},[a._v(\"关闭\")])],1)],1),a._v(\" \"),l(\"el-dialog\",{attrs:{title:a.codeDialogData.codeTitle,visible:a.codeDialogData.visible,width:\"30%\",\"before-close\":a.handleClose},on:{\"update:visible\":function(e){a.$set(a.codeDialogData,\"visible\",e)}}},[l(\"div\",{staticClass:\"codePc\"},[l(\"img\",{directives:[{name:\"lazy\",rawName:\"v-lazy\",value:a.codeDialogData.codeImg,expression:\"codeDialogData.codeImg\"}],key:a.codeDialogData.codeImg,staticClass:\"code-img\"})])])],1)},staticRenderFns:[]};var v=a(\"C7Lr\")(u,d,!1,function(e){a(\"yk9m\")},null,null);t.default=v.exports},yk9m:function(e,t){}});"}