<template>
	<div class="downTask">
		<h2 class="page-title">
      数据下载-新建下载任务
      <el-popover trigger="hover" placement="right" width="760" >
        <div style="height:700px;overflow-y: scroll;padding-right: 10px;">
			<p><strong>活跃类字段</strong></p>
			<p><strong>客户总数：</strong>截止当天的累计客户（小程序用户）数</p>
			<p><strong>小程序活跃用户数：</strong>当天访问过小程序的用户数</p>
			<p><strong>小程序新增用户数：</strong>当天首次访问小程序的用户数</p>
			<p><strong>小程序PV：</strong>当天小程序页面访问次数</p>
			<p><strong>小程序打开次数：</strong>当天小程序被打开的次数</p>
			<p><strong>转发数：</strong>当天小程序被转发的次数</p>
			<p><strong>点赞数：</strong>当天销售被点赞的数量</p>
			<p><strong>AI雷达活跃用户数：</strong>当天登录AI雷达的用户数</p>
			<p><strong>Boss雷达活跃用户数：</strong>当天登录Boss雷达的用户数</p>
			<p><strong>客户聊天人数：</strong>当天发送过聊天信息的客户人数</p>
			<p><strong>销售聊天人数：</strong>当天发生过非自动聊天的名片主人数</p>
			<p><strong>IM信息条数：</strong>当天IM消息发送的条数。不包含系统自动发送的消息数</p>
			<p><strong>系统推送条数：</strong>当天系统向名片主推送feeds条数</p><br>

			<p><strong>商城类字段</strong></p>
			<p><strong>商城/产品首页PV：</strong>当天商城或产品首页访问次数</p>
			<p><strong>商城/产品首页UV：</strong>当天商城或产品首页访问人数</p>
			<p><strong>企业产品数：</strong>当天上架状态的企业产品数</p>
			<p><strong>业务员产品数：</strong>当天业务员上架状态的业务员产品数</p>
			<p><strong>商品详情页PV：</strong>当天所有商品详情页访问次数</p>
			<p><strong>商品详情页UV：</strong>当天所有商品详情页访问人数</p>
			<p><strong>商品总数：</strong>当天处于上架&下架的商品总数量</p>
			<p><strong>上架商品数：</strong>当天处于上架状态的商品总数量</p>
			<p><strong>新增商品数：</strong>当天新添加的商品总数量</p>
			<p><strong>新上架商品数：</strong>当天新添加且处于上架状态的商品总数量</p>
			<p><strong>订单数：</strong>当天产生的订单总数（含未支付订单）</p>
			<p><strong>支付订单数：</strong>当天产生的已支付订单总数</p>
			<p><strong>GMV：</strong>当天产生的订单总数对应的金额（含未支付订单）</p>
			<p><strong>已支付金额：</strong>当天产生的已支付订单金额总数（未扣除后续取消的订单）</p>
			<p><strong>取消订单总数：</strong>当天取消的订单数量（包含超时自动取消和人工点击取消）</p>
			<p><strong>取消订单金额：</strong>当天所取消的订单对应的应付金额之和（含未支付订单）</p>
			<p><strong>取消订单金额（已支付）：</strong>当天所取消的订单对应的应付金额之和（不含未支付订单）</p>
			<p><strong>系统自动取消订单数：</strong>当天超时未支付，系统自动取消的订单数</p>
			<p><strong>售后申请数：</strong>当天提交的售后单数量</p>
			<p><strong>售后申请金额：</strong>当天提交的售后单所涉及金额</p>
			<p><strong>售后审核数：</strong>当天售后单审核数量（包含打回&通过）</p>
			<p><strong>退款金额：</strong>当天退款成功的金额总数</p>
			<p><strong>取消订单退款金额：</strong>当天类型为取消订单且退款成功的金额总数（仅以退款时间为准，不考虑取消提交时间）</p>
			<p><strong>售后退款金额：</strong>当天类型为售后且退款成功的金额总数</p><br>

			<p><strong>分销佣金总数：</strong>截止当天累计佣金数量</p>
			<p><strong>新产生佣金数：</strong>当天新增佣金。如颗粒度为天时，即当天累计佣金-前一天累计佣金</p>
			<p><strong>分销订单总数：</strong>当天分销产生的订单总数。（包含未支付订单，统计时订单状态未取消）</p>
			<p><strong>分销订单总金额：</strong>当天分销产生的订单包含的金额。（包含未支付订单，统计时订单状态未取消）</p>
			<p><strong>新增分销订单数量：</strong>当天新增的分销订单数量。（包含未支付订单，统计时订单状态未取消）</p>
			<p><strong>新增分销订单金额：</strong>当天新增的分销订单包含的金额。（包含未支付订单，统计时订单状态未取消）</p>
			<p><strong>新增分销订单实收金额：</strong>当天新增的完成支付的分销订单包含的金额。不包含未支付订单和已取消订单</p><br>

			<p><strong>可拼团商品数量：</strong>当前已上架状态下的可拼团商品数量</p>
			<p><strong>拼团订单总数：</strong>当前累计拼团订单总数，包含未支付</p>
			<p><strong>拼团订单金额总数：</strong>当前累计拼团订单金额总数，包含未支付</p>
			<p><strong>新增拼团订单数量：</strong>当天/周/月新增的拼团订单数量</p>
			<p><strong>新增拼团订单金额：</strong>当天/周/月新增的拼团订单所含金额</p>
			<p><strong>新增拼团订单总金额（已支付）：</strong>当天新增的拼团支付成功的订单包含的金额</p>
			<p><strong>拼团人数：</strong>当天/周/月发起拼团和参团的人数，包含未支付</p>         
          
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
    </h2>

		<div>
			<h3 class="d-title">数据源筛选</h3>
			<div>
				<el-radio-group v-model="params.type" style="margin-bottom: 15px;" size="medium">
					<el-radio-button label="1">按条件筛选</el-radio-button>
					<el-radio-button label="2">选择特定企业</el-radio-button>
				</el-radio-group>
			</div>
			<div class="sxTab" v-show="params.type==1">
				<el-form ref="form" size="small" label-position="left" label-width="120px">
					<div>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="开户日期">
									<GetTime @changeTime="onChangeOpenTimeRange" :spanIndex="3" :showDay="false"></GetTime>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<Industry style="display: inline-block; " @getCategory='getCategory' labelWidth='100px'></Industry>
							</el-col>
							<el-col :span="8">
								<GetRegion @region="region" :provincesCity="true" labelWidth="120px"></GetRegion>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="所属运营商">
									<el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入所属运营商" clearable @select="fistAgentHandleSelect"></el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="开户机构">
									<el-autocomplete class="inline-input" v-model="twoArgent" :fetch-suggestions="queryTwoArgent" placeholder="请输入开户机构" clearable @select="twoArgentHandleSelect"></el-autocomplete>
								</el-form-item>
									
							</el-col>
							<el-col :span="8">
								<openVersion style="display: inline-block; "  @getVersion='getVersion'></openVersion>									
							</el-col>
							<el-col :span="8">
								<el-form-item label="是否启用商城">
									<el-select v-model="params.enable_mall">
										<el-option label="全部" value=""></el-option>
										<el-option label="启用" value="1"></el-option>
										<el-option label="未启用" value="0"></el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="小程序上线状态">
									<el-select v-model="params.online_status">
										<el-option label="全部" value=""></el-option>
										<el-option label="已上线" value="2"></el-option>
										<el-option label="待上线" value="3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<div>
						</div>
					</div>
				</el-form>
			</div>
			<div v-show="params.type==2">
				<div class="choose clearfix">
					<chooseCompany @onChooseMember='onChooseMember'></chooseCompany>
				</div>
			</div>
			<!--  数据源选择 -->
			<h3 class="d-title">导出字段 
				<!--<span class="tsy">（<i>*</i>导出字段15个以内）</span>-->
			</h3>
			<div class="qy-info">
				<h4>企业基本信息字段</h4>
				<h5> 企业信息
				<el-checkbox v-model="checkAllCompany" :indeterminate="isIndeterminateCompany" class="ml15" @change="allCompanyChange">全选</el-checkbox>
				</h5>
				<el-row :gutter="20" class="p15">
					<el-checkbox-group @change="companyChange" v-model="checkedCompany">
						<el-col :span="6" class="mb15" v-for="(company,index) in baseParams" :key="index">
							<el-checkbox :label="index">{{company.field_name}}</el-checkbox>
						</el-col>
					</el-checkbox-group>
				</el-row>
			</div>
			<div class="warp">
				<h4 class="clearfix teh4">
			        <span class="span">数据字段</span> 
			        <el-form size="small" label-position="left" label-width="100px" class="m15">
			          <el-row :gutter="20">
			            <el-col :span="10">
			              <el-form-item label="数据粒度">
			                <el-select v-model="params.time_size" disabled>
			                  <el-option label="每日" value="1"></el-option>
			                  <el-option label="每周" value="2"></el-option>
			                  <el-option label="每月" value="3"></el-option>
			                </el-select>
			              </el-form-item>
			            </el-col>
			            <el-col :span="10">
			              <el-form-item label="选择日期">  
			              	 <el-date-picker
							      v-model="defaultTime"
							      type="daterange"
							      @change="onChangeTimeRange"
							      :picker-options="pickerOptions0"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
						    </el-date-picker>						 
			              </el-form-item>
			            </el-col>  
			          </el-row>
			        </el-form>
					<span class="span" style="font-size:10px;float:none;margin-left:-9%">*选择区间不能大于三个月</span>
             </h4>
				<div>
					<h5>活跃类数据字段
			          <el-checkbox  v-model="checkAllActive" :indeterminate="isIndeterminateActive" class="ml15" @change="allActiveChange">全选</el-checkbox>
			        </h5>
					<el-row :gutter="20" class="p15">
						<el-checkbox-group @change="activeChange" v-model="checkedActive">
							<el-col :span="6" class="mb15" v-for="(active,index) in activeParams" :key="index">
								<el-checkbox :label="index">{{active.field_name}}</el-checkbox>
							</el-col>
						</el-checkbox-group>
					</el-row>
				</div>
				<div>
					<h5>
		          	商城类数据字段
		          <el-checkbox  v-model="checkAllShop" @change="allShopChange" :indeterminate="isIndeterminateSC" class="ml15">全选</el-checkbox>
		        </h5>
					<el-row :gutter="20" class="p15">
						<el-checkbox-group v-model="checkedShop" @change="shopChange">
							<el-col :span="6" class="mb15" v-for="(shop,index) in mallParams" :key="index">
								<el-checkbox :label="index">{{shop.field_name}}</el-checkbox>
							</el-col>
						</el-checkbox-group>
					</el-row>
				</div>
				<div>
					<h5>
		          优惠券类数据字段
		          <el-checkbox  v-model="checkAllCoupon" @change="allCouponChange" :indeterminate="isIndeterminateCoupon" class="ml15">全选</el-checkbox>
		        </h5>
					<el-row :gutter="20" class="p15">
						<el-checkbox-group v-model="checkedCoupon" @change="couponChange">
							<el-col :span="6" class="mb15" v-for="(coupon,index) in mallParams" :key="index">
								<el-checkbox :label="index">{{coupon.field_name}}</el-checkbox>
							</el-col>
						</el-checkbox-group>
					</el-row>
				</div>
				<el-row class="m15">
					<span>任务名称</span>
					<el-input v-model="params.project_name" clearable placeholder="请输入任务名称" style="max-width: 315px" size="small" class="ml15" maxlength='10'></el-input>
				</el-row>
			</div>
			<el-button size="small" @click.native="setDown" class="m15" style="width: 100px; margin:24px 0 40px 15px;">确定</el-button>
		</div>

	</div>
</template>
<script>
	import GetRegion from '@/components/getRegion'
	import GetTime from '@/components/getTime'
	import openVersion from '../../components/openVersion'
	import ChooseCompany from './chooseCompany'
	import Industry from '../../components/industry'
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import Utils from '@/utils/index'
	const  Time=Utils.getTime(7)
	export default {
		components: {
			GetRegion,
			GetTime,
			openVersion,
			ChooseCompany,
			Industry
		},
		data() {
			const end = new Date()-3600 * 1000 * 24;
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 8);
			return {
				firstArgent:"",
				twoArgent:"",
				openVersion:"",
				defaultTime:[start,end],
			    pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() > Date.now() - 8.64e6
		          }
		        },
				showMoreSelect: true, //是否显示更多赛选
				params: {
					open_start_date:"",
					open_end_date:"",
					industry_id:"",
					regional:"",
					city:"",
					province:"",
					operator_id:"",//总代理
					agent_id:"",//二级代理
					software_version:"",
					enable_mall:"",
					online_status:"",
					time_size:"1",
					project_name: '',
					data_field: '',
					start_time: Time.start_time,
					end_time: Time.end_time,
					type: 1,
					parent_id: '',
					company_ids: [],
				},

				isIndeterminateCompany: true, //企业信息全选
				checkAllCompany: false,
				checkedCompany: [],

				isIndeterminateSC: true, //商城全选
				checkAllShop: false,
				checkedShop: [],

				isIndeterminateActive: true, //活跃字段全选
				checkAllActive: false,
				checkedActive: [],

				isIndeterminateCoupon: true, //优惠券全选
				checkAllCoupon: false,
				checkedCoupon: [],
				//基本信息字段
				baseParams:[
					{regional:false,field_name:"地区"},
					{industry_id:false,field_name:"行业"},
					{header_agent_id:false,field_name:"所属总代理"},
					{operator_id:false,field_name:"所属运营商"},
					{salesman:false,field_name:"所属业务员"},
					{customer:false,field_name:"所属客服"},
					{software_version:false,field_name:"开通版本"},
					{ai_radar_opened_num:false,field_name:"AI雷达启用数"},
					{open_date:false,field_name:"开通日期"},
					// {lately_purchase_date:false,field_name:"最近购买日期"},
					{expire_date:false,field_name:"到期日期"},
					{online_status:false,field_name:"小程序上线状态"},
					{small_program_online_date:false,field_name:"小程序首次发布日期"}
				],
				//活跃类字段
				activeParams:[
					{small_program_user_num:false,field_name:"客户总数"},
					{small_program_active_user_num:false,field_name:"小程序活跃用户数"},
					{small_program_new_user_num:false,field_name:"小程序新增用户数"},
					{small_program_pv:false,field_name:"小程序pPV"},
					{small_program_open_num:false,field_name:"小程序打开次数"},
					{card_tranfered_num:false,field_name:"转发数"},
					{thumbs_up_num:false,field_name:"点赞数"},
					{ai_radar_active_user_num:false,field_name:"AI雷达活跃用户数"},
					{boss_radar_active_user_num:false,field_name:"BOSS雷达活跃用户数"},
					{customer_chat_num:false,field_name:"客户聊天人数"},
					{salsesman_chat_num:false,field_name:"销售聊天人数"},
					{IM_msg_num:false,field_name:"IM消息条数"},
					{msg_pushed_num:false,field_name:"系统推送条数"}
				],
				//商城类字段
				mallParams:[
					{product_pv:false,field_name:"商城/产品首页PV"},
					{product_uv:false,field_name:"商城/产品首页UV"},
					{company_product_num:false,field_name:"企业产品数"},
					{salesman_product_num:false,field_name:"业务员产品数"},
					{mall_pv:false,field_name:"商城详情页PV"},
					{mall_uv:false,field_name:"商城详情页UV"},
					{product_detail_pv:false,field_name:"产品详情页PV"},
					{product_detail_uv:false,field_name:"产品详情页UV"},
					{goods_num:false,field_name:"商品总数"},
					{goods_on_shelves_num:false,field_name:"上架商品数"},
					{new_goods_num:false,field_name:"新增商品总数"},
					{new_goods_on_shelves_num:false,field_name:"新增上架商品数"},
					{order_num:false,field_name:"订单数"},
					{order_payed_num:false,field_name:"支付订单数"},
					{order_money:false,field_name:"GMV"},
					{order_payed_money:false,field_name:"已支付金额"},
					{order_cancelled_num:false,field_name:"取消订单总数(包含超时自动和人工点击取消)"},
					{order_cancelled_money:false,field_name:"取消订单金额(含未支付订单)"},
					{order_payed_cancelled_money:false,field_name:"取消订单金额(已支付,不含未支付订单)"},
					{order_cancelled_by_sys_num:false,field_name:"系统自动取消订单数"},
					{after_sales_apply_num:false,field_name:"售后申请数"},
					{after_sales_apply_money:false,field_name:"售后申请金额"},
					{after_sales_apply_handled_num:false,field_name:"售后审核数"},
					{refunds_amount:false,field_name:"退款金额"},
					{order_cancelled_refunds_amount:false,field_name:"取消订单退款金额"},
					{after_sales_refunds_amount:false,field_name:"售后退款金额"},
					{distribution_commission_amount:false,field_name:"分销佣金总数"},
					{new_distribution_commission_amount:false,field_name:"新产生佣金数"},
					{distribution_order_num:false,field_name:"分销订单总数"},
					{distribution_order_money:false,field_name:"分销订单总金额"},
					{new_distribution_order_num:false,field_name:"新增分销订单数"},
					{new_distribution_order_money:false,field_name:"新增分销订单金额"},
					{new_distribution_order_payed_money:false,field_name:"新增分销订单实收金额"},
					{goods_can_be_assembled_num:false,field_name:"可拼团商品数量"},
					{order_assembled_num:false,field_name:"拼团订单总数"},
					{order_assembled_money:false,field_name:"拼团订单金额总数"},
					{new_order_assembled_num:false,field_name:"新增拼团订单数"},
					{new_order_assembled_money:false,field_name:"新增拼团订单金额"},
					{new_order_assembled_payed_money:false,field_name:"新增拼团订单金额(已支付)"},
					{assembled_product_detail_uv:false,field_name:"拼团商品详情UV"},
					// {assembled_page_uv:false,field_name:"参团页UV"},
					{assemble_participant_num:false,field_name:"拼团人数"}					
				]
			}
		},
		created() { 
			this.getSearchAgentList({
				type: 1
			});
			 //运营商
			this.getSearchAgentList({
				type: 0
			}); //开户机构
		},
		mounted() {
			
		},
		methods: {
			...mapActions(['getSearchAgentList', 'getSearchCompanyList', 'addTask']),

			//----模糊搜索star-----------
			queryFistAgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.operatorList)
			},
			queryTwoArgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.allAgentList)
			},
			//总代理选择
			fistAgentHandleSelect(item) {
				this.params.operator_id = item.uid||"";
			},
			twoArgentHandleSelect(item) {
				this.params.agent_id = item.uid|"";
			},
			querySearchAsync(queryString, cb, restaurants) {

				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 1000 * Math.random());
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
				};
			},
			//开通版本
			getVersion(val){
				this.params.software_version = val;
			},
			//模糊搜索end------------

			//开户时间
			onChangeOpenTimeRange(val) {
				this.params.open_start_date = val.start_time;
				this.params.open_end_date = val.end_time;
			},
			//地区切换
			region(val) {
				this.params.city = val.city||"";
				this.params.province = val.province||"";					
			},
			//行业切换
			getCategory(val) {				
				this.params.industry_id = val==-1?"":val;
			},
			//选择时间
			onChangeTimeRange(value) { 
				if(value){
					this.params.start_time =Utils.formatDate(value[0],'yyyy-MM-dd')   
				    this.params.end_time =Utils.formatDate(value[1],'yyyy-MM-dd')  ;
				}else{
					this.params.start_time ='';
				    this.params.end_time = '' ;
				}
			},
			//企业信息字段全选-------------
			allCompanyChange(val) {
				if(val){					
					this.baseParams = this.initParamsTrue(this.baseParams);
				}else{
					this.baseParams = this.initParams(this.baseParams)	
				}
				this.checkedCompany = val;
				this.isIndeterminateCompany = false;
			},
			companyChange(value) {
				let baseParams = this.initParams(this.baseParams)	
				let checkedCount = value.length;

				for(let i in value){
					let baseIndex = value[i];
					for(let key in baseParams[baseIndex]){
						if(!baseParams[baseIndex][key]){
							baseParams[baseIndex][key]	= true;
						}
					}
				}

				this.baseParams = baseParams;

				this.checkAllCompany = checkedCount === this.baseParams.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.companyField.length;
			},
			//取消全选初始化
			initParams(baseParams){
				for(let key in baseParams){
					for(let baseIndex in baseParams[key]){
						if(typeof baseParams[key][baseIndex] === 'boolean'){
							baseParams[key][baseIndex] = false;
						}
					}
				}
				return baseParams
			},
			//全选初始化
			initParamsTrue(baseParams){
				for(let key in baseParams){
					for(let baseIndex in baseParams[key]){
						if(typeof baseParams[key][baseIndex] === 'boolean'){
							baseParams[key][baseIndex] = true;
						}
					}
				}
				return baseParams
			},
			//商城字段选择-------------
			allShopChange(val) {                                                                                                                                                                                                                                                                                                                                                 
				if(val){
					this.mallParams = this.initParamsTrue(this.mallParams);
				}else{
					this.activeParams = this.initParams(this.mallParams)	
				}
				console.log(this.mallParams)

				this.checkedShop = val;
				this.isIndeterminateSC = false;
			},
			shopChange(value) {
				let mallParams = this.initParams(this.mallParams)	
				let checkedCount = value.length;

				for(let i in value){
					let baseIndex = value[i];
					for(let key in mallParams[baseIndex]){
						if(!mallParams[baseIndex][key]){
							mallParams[baseIndex][key]	= true;
						}
					}
				}
				this.mallParams = mallParams;				

				this.checkAllShop = checkedCount === this.shopField.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.shopField.length;
			},
			//活跃字段选择-------------
			allActiveChange(val) {
				if(val){
					this.activeParams = this.initParamsTrue(this.activeParams);
				}else{
					this.activeParams = this.initParams(this.activeParams)	
				}
				console.log(this.activeParams)
				this.checkedActive = val;
				this.isIndeterminateActive = false;
			},
			activeChange(value) {
				let activeParams = this.initParams(this.activeParams)	
				let checkedCount = value.length;

				for(let i in value){
					let baseIndex = value[i];
					for(let key in activeParams[baseIndex]){
						if(!activeParams[baseIndex][key]){
							activeParams[baseIndex][key]	= true;
						}
					}
				}
				this.activeParams = activeParams;
				
				this.checkAllActive = checkedCount === this.activeField.length;
				this.isIndeterminateActive = checkedCount > 0 && checkedCount < this.activeField.length;
			},
			//优惠券字段选择-------------
			allCouponChange(val) {
				let list = this.couponField;
				let ids = [];
				list.forEach(item => {
					ids.push(item.id)
				});
				this.checkedCoupon = val ? ids : [];
				this.isIndeterminateCoupon = false;
			},
			couponChange(value) {
				let checkedCount = value.length;
				this.checkAllCoupon = checkedCount === this.couponField.length;
				this.isIndeterminateCoupon = checkedCount > 0 && checkedCount < this.couponField.length;
			},

			onChooseMember(item) {
				let arr = [];
				item.forEach(item => {
					if(item.company_id != '')
						arr.push(item.company_id);
				})
				this.params.company_ids = arr;
			},
			setDown() {
				// let cont = this.checkedCompany.concat(this.checkedShop).concat(this.checkedActive).concat(this.checkedCoupon);
				let day = Utils.getsjc(this.params.end_time) - Utils.getsjc(this.params.start_time);
				// if(cont.length > 15) {
				// 	Utils.toast('导出字段个数超上限啦！')
				// 	return
				// }
				// this.params.data_field = cont.join(',');

				if(!this.params.start_time) {
					Utils.toast('请在数据字段中选择日期！')
					return
				}
				if(!Utils.isEmpty(this.params.project_name)) {
					Utils.toast('请填写任务名称！')
					return
				}
				if(day > 90) {
					Utils.toast('查询时间区间不能大于三个月！')
					return
				}
				let downParams = {
					params:{...this.params},
					fields:{...this.baseParams,...this.activeParams,...this.mallParams}
				};
				console.log(downParams);
				 
				this.addTask({...downParams, 
					cellpack: res => {
						Utils.msg('任务创建成功！');
						Utils.toUrl(this, '/down')
					}
				})
			},
		},
		computed: {
			...mapGetters(['operatorList', 'allAgentList', 'companyField', 'activeField', 'shopField', 'couponField'])
		},
		  watch:{
			  //bug清空数据
			firstArgent(val){
				!val?this.fistAgentHandleSelect(''):''
			},
			twoArgent(val){
				!val?this.twoArgentHandleSelect(''):''
			},
		 }
	}
</script>
<style>
	/* 修复日期在笔记本显示问题 */
	
	.downTask .el-range-editor--small.el-input__inner {
		width: auto;
	}
</style>
<style scope lang='less'>
	.p15 {
		padding: 15px
	}
	
	.tsy {
		font-size: 14px;
		margin-left: 15px;
		i {
			font-style: normal;
			color: red;
		}
	}
	
	.mb15 {
		margin-bottom: 15px;
	}
	
	.ml15 {
		margin-left: 15px;
	}
	
	.m15 {
		margin: 15px;
	}
	
	.d-title {
		height: 50px;
		line-height: 50px;
		font-size: 18px;
	}
	
	h4 {
		background: #ececec;
		line-height: 45px;
		text-indent: 1em;
		height: 45px;
	}
	
	.teh4 {
		height: 60px;
		line-height: 60px;
		text-indent:0;
		padding-left: 10px
	}
	
	h4 .span {
		vertical-align: top;
		float: left;
		margin-right: 50px;
	}
	
	h4 .el-form {
		position: relative;
		float: left;
		height: 60px;
		margin: 0;
		margin-top: 15px;
	}
	
	h5 {
		/*line-height: 40px;*/
		margin: 15px 0 0 15px;
		font-size: 14px;
		color: #000;
	}
	
	.switchTab {
		font-size: 0;
	}
	
	.switchTab span {
		display: inline-block;
		text-align: center;
		width: 150px;
		line-height: 32px;
		font-size: 12px;
		border: 1px solid #dcdfe6;
		cursor: pointer;
	}
	
	.switchTab span.active {
		background: #3798E8;
		color: #fff;
		border-color: #3798E8;
	}
	/*  .downTask>>> .el-range-editor--small.el-input__inner{
      width: auto;
    }*/
</style>