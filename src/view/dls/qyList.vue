<template>
	<div class="qyList">
		<h2 class="page-title">
      企业列表
      <el-popover trigger="hover" placement="right" width="760">
        <div>
			<p><strong>开通AI雷达数：</strong>企业购买开通的AI雷达数量</p>
			<p><strong>启用AI雷达数：</strong>企业在企管后台开启了的AI雷达数量</p>
			<p><strong>雷达启用率：</strong>雷达启用率=启用AI雷达数量/开通AI雷达数</p>
			<p><strong>客户总数（去重）：</strong>统计企业名片小程序累计获客数（同一客户访问相同企业的不同名片，不重复计算）</p>
			<p><strong>人均客户数：</strong>平均每个启用AI雷达的客户数=客户总数/启用AI雷达数</p>
			<p><strong>小程序总PV：</strong>统计企业名片小程序累计总访问PV</p>
			<p><strong>被转发次数：</strong>统计企业名片小程序累计总被转发次数</p>
			<p><strong>客户跟进次数：</strong>统计企业所有AI雷达用户累计在AI雷达跟进客户的次数</p>
			<p><strong>支付成功订单数：</strong>统计企业商城累计成功支付订单数</p>
			<p><strong>成交金额：</strong>统计企业商城累计成功支付订单包含的金额</p>
			<p><strong>所属运营商：</strong>服务该企业的运营商</p>
			<p><strong>开户机构：</strong>企业归属的直接代理商，一般为为企业开户的代理商。身份可以是代理，核心代理商也可以是运营商，也可以是加推总账号</p>
			<p><strong>开户日期：</strong>企业账号开通的日期</p>
			<p><strong>到期日期：</strong>企业账号到期日期</p>
			<p><strong>使用状态：</strong>包含正常，审核中，不通过，停用</p>
			<p><strong>开通版本：</strong>代理商后台为企业开通的版本，分为企业版及门店版</p>
			<p><strong>小程序首次发布日期：</strong>企业首次发布小程序的日期。（19年1月8日系统重构，19年1月8日及之前首次发布的小程序日期都统一记录为2019-01-09）</p>
			<p><strong>启用商城：</strong>企业启用商城的状态。数据来源于企业企管后台。</p>
    
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
    </h2>
		<div class="sxTab">
			<el-form ref="form" size="small" label-position="left" label-width="120px">
				<div>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="开户日期">
								<GetTime @changeTime="onChangeOpenTime" :fixedTime="true" :showDay="false"></GetTime>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="使用状态">
								<el-select v-model="queryParams.software_status" @change="statusChange">
									<el-option label="全部" value=""></el-option>
									<el-option label="正常" value="1"></el-option>
									<el-option label="审核中" value="0"></el-option>
									<el-option label="不通过" value="2"></el-option>
									<el-option label="停用" value="3"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" class="hy">
							<Industry labelWidth='120px' @getCategory='categoryChange'></Industry>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="所属运营商">
							<el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入所属运营商" clearable @select="fistAgentHandleSelect"  ></el-autocomplete>
							</el-form-item>
						</el-col>

						<el-col :span="8">
						<el-form-item label="开户机构">
							<el-autocomplete class="inline-input" v-model="twoArgent" :fetch-suggestions="queryTwoArgent" placeholder="请输入开户机构" clearable @select="twoArgentHandleSelect"></el-autocomplete>
						</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="企业名称">
								<el-autocomplete class="inline-input" v-model="companyName" :fetch-suggestions="queryCompanyName" placeholder="请输入企业名称" clearable @select="CompanyNameHandleSelect"></el-autocomplete>
							</el-form-item>
						</el-col>
					</el-row>

					<div v-show="showMoreSelect">
						<el-row :gutter="20">
							<el-col :span="8">
								<GetRegion @region="region" :provincesCity="true" labelWidth='120px'></GetRegion>
							</el-col>
							<!-- <el-col :span="8">
								<el-form-item label="小程序授权状态">
									<el-select v-model="queryParams.software_status" @change='xstatusChange'>
										<el-option label="全部" value=""></el-option>
										<el-option label="已授权" value="0"></el-option>
										<el-option label="未授权" value="1"></el-option>
									</el-select>
								</el-form-item>
							</el-col> -->

							<el-col :span="8">
								<el-form-item label="到期日期">
									<GetTime @changeTime="onChangeEndTime" :isSelectFuture="true" :defalutTime="true" :showDay="false"></GetTime>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<el-form-item>
						<el-button type="primary" @click.native="search">查询</el-button>
						<!-- <el-button @click="resetForm('form')">重置</el-button> -->
						<!-- <el-button type="text" @click="changeShowSelect">
							<i :class="showMoreSelect?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
							<span v-text="showMoreSelect?'收起筛选项':'更多筛选项'"></span>
						</el-button> -->
					</el-form-item>
				</div>
			</el-form>
		</div>
		<div class="data-table-func clearfix">
			<div class="info-total">企业数：<span>{{companyList.total | numberWithCommas}}</span>家</div>
			<div class="clearfix" style="margin-top:10px">
				<span class="zdybt pull-left" @click="dyColumnVisible=true" v-if="false">自定义列表头</span>
				<button type="button" class="dcsh pull-right" @click="exportExcel">导出</button>
			</div>
		</div>
		<div class="data-table" v-loading="companyListLoading">
			<el-table :data="companyList.list" border sortable="custom" @sort-change="sortChange" :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
				<el-table-column fixed prop="company_name" width="200" label="企业名称"></el-table-column>
				<el-table-column prop="ai_radar_purchased_num" sortable="ai_radar_purchased_num" label="开通AI雷达数" width="130"></el-table-column>
				<el-table-column prop="ai_radar_opened_num" sortable="ai_radar_opened_num" label="启用AI雷达数" width="130"></el-table-column>
				<el-table-column prop="rate_ai_radar_opened" width="130" label="雷达启用率"></el-table-column>
				<el-table-column prop="small_program_user_num" sortable="small_program_user_num" width="130" label="客户总数"></el-table-column>
				<el-table-column prop="rate_small_program_use" width="130" label="人均客户数"></el-table-column>
				<el-table-column prop="small_program_pv" sortable="small_program_pv" width="130" label="小程序总PV"></el-table-column>
				<el-table-column prop="card_tranfered_num" sortable="card_tranfered_num" label="被转发次数" width="150"></el-table-column>

				<el-table-column prop="follow_up_num" sortable="follow_up_num" width="130" label="客户跟进次数"></el-table-column>
				<el-table-column prop="order_payed_num" sortable="order_payed_num" width="130" label="支付成功订单数"></el-table-column>
				<el-table-column prop="order_payed_money" sortable="order_payed_money" width="130" label="成交金额"></el-table-column>

				<el-table-column prop="city" width="130" label="地区"></el-table-column>
				<el-table-column width="130" label="行业">
					<template slot-scope="scope">
						<span>{{scope.row.first_industry}}/{{scope.row.second_industry}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="operator_id" width="130" label="所属运营商"></el-table-column>
				<el-table-column prop="owner_id" width="130" label="开户机构"></el-table-column>
				<el-table-column prop="open_date" width="130" label="开户日期"></el-table-column>
				<el-table-column prop="expire_date" width="130" label="到期日期"></el-table-column>
				<el-table-column prop="software_status" label="使用状态" width="120"></el-table-column>
				<el-table-column prop="software_version" label="开通版本" width="120"></el-table-column>
				<!-- <el-table-column prop="software_status" label="小程序授权状态" width="120"></el-table-column> -->
				<!-- <el-table-column prop="status" label="小程序首次授权日期" width="120"></el-table-column> -->
				<el-table-column prop="small_program_online_date" label="小程序首次发布日期" width="120"></el-table-column>
				<el-table-column prop="enable_mall" label="启用商城" width="120"></el-table-column>
				<!-- <el-table-column prop="status" label="支付配置" width="120"></el-table-column> -->
				<el-table-column fixed="right"  label="操作" width="120">
					<template slot-scope="{row}">
						<span @click="lookCode(row)" class="text-code">二维码 </span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pager">
			<el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10" :total="companyList.total">
			</el-pagination>
		</div>
		<!-- 自定义列弹窗 -->
		<el-dialog title="自定义列表头" :visible.sync="dyColumnVisible" width="500px">
			<el-form ref="columnForm" :model="columnForm" label-width="80px" label-position="top" class="dialog">
				<el-form-item label="企业基本信息">
					<el-checkbox-group v-model="columnForm.type" @change="columnChange">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-checkbox label="1" name="type2">企业名称</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="2" name="type2">地区</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="3" name="type2">行业</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="3" name="type2">开户机构</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="4" name="type1">开户日期</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="5" name="type3">到期日期</el-checkbox>
							</el-col>
						</el-row>

						<el-row :gutter="20" label="AI雷达开通数">
							<el-col :span="20" style="font-size: 14px; margin-top: 20px;">启用及使用情况信息 </el-col>
							<el-col :span="8">
								<el-checkbox label="6">AI雷达开通数</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="7">AI雷达启用数</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="8">小程序授权状态</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="9">小程序用户数</el-checkbox>
							</el-col>

							<el-col :span="8">
								<el-checkbox label="10" name="type">小程序转发数</el-checkbox>
							</el-col>

							<el-col :span="8">
								<el-checkbox label="11" name="type1">是否启用商城</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="12" name="type2">商城下单数</el-checkbox>
							</el-col>

							<el-col :span="8">
								<el-checkbox label="13" name="type">成交金额</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="14" name="type">支付订单数</el-checkbox>
							</el-col>
							<el-col :span="8">
								<el-checkbox label="15" name="type">客户跟进次数</el-checkbox>
							</el-col>
						</el-row>
					</el-checkbox-group>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button size="medium" type="primary" @click="dyColumnVisible=false">关闭</el-button>
			</div>
		</el-dialog>
		<!-- 二维码弹窗 -->
		<el-dialog :title="codeDialogData.codeTitle" :visible.sync="codeDialogData.visible" width="30%" :before-close="handleClose">
			<div class="codePc">
				<img class="code-img" v-lazy='codeDialogData.codeImg' :key="codeDialogData.codeImg">
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import GetRegion from '../../components/getRegion'
	import GetTime from '@/components/getTime'
	import Industry from '../../components/industry'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import Utils from '../../utils/index';
	const companyLabelNames = ['企业名称', '地区', '行业', '所属代理商', '开户日期', '到期日期']
	const infoLabelNames = ['AI雷达开通数', 'AI雷达启用数', '小程序授权状态', '小程序用户数', '是否启用商城', '商城下单数', '成交金额', '支付订单数', '客户跟进次数']
	import { CompanyListUrl } from '@/api/api';
	const {
		start_time,
		end_time
	} = Utils.getTime(14);
	export default {
		components: {
			GetRegion,
			GetTime,
			Industry
		},
		data() {
			return {
				firstArgent: '', //总代理
				twoArgent: '', //二级代理
				companyName: '', //企业名称
				showMoreSelect: true, //是否显示更多赛选
				dyColumnVisible: false, //自定义列弹窗
				defaultTime: '',
				columnForm: {
					type: []
				},
				codeDialogData: {
					visible: false,
					codeTitle: '',
					codeImg: ''
				}, //二维码弹窗

				currentPage: 1,
				queryParams: {
					open_start_date:'2018-01-01',
					open_end_date:end_time,
					industry_id:"",
					operator_id:"",
					owner_id:"",
					status:"",
					company_id:"",
					order:"",
					sort:"",
					city:"",
					province:"",
					software_status:"",
					expire_start_date:"",
					expire_end_date:"",
					page:1,
					page_size:10,
					is_page:true,//false 导出					
					type: '3'
				},
			}
		},
		created() {
			this.getCompanyList(this.queryParams)
			this.getSearchAgentList({
				type: 0
			}); //开户机构
			this.getSearchCompanyList();
		},
		methods: {
			...mapActions(['getCompanyList', 'getCompanyCode', 'getSearchAgentList', 'getSearchCompanyList']),
			...mapMutations(['setSearchAgentList', 'setSearchCompanyList']),
			rest() {
				this.currentPage = 1;
				this.queryParams.page = 1;
				this.getCompanyList(this.queryParams);
			},
			//模糊搜索statar------------
			queryFistAgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.allAgentList)
			},
			queryTwoArgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.allAgentList)
			},
			queryCompanyName(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.searchCompanyList)
			},
			fistAgentHandleSelect(item) {
				this.queryParams.operator_id = item.uid||"";
				// this.rest();
			},
			twoArgentHandleSelect(item) {
				this.queryParams.owner_id = item.uid|"";
				// this.rest();
			},
			CompanyNameHandleSelect(item) {
				this.queryParams.company_id = item.company_id||"";
				this.companyName = item.company_name||"";
				// this.rest();
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
			//开户日期
			onChangeOpenTime(val) {
				this.queryParams.open_start_date = val.start_time;
				this.queryParams.open_end_date = val.end_time;
				// this.rest();
			},
			//到期时间
			onChangeEndTime(value) {
				this.queryParams.expire_start_date = value.start_time
				this.queryParams.expire_end_date = value.end_time
			},
			//模糊搜索end------------
			//行业切换
			categoryChange(val) {
				this.queryParams.industry_id = val==-1?"":val;
				// this.rest();
			},
			//add-------------------
			xstatusChange(val) {
				this.queryParams.software_status = val;
				// this.rest();
			},
			handleClose() {
				this.codeDialogData = {
					visible: false,
					codeTitle: '',
					codeImg: ''
				}
			},
			statusChange(val) {
				this.queryParams.software_status = val;
				// this.rest();
			},
			region(val) {
				this.queryParams.city = val.city;
				this.queryParams.province = val.province;
				// this.rest();
			},
			search() {
				this.queryParams.is_page = true;
				this.rest();
				// this.getCompanyList(this.queryParams);
			},
			handleSizeChange(val) {
				// this.queryParams.page = 1;
				this.queryParams.page_size = val;
				this.rest();
				// this.getCompanyList(this.queryParams);
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.queryParams.page = page;
				this.getCompanyList(this.queryParams);
			},
			sortChange(val) {
				if(val.order){
					this.queryParams.order = val.order== 'descending' ? 'desc' : 'asc';
					this.queryParams.sort = val.prop;
				}else{
					this.queryParams.order = '';
					this.queryParams.sort = '';
				}
				this.rest();
			},
			exportExcel() {
				this.queryParams.is_page = false;
				location.href = CompanyListUrl+'?'+Utils.jsonToUrlFmt(this.queryParams);

			},
			//查看二维码
			lookCode(row) {
				this.getCompanyCode({
					company_id: row.company_id,
					// company_id:"487691313471291392",
					cellpack: res => {
						console.log(res)
						this.codeDialogData.visible = true;
						this.codeDialogData.codeTitle = row.company_name||"深圳加推科技";
						this.codeDialogData.codeImg = res.data;
					}
				})
			},
			//自定义表头
			columnChange(val) {
				console.log(val)
			},
			changeShowSelect() {
				this.showMoreSelect = !this.showMoreSelect
			},
			resetForm(name) {
				this.$refs['form'].resetFields();
			}
		},
		computed: {
			...mapGetters(['companyList', 'companyListLoading', 'allAgentList','searchCompanyList'])
		},
		watch: {
			//bug清空数据
			firstArgent(val) {
				!val ? this.fistAgentHandleSelect('') : ''
			},
			twoArgent(val) {
				!val ? this.twoArgentHandleSelect('') : ''
			},
			companyName(val) {
				!val ? this.CompanyNameHandleSelect('') : ''
			}
		}
	};
</script>
<style lang="less" scope>
	.data-table {
		padding-top: 10px;
	}
	
	.zdybt {
		color: #409EFF;
		padding-top: 20px;
		font-size: 12px;
		cursor: pointer;
	}
	
	.text-code {
		color: #409EFF;
		cursor: pointer;
	}
	
	.el-checkbox:nth-child(4n) {
		margin-left: 0
	}
	
	.codePc {
		padding-bottom: 20px;
	}
	
	.code-img {
		width: 200px;
		height: 200px;
		margin: auto;
		display: block;
	}
	/* 修复日期在笔记本显示问题 */
	
	.qyList .el-range-editor--small.el-input__inner {
		width: auto;
	}
	
	.dialog .el-form-item__content {
		line-height: 30px
	}
	
	.el-dialog__body {
		padding-bottom: 0px;
	}
	
	.hy .el-form-item__label {
		//width: 140px !important;
	}
</style>