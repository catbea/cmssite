{"source":"webpackJsonp([7],{QYhh:function(e,t){},a1vR:function(e,t){},\"fq/o\":function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=a(\"4YfN\"),n=a.n(s),i=a(\"iv0z\"),l=a(\"0uLg\"),o=a(\"mkpk\"),r=a(\"0xDb\"),c=(a(\"DVuL\"),a(\"HVJf\")),_={components:{},data:function(){return{dialogVisible:!1,loading:!1,searchKeyword:\"\",treeData:[],selectedMembers:[]}},created:function(){var t=this;this.getSearchCompanyList({cellpack:function(e){t.treeData=e}})},mounted:function(){},methods:n()({},Object(c.b)([\"getSearchCompanyList\"]),{close:function(){this.$emit(\"onChooseMember\",this.selectedMembers)},choseClick:function(){if(!this.selectedMembers.length){var e=r.a.openLoading(!0);setTimeout(function(){return e.close()},6e3)}this.dialogVisible=!0},remove:function(e){this.selectedMembers.splice(e,1)},submit:function(){this.dialogVisible=!1}}),computed:n()({},Object(c.c)([\"searchCompanyList\"])),watch:{searchKeyword:function(t){this.treeData=this.searchCompanyList.filter(function(e){return-1!==e.company_name.indexOf(t)})}}},m={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s(\"div\",{staticClass:\"staff clearfix\",attrs:{id:\"staff\"}},[s(\"h3\",{staticClass:\"d-title\",staticStyle:{\"font-size\":\"16px\"}},[a._v(\"\\n                    指定企业 \"),s(\"el-button\",{staticClass:\"ml15\",attrs:{type:\"text\"},on:{click:a.choseClick}},[a._v(\"点击选择\")])],1),a._v(\" \"),s(\"div\",{staticClass:\"m15\"},a._l(a.selectedMembers,function(e,t){return s(\"el-tag\",{key:t,attrs:{closable:\"\"},on:{close:function(e){a.remove(t)}}},[a._v(\"\\n\\t\\t\\t\\t\"+a._s(e.company_name)+\"\\n\\t\\t\\t\")])}),1),a._v(\" \"),s(\"div\",[s(\"el-dialog\",{attrs:{title:\"选择企业\",visible:a.dialogVisible,width:\"617px\"},on:{\"update:visible\":function(e){a.dialogVisible=e},close:a.close}},[s(\"div\",{staticClass:\"staff-wrap\"},[s(\"div\",{staticClass:\"staff-search\"},[s(\"el-input\",{staticClass:\"search\",attrs:{size:\"medium\",placeholder:\"搜索\",clearable:\"\",maxlength:\"15\"},model:{value:a.searchKeyword,callback:function(e){a.searchKeyword=e},expression:\"searchKeyword\"}},[s(\"i\",{staticClass:\"el-icon-search\",staticStyle:{\"margin-top\":\"10px\"},attrs:{slot:\"suffix\"},slot:\"suffix\"})])],1),a._v(\" \"),s(\"div\",{staticClass:\"staff-top\"},[s(\"div\",{staticClass:\"yx\"},[a._v(\"已选\"+a._s(a.selectedMembers.length)+\"家\")])]),a._v(\" \"),s(\"div\",{staticClass:\"staff-mid clearfix\"},[s(\"div\",{staticClass:\"staff-left\"},[s(\"el-checkbox-group\",{model:{value:a.selectedMembers,callback:function(e){a.selectedMembers=e},expression:\"selectedMembers\"}},a._l(a.treeData,function(e,t){return s(\"el-checkbox\",{key:t,attrs:{label:e}},[a._v(a._s(e.company_name))])}),1)],1),a._v(\" \"),s(\"div\",{staticClass:\"staff-right\"},[s(\"div\",[s(\"ul\",{staticClass:\"staff-right-ul\"},a._l(a.selectedMembers,function(e,t){return s(\"li\",{key:t},[s(\"span\",[a._v(a._s(e.company_name))]),a._v(\" \"),s(\"i\",{staticClass:\"el-icon-error\",on:{click:function(e){a.remove(t)}}})])}),0)])])])]),a._v(\" \"),s(\"div\",{staticClass:\"dialog-footer\",attrs:{slot:\"footer\"},slot:\"footer\"},[s(\"el-button\",{attrs:{size:\"medium\",type:\"primary\"},on:{click:a.submit}},[a._v(\"关闭\")])],1)])],1)])},staticRenderFns:[]};var v=a(\"C7Lr\")(_,m,!1,function(e){a(\"QYhh\")},\"data-v-29ffcdf6\",null).exports,d=a(\"Vl9C\"),p=r.a.getTime(7),u={components:{GetRegion:i.a,GetTime:l.a,openVersion:o.a,ChooseCompany:v,Industry:d.a},data:function(){var e=new Date-864e5,t=new Date;return t.setTime(t.getTime()-6912e5),{firstArgent:\"\",twoArgent:\"\",openVersion:\"\",defaultTime:[t,e],pickerOptions0:{disabledDate:function(e){return e.getTime()>Date.now()-864e4}},showMoreSelect:!0,params:{open_start_date:\"\",open_end_date:\"\",industry_id:\"\",regional:\"\",city:\"\",province:\"\",operator_id:\"\",agent_id:\"\",software_version:\"\",enable_mall:\"\",online_status:\"\",time_size:\"1\",project_name:\"\",data_field:\"\",start_time:p.start_time,end_time:p.end_time,type:1,parent_id:\"\",company_ids:[]},isIndeterminateCompany:!0,checkAllCompany:!1,checkedCompany:[],isIndeterminateSC:!0,checkAllShop:!1,checkedShop:[],isIndeterminateActive:!0,checkAllActive:!1,checkedActive:[],isIndeterminateCoupon:!0,checkAllCoupon:!1,checkedCoupon:[],baseParams:[{regional:!1,field_name:\"地区\"},{industry_id:!1,field_name:\"行业\"},{header_agent_id:!1,field_name:\"所属总代理\"},{operator_id:!1,field_name:\"所属运营商\"},{salesman:!1,field_name:\"所属业务员\"},{customer:!1,field_name:\"所属客服\"},{software_version:!1,field_name:\"开通版本\"},{ai_radar_opened_num:!1,field_name:\"AI雷达启用数\"},{open_date:!1,field_name:\"开通日期\"},{expire_date:!1,field_name:\"到期日期\"},{online_status:!1,field_name:\"小程序上线状态\"},{small_program_online_date:!1,field_name:\"小程序首次发布日期\"}],activeParams:[{small_program_user_num:!1,field_name:\"客户总数\"},{small_program_active_user_num:!1,field_name:\"小程序活跃用户数\"},{small_program_new_user_num:!1,field_name:\"小程序新增用户数\"},{small_program_pv:!1,field_name:\"小程序pPV\"},{small_program_open_num:!1,field_name:\"小程序打开次数\"},{card_tranfered_num:!1,field_name:\"转发数\"},{thumbs_up_num:!1,field_name:\"点赞数\"},{ai_radar_active_user_num:!1,field_name:\"AI雷达活跃用户数\"},{boss_radar_active_user_num:!1,field_name:\"BOSS雷达活跃用户数\"},{customer_chat_num:!1,field_name:\"客户聊天人数\"},{salsesman_chat_num:!1,field_name:\"销售聊天人数\"},{IM_msg_num:!1,field_name:\"IM消息条数\"},{msg_pushed_num:!1,field_name:\"系统推送条数\"}],mallParams:[{product_pv:!1,field_name:\"商城/产品首页PV\"},{product_uv:!1,field_name:\"商城/产品首页UV\"},{company_product_num:!1,field_name:\"企业产品数\"},{salesman_product_num:!1,field_name:\"业务员产品数\"},{mall_pv:!1,field_name:\"商城详情页PV\"},{mall_uv:!1,field_name:\"商城详情页UV\"},{product_detail_pv:!1,field_name:\"产品详情页PV\"},{product_detail_uv:!1,field_name:\"产品详情页UV\"},{goods_num:!1,field_name:\"商品总数\"},{goods_on_shelves_num:!1,field_name:\"上架商品数\"},{new_goods_num:!1,field_name:\"新增商品总数\"},{new_goods_on_shelves_num:!1,field_name:\"新增上架商品数\"},{order_num:!1,field_name:\"订单数\"},{order_payed_num:!1,field_name:\"支付订单数\"},{order_money:!1,field_name:\"GMV\"},{order_payed_money:!1,field_name:\"已支付金额\"},{order_cancelled_num:!1,field_name:\"取消订单总数(包含超时自动和人工点击取消)\"},{order_cancelled_money:!1,field_name:\"取消订单金额(含未支付订单)\"},{order_payed_cancelled_money:!1,field_name:\"取消订单金额(已支付,不含未支付订单)\"},{order_cancelled_by_sys_num:!1,field_name:\"系统自动取消订单数\"},{after_sales_apply_num:!1,field_name:\"售后申请数\"},{after_sales_apply_money:!1,field_name:\"售后申请金额\"},{after_sales_apply_handled_num:!1,field_name:\"售后审核数\"},{refunds_amount:!1,field_name:\"退款金额\"},{order_cancelled_refunds_amount:!1,field_name:\"取消订单退款金额\"},{after_sales_refunds_amount:!1,field_name:\"售后退款金额\"},{distribution_commission_amount:!1,field_name:\"分销佣金总数\"},{new_distribution_commission_amount:!1,field_name:\"新产生佣金数\"},{distribution_order_num:!1,field_name:\"分销订单总数\"},{distribution_order_money:!1,field_name:\"分销订单总金额\"},{new_distribution_order_num:!1,field_name:\"新增分销订单数\"},{new_distribution_order_money:!1,field_name:\"新增分销订单金额\"},{new_distribution_order_payed_money:!1,field_name:\"新增分销订单实收金额\"},{goods_can_be_assembled_num:!1,field_name:\"可拼团商品数量\"},{order_assembled_num:!1,field_name:\"拼团订单总数\"},{order_assembled_money:!1,field_name:\"拼团订单金额总数\"},{new_order_assembled_num:!1,field_name:\"新增拼团订单数\"},{new_order_assembled_money:!1,field_name:\"新增拼团订单金额\"},{new_order_assembled_payed_money:!1,field_name:\"新增拼团订单金额(已支付)\"},{assembled_product_detail_uv:!1,field_name:\"拼团商品详情UV\"},{assemble_participant_num:!1,field_name:\"拼团人数\"}]}},created:function(){this.getSearchAgentList({type:1}),this.getSearchAgentList({type:0})},mounted:function(){},methods:n()({},Object(c.b)([\"getSearchAgentList\",\"getSearchCompanyList\",\"addTask\"]),{queryFistAgent:function(e,t){this.querySearchAsync(e,t,this.operatorList)},queryTwoArgent:function(e,t){this.querySearchAsync(e,t,this.allAgentList)},fistAgentHandleSelect:function(e){this.params.operator_id=e.uid||\"\"},twoArgentHandleSelect:function(e){this.params.agent_id=\"\"|e.uid},querySearchAsync:function(e,t,a){var s=e?a.filter(this.createStateFilter(e)):a;clearTimeout(this.timeout),this.timeout=setTimeout(function(){t(s)},1e3*Math.random())},createStateFilter:function(t){return function(e){return-1!==e.value.toLowerCase().indexOf(t.toLowerCase())}},getVersion:function(e){this.params.software_version=e},onChangeOpenTimeRange:function(e){this.params.open_start_date=e.start_time,this.params.open_end_date=e.end_time},region:function(e){this.params.city=e.city||\"\",this.params.province=e.province||\"\"},getCategory:function(e){this.params.industry_id=-1==e?\"\":e},onChangeTimeRange:function(e){this.params.end_time=e?(this.params.start_time=r.a.formatDate(e[0],\"yyyy-MM-dd\"),r.a.formatDate(e[1],\"yyyy-MM-dd\")):this.params.start_time=\"\"},allCompanyChange:function(e){this.baseParams=e?this.initParamsTrue(this.baseParams):this.initParams(this.baseParams),this.checkedCompany=e,this.isIndeterminateCompany=!1},companyChange:function(e){var t=this.initParams(this.baseParams),a=e.length;for(var s in e){var n=e[s];for(var i in t[n])t[n][i]||(t[n][i]=!0)}this.baseParams=t,this.checkAllCompany=a===this.baseParams.length,this.isIndeterminate=0<a&&a<this.companyField.length},initParams:function(e){for(var t in e)for(var a in e[t])\"boolean\"==typeof e[t][a]&&(e[t][a]=!1);return e},initParamsTrue:function(e){for(var t in e)for(var a in e[t])\"boolean\"==typeof e[t][a]&&(e[t][a]=!0);return e},allShopChange:function(e){e?this.mallParams=this.initParamsTrue(this.mallParams):this.activeParams=this.initParams(this.mallParams),console.log(this.mallParams),this.checkedShop=e,this.isIndeterminateSC=!1},shopChange:function(e){var t=this.initParams(this.mallParams),a=e.length;for(var s in e){var n=e[s];for(var i in t[n])t[n][i]||(t[n][i]=!0)}this.mallParams=t,this.checkAllShop=a===this.shopField.length,this.isIndeterminate=0<a&&a<this.shopField.length},allActiveChange:function(e){this.activeParams=e?this.initParamsTrue(this.activeParams):this.initParams(this.activeParams),console.log(this.activeParams),this.checkedActive=e,this.isIndeterminateActive=!1},activeChange:function(e){var t=this.initParams(this.activeParams),a=e.length;for(var s in e){var n=e[s];for(var i in t[n])t[n][i]||(t[n][i]=!0)}this.activeParams=t,this.checkAllActive=a===this.activeField.length,this.isIndeterminateActive=0<a&&a<this.activeField.length},allCouponChange:function(e){var t=this.couponField,a=[];t.forEach(function(e){a.push(e.id)}),this.checkedCoupon=e?a:[],this.isIndeterminateCoupon=!1},couponChange:function(e){var t=e.length;this.checkAllCoupon=t===this.couponField.length,this.isIndeterminateCoupon=0<t&&t<this.couponField.length},onChooseMember:function(e){var t=[];e.forEach(function(e){\"\"!=e.company_id&&t.push(e.company_id)}),this.params.company_ids=t},setDown:function(){var t=this,e=r.a.getsjc(this.params.end_time)-r.a.getsjc(this.params.start_time);if(this.params.start_time)if(r.a.isEmpty(this.params.project_name))if(90<e)r.a.toast(\"查询时间区间不能大于三个月！\");else{var a={params:n()({},this.params),fields:n()({},this.baseParams,this.activeParams,this.mallParams)};console.log(a),this.addTask(n()({},a,{cellpack:function(e){r.a.msg(\"任务创建成功！\"),r.a.toUrl(t,\"/down\")}}))}else r.a.toast(\"请填写任务名称！\");else r.a.toast(\"请在数据字段中选择日期！\")}}),computed:n()({},Object(c.c)([\"operatorList\",\"allAgentList\",\"companyField\",\"activeField\",\"shopField\",\"couponField\"])),watch:{firstArgent:function(e){!e&&this.fistAgentHandleSelect(\"\")},twoArgent:function(e){!e&&this.twoArgentHandleSelect(\"\")}}},h={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s(\"div\",{staticClass:\"downTask\"},[s(\"h2\",{staticClass:\"page-title\"},[a._v(\"\\n      数据下载-新建下载任务\\n      \"),s(\"el-popover\",{attrs:{trigger:\"hover\",placement:\"right\",width:\"760\"}},[s(\"div\",{staticStyle:{height:\"700px\",\"overflow-y\":\"scroll\",\"padding-right\":\"10px\"}},[s(\"p\",[s(\"strong\",[a._v(\"活跃类字段\")])]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"客户总数：\")]),a._v(\"截止当天的累计客户（小程序用户）数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"小程序活跃用户数：\")]),a._v(\"当天访问过小程序的用户数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"小程序新增用户数：\")]),a._v(\"当天首次访问小程序的用户数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"小程序PV：\")]),a._v(\"当天小程序页面访问次数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"小程序打开次数：\")]),a._v(\"当天小程序被打开的次数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"转发数：\")]),a._v(\"当天小程序被转发的次数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"点赞数：\")]),a._v(\"当天销售被点赞的数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"AI雷达活跃用户数：\")]),a._v(\"当天登录AI雷达的用户数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"Boss雷达活跃用户数：\")]),a._v(\"当天登录Boss雷达的用户数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"客户聊天人数：\")]),a._v(\"当天发送过聊天信息的客户人数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"销售聊天人数：\")]),a._v(\"当天发生过非自动聊天的名片主人数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"IM信息条数：\")]),a._v(\"当天IM消息发送的条数。不包含系统自动发送的消息数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"系统推送条数：\")]),a._v(\"当天系统向名片主推送feeds条数\")]),s(\"br\"),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"商城类字段\")])]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"商城/产品首页PV：\")]),a._v(\"当天商城或产品首页访问次数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"商城/产品首页UV：\")]),a._v(\"当天商城或产品首页访问人数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"企业产品数：\")]),a._v(\"当天上架状态的企业产品数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"业务员产品数：\")]),a._v(\"当天业务员上架状态的业务员产品数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"商品详情页PV：\")]),a._v(\"当天所有商品详情页访问次数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"商品详情页UV：\")]),a._v(\"当天所有商品详情页访问人数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"商品总数：\")]),a._v(\"当天处于上架&下架的商品总数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"上架商品数：\")]),a._v(\"当天处于上架状态的商品总数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增商品数：\")]),a._v(\"当天新添加的商品总数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新上架商品数：\")]),a._v(\"当天新添加且处于上架状态的商品总数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"订单数：\")]),a._v(\"当天产生的订单总数（含未支付订单）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"支付订单数：\")]),a._v(\"当天产生的已支付订单总数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"GMV：\")]),a._v(\"当天产生的订单总数对应的金额（含未支付订单）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"已支付金额：\")]),a._v(\"当天产生的已支付订单金额总数（未扣除后续取消的订单）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"取消订单总数：\")]),a._v(\"当天取消的订单数量（包含超时自动取消和人工点击取消）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"取消订单金额：\")]),a._v(\"当天所取消的订单对应的应付金额之和（含未支付订单）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"取消订单金额（已支付）：\")]),a._v(\"当天所取消的订单对应的应付金额之和（不含未支付订单）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"系统自动取消订单数：\")]),a._v(\"当天超时未支付，系统自动取消的订单数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"售后申请数：\")]),a._v(\"当天提交的售后单数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"售后申请金额：\")]),a._v(\"当天提交的售后单所涉及金额\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"售后审核数：\")]),a._v(\"当天售后单审核数量（包含打回&通过）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"退款金额：\")]),a._v(\"当天退款成功的金额总数\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"取消订单退款金额：\")]),a._v(\"当天类型为取消订单且退款成功的金额总数（仅以退款时间为准，不考虑取消提交时间）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"售后退款金额：\")]),a._v(\"当天类型为售后且退款成功的金额总数\")]),s(\"br\"),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"分销佣金总数：\")]),a._v(\"截止当天累计佣金数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新产生佣金数：\")]),a._v(\"当天新增佣金。如颗粒度为天时，即当天累计佣金-前一天累计佣金\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"分销订单总数：\")]),a._v(\"当天分销产生的订单总数。（包含未支付订单，统计时订单状态未取消）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"分销订单总金额：\")]),a._v(\"当天分销产生的订单包含的金额。（包含未支付订单，统计时订单状态未取消）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增分销订单数量：\")]),a._v(\"当天新增的分销订单数量。（包含未支付订单，统计时订单状态未取消）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增分销订单金额：\")]),a._v(\"当天新增的分销订单包含的金额。（包含未支付订单，统计时订单状态未取消）\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增分销订单实收金额：\")]),a._v(\"当天新增的完成支付的分销订单包含的金额。不包含未支付订单和已取消订单\")]),s(\"br\"),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"可拼团商品数量：\")]),a._v(\"当前已上架状态下的可拼团商品数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"拼团订单总数：\")]),a._v(\"当前累计拼团订单总数，包含未支付\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"拼团订单金额总数：\")]),a._v(\"当前累计拼团订单金额总数，包含未支付\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增拼团订单数量：\")]),a._v(\"当天/周/月新增的拼团订单数量\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增拼团订单金额：\")]),a._v(\"当天/周/月新增的拼团订单所含金额\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"新增拼团订单总金额（已支付）：\")]),a._v(\"当天新增的拼团支付成功的订单包含的金额\")]),a._v(\" \"),s(\"p\",[s(\"strong\",[a._v(\"拼团人数：\")]),a._v(\"当天/周/月发起拼团和参团的人数，包含未支付\")])]),a._v(\" \"),s(\"i\",{staticClass:\"el-icon-question\",attrs:{slot:\"reference\"},slot:\"reference\"})])],1),a._v(\" \"),s(\"div\",[s(\"h3\",{staticClass:\"d-title\"},[a._v(\"数据源筛选\")]),a._v(\" \"),s(\"div\",[s(\"el-radio-group\",{staticStyle:{\"margin-bottom\":\"15px\"},attrs:{size:\"medium\"},model:{value:a.params.type,callback:function(e){a.$set(a.params,\"type\",e)},expression:\"params.type\"}},[s(\"el-radio-button\",{attrs:{label:\"1\"}},[a._v(\"按条件筛选\")]),a._v(\" \"),s(\"el-radio-button\",{attrs:{label:\"2\"}},[a._v(\"选择特定企业\")])],1)],1),a._v(\" \"),s(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:1==a.params.type,expression:\"params.type==1\"}],staticClass:\"sxTab\"},[s(\"el-form\",{ref:\"form\",attrs:{size:\"small\",\"label-position\":\"left\",\"label-width\":\"120px\"}},[s(\"div\",[s(\"el-row\",{attrs:{gutter:20}},[s(\"el-col\",{attrs:{span:8}},[s(\"el-form-item\",{attrs:{label:\"开户日期\"}},[s(\"GetTime\",{attrs:{spanIndex:3,showDay:!1},on:{changeTime:a.onChangeOpenTimeRange}})],1)],1),a._v(\" \"),s(\"el-col\",{attrs:{span:8}},[s(\"Industry\",{staticStyle:{display:\"inline-block\"},attrs:{labelWidth:\"100px\"},on:{getCategory:a.getCategory}})],1),a._v(\" \"),s(\"el-col\",{attrs:{span:8}},[s(\"GetRegion\",{attrs:{provincesCity:!0,labelWidth:\"120px\"},on:{region:a.region}})],1)],1),a._v(\" \"),s(\"el-row\",{attrs:{gutter:20}},[s(\"el-col\",{attrs:{span:8}},[s(\"el-form-item\",{attrs:{label:\"所属运营商\"}},[s(\"el-autocomplete\",{staticClass:\"inline-input\",attrs:{\"fetch-suggestions\":a.queryFistAgent,placeholder:\"请输入所属运营商\",clearable:\"\"},on:{select:a.fistAgentHandleSelect},model:{value:a.firstArgent,callback:function(e){a.firstArgent=e},expression:\"firstArgent\"}})],1)],1),a._v(\" \"),s(\"el-col\",{attrs:{span:8}},[s(\"el-form-item\",{attrs:{label:\"开户机构\"}},[s(\"el-autocomplete\",{staticClass:\"inline-input\",attrs:{\"fetch-suggestions\":a.queryTwoArgent,placeholder:\"请输入开户机构\",clearable:\"\"},on:{select:a.twoArgentHandleSelect},model:{value:a.twoArgent,callback:function(e){a.twoArgent=e},expression:\"twoArgent\"}})],1)],1),a._v(\" \"),s(\"el-col\",{attrs:{span:8}},[s(\"openVersion\",{staticStyle:{display:\"inline-block\"},on:{getVersion:a.getVersion}})],1),a._v(\" \"),s(\"el-col\",{attrs:{span:8}},[s(\"el-form-item\",{attrs:{label:\"是否启用商城\"}},[s(\"el-select\",{model:{value:a.params.enable_mall,callback:function(e){a.$set(a.params,\"enable_mall\",e)},expression:\"params.enable_mall\"}},[s(\"el-option\",{attrs:{label:\"全部\",value:\"\"}}),a._v(\" \"),s(\"el-option\",{attrs:{label:\"启用\",value:\"1\"}}),a._v(\" \"),s(\"el-option\",{attrs:{label:\"未启用\",value:\"0\"}})],1)],1)],1),a._v(\" \"),s(\"el-col\",{attrs:{span:8}},[s(\"el-form-item\",{attrs:{label:\"小程序上线状态\"}},[s(\"el-select\",{model:{value:a.params.online_status,callback:function(e){a.$set(a.params,\"online_status\",e)},expression:\"params.online_status\"}},[s(\"el-option\",{attrs:{label:\"全部\",value:\"\"}}),a._v(\" \"),s(\"el-option\",{attrs:{label:\"已上线\",value:\"2\"}}),a._v(\" \"),s(\"el-option\",{attrs:{label:\"待上线\",value:\"3\"}})],1)],1)],1)],1),a._v(\" \"),s(\"div\")],1)])],1),a._v(\" \"),s(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:2==a.params.type,expression:\"params.type==2\"}]},[s(\"div\",{staticClass:\"choose clearfix\"},[s(\"chooseCompany\",{on:{onChooseMember:a.onChooseMember}})],1)]),a._v(\" \"),s(\"h3\",{staticClass:\"d-title\"},[a._v(\"导出字段 \\n\\t\\t\\t\\t\")]),a._v(\" \"),s(\"div\",{staticClass:\"qy-info\"},[s(\"h4\",[a._v(\"企业基本信息字段\")]),a._v(\" \"),s(\"h5\",[a._v(\" 企业信息\\n\\t\\t\\t\\t\"),s(\"el-checkbox\",{staticClass:\"ml15\",attrs:{indeterminate:a.isIndeterminateCompany},on:{change:a.allCompanyChange},model:{value:a.checkAllCompany,callback:function(e){a.checkAllCompany=e},expression:\"checkAllCompany\"}},[a._v(\"全选\")])],1),a._v(\" \"),s(\"el-row\",{staticClass:\"p15\",attrs:{gutter:20}},[s(\"el-checkbox-group\",{on:{change:a.companyChange},model:{value:a.checkedCompany,callback:function(e){a.checkedCompany=e},expression:\"checkedCompany\"}},a._l(a.baseParams,function(e,t){return s(\"el-col\",{key:t,staticClass:\"mb15\",attrs:{span:6}},[s(\"el-checkbox\",{attrs:{label:t}},[a._v(a._s(e.field_name))])],1)}),1)],1)],1),a._v(\" \"),s(\"div\",{staticClass:\"warp\"},[s(\"h4\",{staticClass:\"clearfix teh4\"},[s(\"span\",{staticClass:\"span\"},[a._v(\"数据字段\")]),a._v(\" \"),s(\"el-form\",{staticClass:\"m15\",attrs:{size:\"small\",\"label-position\":\"left\",\"label-width\":\"100px\"}},[s(\"el-row\",{attrs:{gutter:20}},[s(\"el-col\",{attrs:{span:10}},[s(\"el-form-item\",{attrs:{label:\"数据粒度\"}},[s(\"el-select\",{attrs:{disabled:\"\"},model:{value:a.params.time_size,callback:function(e){a.$set(a.params,\"time_size\",e)},expression:\"params.time_size\"}},[s(\"el-option\",{attrs:{label:\"每日\",value:\"1\"}}),a._v(\" \"),s(\"el-option\",{attrs:{label:\"每周\",value:\"2\"}}),a._v(\" \"),s(\"el-option\",{attrs:{label:\"每月\",value:\"3\"}})],1)],1)],1),a._v(\" \"),s(\"el-col\",{attrs:{span:10}},[s(\"el-form-item\",{attrs:{label:\"选择日期\"}},[s(\"el-date-picker\",{attrs:{type:\"daterange\",\"picker-options\":a.pickerOptions0,\"range-separator\":\"至\",\"start-placeholder\":\"开始日期\",\"end-placeholder\":\"结束日期\"},on:{change:a.onChangeTimeRange},model:{value:a.defaultTime,callback:function(e){a.defaultTime=e},expression:\"defaultTime\"}})],1)],1)],1)],1),a._v(\" \"),s(\"span\",{staticClass:\"span\",staticStyle:{\"font-size\":\"10px\",float:\"none\",\"margin-left\":\"-9%\"}},[a._v(\"*选择区间不能大于三个月\")])],1),a._v(\" \"),s(\"div\",[s(\"h5\",[a._v(\"活跃类数据字段\\n\\t\\t\\t          \"),s(\"el-checkbox\",{staticClass:\"ml15\",attrs:{indeterminate:a.isIndeterminateActive},on:{change:a.allActiveChange},model:{value:a.checkAllActive,callback:function(e){a.checkAllActive=e},expression:\"checkAllActive\"}},[a._v(\"全选\")])],1),a._v(\" \"),s(\"el-row\",{staticClass:\"p15\",attrs:{gutter:20}},[s(\"el-checkbox-group\",{on:{change:a.activeChange},model:{value:a.checkedActive,callback:function(e){a.checkedActive=e},expression:\"checkedActive\"}},a._l(a.activeParams,function(e,t){return s(\"el-col\",{key:t,staticClass:\"mb15\",attrs:{span:6}},[s(\"el-checkbox\",{attrs:{label:t}},[a._v(a._s(e.field_name))])],1)}),1)],1)],1),a._v(\" \"),s(\"div\",[s(\"h5\",[a._v(\"\\n\\t\\t          \\t商城类数据字段\\n\\t\\t          \"),s(\"el-checkbox\",{staticClass:\"ml15\",attrs:{indeterminate:a.isIndeterminateSC},on:{change:a.allShopChange},model:{value:a.checkAllShop,callback:function(e){a.checkAllShop=e},expression:\"checkAllShop\"}},[a._v(\"全选\")])],1),a._v(\" \"),s(\"el-row\",{staticClass:\"p15\",attrs:{gutter:20}},[s(\"el-checkbox-group\",{on:{change:a.shopChange},model:{value:a.checkedShop,callback:function(e){a.checkedShop=e},expression:\"checkedShop\"}},a._l(a.mallParams,function(e,t){return s(\"el-col\",{key:t,staticClass:\"mb15\",attrs:{span:6}},[s(\"el-checkbox\",{attrs:{label:t}},[a._v(a._s(e.field_name))])],1)}),1)],1)],1),a._v(\" \"),s(\"div\",[s(\"h5\",[a._v(\"\\n\\t\\t          优惠券类数据字段\\n\\t\\t          \"),s(\"el-checkbox\",{staticClass:\"ml15\",attrs:{indeterminate:a.isIndeterminateCoupon},on:{change:a.allCouponChange},model:{value:a.checkAllCoupon,callback:function(e){a.checkAllCoupon=e},expression:\"checkAllCoupon\"}},[a._v(\"全选\")])],1),a._v(\" \"),s(\"el-row\",{staticClass:\"p15\",attrs:{gutter:20}},[s(\"el-checkbox-group\",{on:{change:a.couponChange},model:{value:a.checkedCoupon,callback:function(e){a.checkedCoupon=e},expression:\"checkedCoupon\"}},a._l(a.mallParams,function(e,t){return s(\"el-col\",{key:t,staticClass:\"mb15\",attrs:{span:6}},[s(\"el-checkbox\",{attrs:{label:t}},[a._v(a._s(e.field_name))])],1)}),1)],1)],1),a._v(\" \"),s(\"el-row\",{staticClass:\"m15\"},[s(\"span\",[a._v(\"任务名称\")]),a._v(\" \"),s(\"el-input\",{staticClass:\"ml15\",staticStyle:{\"max-width\":\"315px\"},attrs:{clearable:\"\",placeholder:\"请输入任务名称\",size:\"small\",maxlength:\"10\"},model:{value:a.params.project_name,callback:function(e){a.$set(a.params,\"project_name\",e)},expression:\"params.project_name\"}})],1)],1),a._v(\" \"),s(\"el-button\",{staticClass:\"m15\",staticStyle:{width:\"100px\",margin:\"24px 0 40px 15px\"},attrs:{size:\"small\"},nativeOn:{click:function(e){return a.setDown(e)}}},[a._v(\"确定\")])],1)])},staticRenderFns:[]};var f=a(\"C7Lr\")(u,h,!1,function(e){a(\"a1vR\"),a(\"l62p\")},null,null);t.default=f.exports},l62p:function(e,t){}});"}